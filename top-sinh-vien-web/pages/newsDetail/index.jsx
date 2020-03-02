import React from 'react';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';
import { GROUP_ENDPOINT, LOCATION_ENDPOINT } from 'constants/endpoints';
import { object, string } from 'prop-types';
import './style.scss';
import NewsDetail from 'pages/shared/NewsDetail';

const NewsDetailPage = ({ type, detailData }) => {
  return <NewsDetail type={type} detailData={detailData} />;
};

NewsDetailPage.propTypes = {
  type: string,
  detailData: object
};

NewsDetailPage.getInitialProps = async result => {
  const { id, type } = result.query;
  let detailData = {};

  let options = {};

  if (!process.browser) {
    options = {
      headers: { cookie: result.req.headers.cookie }
    };
  }

  try {
    switch (type) {
      case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION:
        detailData = await LOCATION_ENDPOINT.GET_LOCATION_REVIEW({ id, ...options });
        break;
      case ALL_NEWS_FEED_TYPE.POST_GROUP:
      case ALL_NEWS_FEED_TYPE.PUT_GROUP:
      case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP:
      case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_GROUP:
        detailData = await GROUP_ENDPOINT.DETAIL_POST_GROUP({ id, ...options });
        break;
      default:
        return {};
    }
  } catch (e) {
    console.log('detail news error = ', e);
  }
  return {
    detailData,
    type
  };
};

export default NewsDetailPage;
