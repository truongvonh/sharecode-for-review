import React from 'react';
import { SCHOOL_ENDPOINT } from 'constants/endpoints';
import NewsDetail from 'pages/shared/NewsDetail';
import { useActions } from 'hooks/useActions';
import { getDetailReviewSchool } from 'redux/common/actions';
import { object, string } from 'prop-types';
import { checkDetailProperty, checkDetailTitle, getNestedObjectSafe } from 'utils/helper';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';

const DetailSchoolReview = ({ type, detailData }) => {
  const getDetailReviewAction = useActions(getDetailReviewSchool, null);

  React.useEffect(() => {
    getDetailReviewAction(detailData);
  }, [detailData]);

  return <NewsDetail
    title={`${checkDetailTitle(type)} ${getNestedObjectSafe(detailData, [checkDetailProperty(type), 'name'])}`}
    ogImage={
      type === (ALL_NEWS_FEED_TYPE.POST_GROUP || ALL_NEWS_FEED_TYPE.PUT_GROUP)
        ? getNestedObjectSafe(detailData, [checkDetailProperty(type), 'icon'])
        : getNestedObjectSafe(detailData, [checkDetailProperty(type), 'avatar', 0, 'thumb'])
    }
    type={type}
    detailData={detailData} />;
};

DetailSchoolReview.propTypes = {
  type: string,
  detailData: object
};

DetailSchoolReview.getInitialProps = async ({ query }) => {
  const { id, type } = query;
  let detailData = {};
  try {
    detailData = await SCHOOL_ENDPOINT.DETAIL_SCHOOL_REVIEW({ id, customHeaders: {} });
    // console.log('detailData: ', detailData);
  } catch (e) {
    console.log(e);
  }
  return {
    detailData,
    type
  };
};

export default DetailSchoolReview;
