import React, { useState } from 'react';
import Head from 'components/common/head';
import { ConsumerProfileSchool } from 'layout/ProfileUniversityWrapper';
import { SCHOOL_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
import InfiniteScroll from 'react-infinite-scroller';
import PlaceHolder from 'components/ProfileSchoolItem/PlaceHolder';
import ProfileSchoolItem from 'components/ProfileSchoolItem';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { REVIEW_SCHOOL_TEXT } from 'constants/common';
import Select from 'react-select';

import './style.scss';
import usePrevious from 'hooks/usePrevious';
import DataFound from 'components/dataFound';

const sortOption = [
  { value: { type: 'updatedAt', value: 'desc' }, label: 'Mới nhất' },
  { value: { type: 'rating', value: 'desc' }, label: 'Xếp hạng cao nhất' },
  { value: { type: 'rating', value: 'asc' }, label: 'Xếp hạng thấp nhất' }
];

const initPagination = {
  page: 1,
  limit: 10
};

const ReviewSchool = ({ university_id, schoolAbout, toggleDownload }) => {
  const [reviewOfSchool, setReviewOfSchool] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const user = useSelector(store => store.auth.user, shallowEqual);
  const toggleLoginMdAction = useActions(toggleLoginModal, null);
  const [loadMore, setLoadMore] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortValue, setSortValue] = React.useState('');
  const [pagination, setPagination] = React.useState(initPagination);
  const { page, limit } = pagination;

  const getReviewOfSchool = async ({ id: id, page, rating, onScrollLoad = false, limit = initPagination.limit }) => {
    try {
      const result = await SCHOOL_ENDPOINT.REVIEW_LOCATION_NEAR_SCHOOL({ id, page, limit, rating });
      const data = getNestedObjectSafe(result, ['result']);
      setTotal(getNestedObjectSafe(result, ['total']));
      if (data.length < initPagination.limit) setLoadMore(false);
      if (result) setIsLoading(true);
      if (onScrollLoad) {
        setReviewOfSchool(prevData => [...prevData, ...data]);
        if (data.length) setPagination(prevPagination => ({ ...prevPagination, page: prevPagination.page + 1 }));
      } else setReviewOfSchool(data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (university_id && !reviewOfSchool.length) getReviewOfSchool({ id: university_id, page });
  }, [university_id]);

  const loadFunc = async nextPage => {
    const hasSchool = reviewOfSchool.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasSchool) {
      await getReviewOfSchool({
        id: university_id,
        page: page + 1,
        onScrollLoad: true,
        rating: sortValue
      });
    }
  };

  const onVoteDocument = async (type, document) => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const data = await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
        if (data) {
          const result = reviewOfSchool.map(item => {
            if (getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) === document) {
              return { ...item, voted: !item.voted, totalVote: item.voted ? item.totalVote - 1 : item.totalVote + 1 };
            }
            return item;
          });
          setReviewOfSchool(result);
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleChangeSort = async selectedOptionSort => {
    const selectSort = selectedOptionSort.value;
    setSortValue(selectSort.value);
    setLoadMore(true);
    setPagination({ page: 1, limit: 10 });

    try {
      if (selectSort.type === 'updatedAt') {
        await getReviewOfSchool({ id: university_id, page: 1 });
      } else {
        await getReviewOfSchool({ id: university_id, page: 1, rating: selectSort.value });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head ogImage="/static/img/img_logo.png" title="Review địa điểm xung quanh" />
      <div className="wrapper-review-location">
        <div className="w-100 d-flex justify-content-center align-items-center px-5 flex-column">
          <button className="mt-4 btn-review py-2 font-weight-bold fz-12 mb-4 w-100" onClick={() => toggleDownload()}>
            {`VIẾT REVIEW ĐỊA ĐIỂM XUNG QUANH (${getNestedObjectSafe(schoolAbout, ['location_near_by_school'])})`}
          </button>
        </div>
        <div className="d-flex justify-content-between pb-3 flex-column flex-md-row align-items-center">
          <p className="font-weight-bold fz-18 m-0">{`${REVIEW_SCHOOL_TEXT.REVIEW_LOCATION} (${total})`}</p>
          <div className="d-flex align-items-center pt-2 pt-md-0">
            <p className="m-0 mr-2">Sắp xếp theo </p>
            <Select
              className="sort-select-option"
              options={sortOption}
              isSearchable={false}
              defaultValue={sortOption[0]}
              onChange={handleChangeSort}
            />
          </div>
        </div>
        <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} threshold={10} loader={<PlaceHolder />}>
          {reviewOfSchool.length > 0 &&
            reviewOfSchool.map((item, index) => (
              <ProfileSchoolItem newFeedItem={item} key={index} onVoteDocument={onVoteDocument} user={user} />
            ))}
        </InfiniteScroll>
        {isLoading && reviewOfSchool && reviewOfSchool.length === 0 && <DataFound />}
      </div>
    </>
  );
};

const WrapperReview = () => {
  return (
    <ConsumerProfileSchool>
      {context => (
        <React.Fragment>
          <ReviewSchool
            university_id={context.university_id}
            schoolAbout={context.schoolAbout}
            toggleDownload={context.toggleDownload}
          />
        </React.Fragment>
      )}
    </ConsumerProfileSchool>
  );
};

export default WrapperReview;
