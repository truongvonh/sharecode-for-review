import React from 'react';
import { COMMENT_ENDPOINT } from 'constants/endpoints';
import { checkVoteType } from 'utils/helper';
import { Router } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import { useActions } from 'hooks/useActions';
import { closeLoading } from 'redux/common/actions';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';

const useCommentToPostOnFeed = (type, documentId) => {
  const closeLoadingAction = useActions(closeLoading, null);

  return React.useCallback(
    async ({ content, photos }) => {
      if (content) {
        let result = null;
        try {
          result = await COMMENT_ENDPOINT.POST_COMMENT({
            content,
            photos,
            comment_type: checkVoteType(type),
            document: documentId
          });
          console.log('result cmt :', result);
          console.log('result type :', type);
        } catch (e) {
          console.log('e');
        } finally {
          closeLoadingAction();
          /* check navigate by type */
          if (result) {
            switch (type) {
              case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION:
              case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION:
              case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
              case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
                Router.pushRoute(NAVIGATE_URL.DETAIL_LOCATION_REVIEW.URL(documentId, type), NAVIGATE_URL.DETAIL_LOCATION_REVIEW.AS);
                break;
              case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_SCHOOL:
              case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_SCHOOL:
              case ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL:
              case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_SCHOOL:
                Router.pushRoute(
                  NAVIGATE_URL.DETAIL_SCHOOL_REVIEW.URL(documentId, type),
                  NAVIGATE_URL.DETAIL_SCHOOL_REVIEW.AS
                );
                break;
              case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_GROUP:
              case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP:
              case ALL_NEWS_FEED_TYPE.POST_GROUP:
              case ALL_NEWS_FEED_TYPE.PUT_GROUP:
                Router.pushRoute(NAVIGATE_URL.NEW_DETAIL_PAGE.URL(documentId, type), NAVIGATE_URL.NEW_DETAIL_PAGE.AS);
                break;
            }
          }
        }
      }
    },
    [type, documentId]
  );
};

export default useCommentToPostOnFeed;
