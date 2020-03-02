import React from 'react';
import Head from 'components/common/head';
import TeamVoteInRound32 from 'components/TeamVoteInRound32';
import ShareButton from 'components/ShareButton';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { object } from 'prop-types';
import { getNestedObjectSafe } from 'utils/helper';
import handlerMatchRound32 from 'pages/campaignKickStart/handler';
import Countdown from 'components/CountDown';
import { Link } from 'routes/routesConfig';
import ImageWithFallback from 'components/ImageWithFallback';
import InfiniteScroll from 'react-infinite-scroller';
import PlaceHolderTeamRound32 from 'components/TeamVoteInRound32/PlaceHolderTeamRound32';

const CampaignKickStart  = ({ matchOfRound32, detailType }) => {

  const {
    matchOfRound32Data,
    onVoteTeam,
    onCheckBottom,
    isLoadMoreTeam
  } = handlerMatchRound32(matchOfRound32, detailType._id);

  const title = `Chi tiết vòng ${matchOfRound32.round.title} của cuộc thi ${detailType.name}`;

  return (

    <>
      <Head title={title}
            description={title}
            ogImage={getNestedObjectSafe(detailType, ['avatar', 0, 'thumb'])} />
      <section className="count-down-wrapper mb-4">
        <Countdown date={new Date(getNestedObjectSafe(matchOfRound32, ['round', 'startTime']))} />
      </section>
      <div className="banner-match-web mb-4">
        <Link route={getNestedObjectSafe(matchOfRound32, ['bannersWeb', 0, 'link'])} >
          <a className="d-block text-center overflow-hidden"
             style={{ maxHeight: '200px' }}
             target="_blank">
            <ImageWithFallback src={getNestedObjectSafe(matchOfRound32, ['bannersWeb', 0, 'url', 0, 'origin'])} />
          </a>
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 share-and-search-wrapper d-flex justify-content-end mb-3">
            <div className="share-facebook">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>

      <InfiniteScroll  pageStart={0}
                       loadMore={onCheckBottom}
                       hasMore={isLoadMoreTeam}
                       loader={ null } >
        <section className="all-team-round32 container">
          <div className="row justify-content-lg-start">
            { matchOfRound32Data.result &&
              matchOfRound32Data.result.length && matchOfRound32Data.result.map((item, index) => (
                <TeamVoteInRound32 teamData={item}
                                   key={index}
                                   onVote={onVoteTeam} />
            )) }
            <div className="row w-100">
              { isLoadMoreTeam && Array.from(Array(4).keys()).map((_, index) =>  <PlaceHolderTeamRound32 key={index} />)}
            </div>
          </div>
        </section>
      </InfiniteScroll>

    </>
  );
};

CampaignKickStart.propTypes = {
  matchOfRound32: object,
  detailType: object,
};

CampaignKickStart.getInitialProps = async ({ req, res, query }) => {
  const { type_id, round_id } = query;

  let matchOfRound32 = {  };
  let detailType = {  };
  try {
    const allType = await CAMPAIGN_ENDPOINT.LIST_CAMPAIGN({ status: '' });
    matchOfRound32 = await CAMPAIGN_ENDPOINT.LIST_MATCH_BY_ROUND({ type_id, round_id  });
    detailType = allType.find(type => (type._id === type_id));
  } catch (e) {
    console.log(e);
  }

  return {
    matchOfRound32,
    detailType
  };
};

export default CampaignKickStart;
