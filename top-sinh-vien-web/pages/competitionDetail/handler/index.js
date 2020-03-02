import React from 'react';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import Router from 'next/router';
import { NAVIGATE_URL } from 'constants/url';
import { getNestedObjectSafe } from 'utils/helper';
import { useActions } from 'hooks/useActions';
import { closeLoading, openLoading, toggleLoginModal } from 'redux/common/actions';
import { toast } from 'react-toastify';
import i18n from 'locales/i18n';
import { shallowEqual, useSelector } from 'react-redux';

const INIT_MATCH_RELATE = {
  result: [],
  round: {}
};

const INIT_COMMENT_MATCH = {
  results: [],
  nextPage: false
};

const INIT_COMMENT_PAGINATION = {
  page: 1,
  limit: 10
};

const handlerMatchDetail = (match, router) => {
  const [matchData, setMatchData] = React.useState(match);
  const [matchId, setMatchId] = React.useState(router.query.match_id);

  const [relateMatchLoading, setRelateMatchLoading] = React.useState(true);
  const [relateMatchData, setRelateMatchData] = React.useState(INIT_MATCH_RELATE);

  const [commentLoading, setCommentLoading] = React.useState(true);
  const [resetComment, setResetComment] = React.useState(false);
  const [commentPagination, setCommentPagination] = React.useState(INIT_COMMENT_PAGINATION);
  const [commentData, setCommentData] = React.useState(INIT_COMMENT_MATCH);
  const [selectComment, setSelectComment] = React.useState({});

  const user = useSelector(store => store.auth.user, shallowEqual);
  const [closeLoadingAction, openLoadingAction, toggleLoginAction] = useActions([
    closeLoading, openLoading, toggleLoginModal
  ], null);

  const getAllRelateMatch = async ({ type_id, round_id, match_id }) => {
    try {
      const relateMatch = await CAMPAIGN_ENDPOINT.GET_RELATE_MATCH({ type_id, round_id, match_id });
      setRelateMatchData(relateMatch);
    } catch (e) {
      console.log('e', e);
    } finally {
      setRelateMatchLoading(false);
    }
  };

  const getAllCommentOfMatch = async ({ match_id, page = INIT_COMMENT_PAGINATION.page }) => {
    try {
      const { results, count_comment } = await CAMPAIGN_ENDPOINT.GET_ALL_COMMENT_OF_MATCH({ match_id, page });
      setCommentData({
        ...commentData,
        results: page === INIT_COMMENT_PAGINATION.page ?
          results :  [...commentData.results, ...results ],
        nextPage: page === INIT_COMMENT_PAGINATION.page ?
          count_comment > results.length :
          count_comment > [...commentData.results, ...results ].length
      });
    } catch (e) {
      console.log(e);
    } finally {
      setCommentLoading(false);
    }
  };

  const onselectMatch = async match_id => {
    openLoadingAction();
    setRelateMatchLoading(true);
    setMatchId(match_id);
    Router.push(
      NAVIGATE_URL.CAMPAIGN_MATCH_PAGE.AS,
      NAVIGATE_URL.CAMPAIGN_MATCH_PAGE.URL(match_id),
      { shallow: false }
    );
    try {
      const matchDetail = await CAMPAIGN_ENDPOINT.GET_MATCH_DETAIL({ match_id });
      setMatchData(matchDetail);
    } catch (e) {
      console.log(e);
      setRelateMatchLoading(false);
    } finally {
      setTimeout(() => {
        closeLoadingAction();
      }, 800);
    }
  };

  const onVoteTeam = async team_id => {
    try {
      await CAMPAIGN_ENDPOINT.VOTE_TEAM({
        team: team_id,
        match_id: matchId,
        round_id: getNestedObjectSafe(matchData, ['round', '_id'])
      });
      const teamUpdate = getNestedObjectSafe(matchData, ['team_1', '_id']) === team_id ? 'team_1' : 'team_2';
      setMatchData({
        ...matchData,
        [teamUpdate]: {
          ...matchData[teamUpdate],
          votes: matchData[teamUpdate].votes + 1,
          is_user_status: !matchData[teamUpdate].is_user_status,
        }
      });
    } catch (e) {
      toast.warning(i18n.t(`campaign_message.${e}`));
    }
  };

  const onLoadMoreComment = async () => {
    const nextPage = commentPagination.page + 1;
    setCommentPagination({ ...commentPagination, page: nextPage });
    await getAllCommentOfMatch({ match_id: matchId, page: nextPage });
  };

  React.useEffect(() => {
    setCommentPagination(INIT_COMMENT_PAGINATION);
    setTimeout(async () => {
      await Promise.all([
        getAllRelateMatch({
          type_id: getNestedObjectSafe(matchData, ['round', 'type']),
          round_id: getNestedObjectSafe(matchData, ['round', '_id']),
          match_id: matchId,
        }),
        getAllCommentOfMatch({ match_id: matchId })
      ]);
    }, 800);

  }, [matchData, matchId]);

  const onCommentToMatch = React.useCallback(async( { content: comment, photos: files }) => {
    try {
      if (!Object.values(selectComment).length) {
        const newComment = await CAMPAIGN_ENDPOINT.COMMENT_TO_MATCH({ comment, match_id: matchId, files });
        setCommentData(prevComment => ({
          ...prevComment,
          results: [ newComment, ...prevComment.results ]
        }));
      } else {
        const updateComment = await CAMPAIGN_ENDPOINT.EDIT_COMMENT_MATCH({ comment, user_id: user._id, comment_id: selectComment._id, files });
        const updateCommentResultClone = [...commentData.results];
        const updateIndex = updateCommentResultClone.findIndex(comment => comment._id === selectComment._id);
        updateCommentResultClone[updateIndex] = updateComment;
        setCommentData({
          ...commentData,
          results: updateCommentResultClone
        });
      }
    } catch (e) {
      toast.error(e);
    } finally {
      setTimeout(() => {
        closeLoadingAction();
        setResetComment(true);
      }, 400);
    }
    setResetComment(false);
    setSelectComment({});
  }, [matchId, selectComment, user, commentData, setCommentData]);

  const onRemoveComment = React.useCallback(async (commentId) => {
    try {
      await CAMPAIGN_ENDPOINT.DELETE_COMMENT({ comment_id: commentId, user_id: user._id });
      setCommentData(prev => ({
        ...prev,
        results: prev.results.filter(comment => comment._id !== commentId)
      }));
    } catch (e) {
      toast.error(e);
    }
  }, [commentData, user]);

  const onSelectComment = React.useCallback((commentId) => {
    return commentData.results.find(comment => comment._id === commentId);
  }, [commentData]);

  const onEditCommentMatch = React.useCallback((commentId) => {
    setSelectComment(onSelectComment(commentId));
  }, [commentData, setSelectComment]);

  return {
    matchData,
    relateMatchLoading,
    relateMatchData,
    resetComment,
    commentLoading,
    commentData,
    selectComment,

    onselectMatch,
    getAllRelateMatch,
    onVoteTeam,
    toggleLoginAction,
    onLoadMoreComment,
    getAllCommentOfMatch,
    onCommentToMatch,
    onEditCommentMatch,
    onRemoveComment
  };
};

export default handlerMatchDetail;
