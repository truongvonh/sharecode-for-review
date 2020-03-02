import React from 'react';
import Head from 'components/common/head';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { object, string } from 'prop-types';
import { getNestedObjectSafe } from 'utils/helper';
import { Button } from 'reactstrap';
import useHandlerRound from 'hooks/useHanlderRound';
import ImageModal from 'components/ImageModal';
import ShareButton from 'components/ShareButton';
import SvgIcons from 'components/SvgIcons';
import { ALL_NAME_ROUNDS, ALL_ROUNDS_LABEL, UPLOAD_TYPE } from 'constants/common';
import SchoolInfor from 'pages/competitionDetail/component';
import { useRouter } from 'next/router';
import PlaceHolderMatch from 'pages/campaignKnockOut/PlaceHolderMatch';
import MatchItem from 'pages/campaignKnockOut/RoundItem/MatchItem';
import handlerMatchDetail from 'pages/competitionDetail/handler';
import ListComment from 'components/ListComment';
import { shallowEqual, useSelector } from 'react-redux';
import CommentAction from 'components/CommentAction';
import PlaceHolderComment from 'components/ListComment/PlaceHolderComment';
import NoMessageData from 'components/NoMessageData';
import './style.scss';

const nameRoundArr = Object.entries(ALL_NAME_ROUNDS);
const labelRoundArr = Object.entries(ALL_ROUNDS_LABEL);

const competitionDetail = (props) => {
  const { appUrl, match, title } = props;
  const router = useRouter();
  const shareUrl = `${process.env.DOMAIN_URL}${router.asPath}`;
  const user = useSelector(store => store.auth.user, shallowEqual);

  const {
    matchData,
    relateMatchLoading,
    relateMatchData,
    resetComment,
    commentLoading,
    commentData,
    selectComment,

    onVoteTeam,
    onRemoveComment,
    onselectMatch,
    toggleLoginAction,
    onLoadMoreComment,
    onCommentToMatch,
    onEditCommentMatch
  } = handlerMatchDetail(match, router);

  const {
    displayImage,
    isShowImage,
    closeImage,
    detailType,

    toggleImage,
    toggleWithSelectImage
  } = useHandlerRound(getNestedObjectSafe(matchData, ['round', 'type']));

  const winnerSchoolId = React.useMemo(() => getNestedObjectSafe(matchData, ['winner', '_id']), [matchData]);

  const schoolWinner = React.useMemo(() => {
    if (!winnerSchoolId) return false;

    return getNestedObjectSafe(matchData, ['team_1', 'school', '_id']) === winnerSchoolId ?
      getNestedObjectSafe(matchData, ['team_1', 'school']) :
      getNestedObjectSafe(matchData, ['team_2', 'school']);
  }, [matchData, winnerSchoolId]);

  const checkNextRoundWinner = React.useMemo(() => {
    let title = '';
    if (getNestedObjectSafe(matchData, ['round', 'name_round']) === ALL_NAME_ROUNDS.ROUND_1) title = 'Đã vô địch';
    else {
      const indexMatch = nameRoundArr.findIndex(round => round[0] === getNestedObjectSafe(matchData, ['round', 'name_round']));
      title = labelRoundArr[indexMatch+1][1];
    }
    return title;
  }, [schoolWinner, winnerSchoolId, matchData]);

  const checkBeforeVote = async (team_id) => {
    if (user) await onVoteTeam(team_id);
    else toggleLoginAction();
  };
    return (
      <>
        <Head appUrl={appUrl}
              title={title}
              description={title}
              ogImage={(
                getNestedObjectSafe(match, ['photos', 0, 'origin']) ||
                '/static/img/avatar-banner-competition.png'
              )} />
        <ImageModal isOpen={isShowImage}
                    toggle={toggleImage}
                    close={closeImage}
                    image={displayImage}
                    title={getNestedObjectSafe(detailType, ['name'])}/>
        <div className="wrapper-match pb-3"
             style={{
               background: `#334C23 url(${require('static/img/bnr_campaign_match.png')}) center center no-repeat`,
             }}>
          <div className="d-flex justify-content-end p-3 w-100">
            <Button outline
                    color="primary"
                    onClick={() => toggleWithSelectImage('ruleWeb')}
                    className="bg-white color-main fz-14 bor font-weight-bold border-0  mr-3">
              Thể lệ
            </Button>
            <Button outline
                    color="primary"
                    onClick={() => toggleWithSelectImage('rewardWeb')}
                    className="bg-white color-main fz-14 bor font-weight-bold border-0 ">Giải
              thưởng</Button>
          </div>
          <div className="text-center">
            <h2 className="d-inline-block match-name font-weight-bold fz-30 text-white pt-2">
              { getNestedObjectSafe(matchData, ['round', 'title']) }
            </h2>
          </div>
          <div className="detail-match d-flex justify-content-between flex-row justify-content-lg-around">
            <SchoolInfor match={matchData}
                         team="team_1"
                         onVote={checkBeforeVote} />
            <div className="match-infor-winner d-flex flex-column align-items-center">
              <p className="font-weight-bold fz-14 text-white">
                Trận {getNestedObjectSafe(matchData, ['battle', 'battle_id'])}
              </p>
              <div className="versus-icon">
                <SvgIcons fileName="ic_versus" width={54} height={54} noHover />
              </div>
              { winnerSchoolId ? (
                <p className="font-weight-bold text-center fz-14 text-white winner-infor">
                  Trận đấu đã kết thúc ...!
                  <br/>
                  Chúc mừng trường
                  <br/>
                  <span className="text-uppercase fz-16">
                    { schoolWinner.name }
                  </span>
                  <br/>
                  { getNestedObjectSafe(matchData, ['round', 'title']) === ALL_ROUNDS_LABEL.ROUND_1 ? 'Đã vô địch' : `lọt vào vòng ${checkNextRoundWinner}` }
                </p>
              ) : (
                <p className="font-weight-bold  text-center fz-14 text-white">
                  Trận đấu đang được diễn ra ...
                </p>
              ) }
            </div>
            <SchoolInfor match={matchData}
                         team="team_2"
                         onVote={checkBeforeVote} />
          </div>
          <div className="d-flex justify-content-center py-2">
            <ShareButton shareUrl={shareUrl} />
          </div>
        </div>
        { getNestedObjectSafe(matchData, ['round', 'title']) !== ALL_ROUNDS_LABEL.ROUND_1 && (
          <div className="all-relate-match">
            <h2 className="color-font font-weight-bold fz-24 text-center py-4 mb-0">
              Các cặp đấu khác
            </h2>
            <div className="container">
              { relateMatchLoading ? (
                Array.from(Array(3).keys()).map((_, index) => (
                  <PlaceHolderMatch key={index} />
                ))
              ) : (
                relateMatchData.result.length > 0 &&
                relateMatchData.result.map((match, index) => (
                  <MatchItem matchData={match}
                             key={index}
                             isSelectMatch
                             onSelectMatch={onselectMatch} />
                ))
              ) }
            </div>
          </div>
        ) }

        <div className="all-match-comment bg-white p-3 rounded">
          { !user ?
            <p className="color-main font-weight-bold fz-14 mb-3 px-3 cursor-pointer"
               onClick={toggleLoginAction}>
                Vui lòng đăng nhập để thực hiện chức năng này
            </p> :
            <div className="pb-3">
              <CommentAction user={user}
                             upLoadType={UPLOAD_TYPE.CAMPAIGN}
                             commentData={selectComment}
                             isReset={resetComment}
                             onSubmit={onCommentToMatch} />
            </div>
            }

          { commentLoading && !commentData.results.length ? (
            <PlaceHolderComment/>
            ) :
              !commentData.results.length && !commentLoading ? <NoMessageData /> :
              <ListComment commentData={commentData.results}
                           isNextPage={commentData.nextPage}
                           onEditComment={onEditCommentMatch}
                           onRemoveComment={onRemoveComment}
                           onLoadMoreComment={onLoadMoreComment} />
            }
        </div>
      </>
    );
};

competitionDetail.getInitialProps = async ({ req, query, reduxStore }) => {
  const store = reduxStore.getState();
  const { user } = store.auth;
  const { match_id } = query;
  let options = {};
  let url;

  if(!process.browser) {
    options = {
      headers: { cookie: req.headers.cookie }
    };
    url = req.url;
  } else {
    url = window.location.pathname;
  }

  let match = null;
  try {
    match = !user ?
      await CAMPAIGN_ENDPOINT.GET_MATCH_DETAIL({ match_id }) :
      await CAMPAIGN_ENDPOINT.GET_MATCH_DETAIL({ match_id, ...options });
  } catch (e) {
    console.log('er', e);
  }

  const title = `Chi tiết trận đấu vòng ${getNestedObjectSafe(match, ['round', 'title'])} giữa trường ${getNestedObjectSafe(match, ['team_1', 'school', 'name'])} và trường ${getNestedObjectSafe(match, ['team_2', 'school', 'name'])}`;
  return {
    appUrl: 'topsinhvien://' + url,
    match,
    title
  };
};

competitionDetail.propTypes = {
  appUrl: string,
  title: string,
  match: object
};

export default competitionDetail;
