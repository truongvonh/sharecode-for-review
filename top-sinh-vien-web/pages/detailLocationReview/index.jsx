import React from 'react';
import { LOCATION_ENDPOINT } from 'constants/endpoints';
import { useActions } from 'hooks/useActions';
import { getDetailReviewLocation } from 'redux/common/actions';
import NewsDetail from 'pages/shared/NewsDetail';
import { checkDetailProperty, checkDetailTitle, getNestedObjectSafe } from 'utils/helper';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';
import { object, string } from 'prop-types';

const DetailLocationReview = ({ detailData, type }) => {
  const getDetailReviewAction = useActions(getDetailReviewLocation, null);

  React.useEffect(() => {
    getDetailReviewAction(detailData);
  }, [detailData]);

  return (
    <NewsDetail
      title={`${checkDetailTitle(type)} ${getNestedObjectSafe(detailData, [checkDetailProperty(type), 'name'])}`}
      ogImage={
        type === (ALL_NEWS_FEED_TYPE.POST_GROUP || ALL_NEWS_FEED_TYPE.PUT_GROUP)
          ? getNestedObjectSafe(detailData, [checkDetailProperty(type), 'icon'])
          : getNestedObjectSafe(detailData, [checkDetailProperty(type), 'avatar', 0, 'thumb'])
      }
      type={type}
      detailData={detailData}
    />
  );
};

DetailLocationReview.propTypes = {
  type: string,
  detailData: object
};

DetailLocationReview.getInitialProps = async ({ query }) => {
  const { id, type } = query;
  let detailData = {};
  try {
    detailData = await LOCATION_ENDPOINT.GET_LOCATION_REVIEW({ id });
  } catch (e) {
    console.log('error review detail data', e);
  }
  return {
    detailData,
    type
  };
};

export default DetailLocationReview;
