import React from 'react';
import Select from 'react-select';
import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
import { LOCATION_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import usePrevious from 'hooks/usePrevious';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import InfiniteScroll from 'react-infinite-scroller';
import PlaceHolder from 'components/ProfileSchoolItem/PlaceHolder';
import LocationItem from './../LocationItem';
import DataFound from 'components/dataFound';

import { REVIEW_LOCATION_TEXT } from 'constants/common';
import PopupModalDownload from 'components/PopupModalDownload';
import useModal from 'hooks/useModal';

const sortOption = [
  { value: { type: 'updatedAt', value: 'desc' }, label: 'Mới nhất' },
  { value: { type: 'rating', value: 'asc' }, label: 'Nhiều người tương tác nhất' },
  { value: { type: 'rating', value: 'desc' }, label: 'Xếp hạng cao nhất' }
];
const MAX_LIMIT = 10;

const Location = (item ) => {
  const id_location = getNestedObjectSafe(item,['item','id']);
  const [isLoadMore, setLoadMore] = React.useState(true);
  const [total, setTotal] = React.useState([]);
  const [reviewOfLocation, setReviewOfLocation] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const previousPage = usePrevious(page);
  const user = useSelector(store => store.auth.user, shallowEqual);
  const toggleLoginMdAction = useActions(toggleLoginModal, null);
  const [isShowingDownload, toggleDownload, closeDownload] = useModal(false);

  const getReviewLocation = async ({ id = id_location, page = 1, rating, isScrollLoad = false, isSort = false }) => {
    try {
      const result = await LOCATION_ENDPOINT.LOCATION_REVIEW({ id: id, page: page, rating: rating });
      const data = getNestedObjectSafe(result, ['result']);
      setTotal(getNestedObjectSafe(result, ['total']));
      // setReviewOfSchool(prevData => [...prevData, ...data]);
      setReviewOfLocation(prevData => (!isScrollLoad ? data : [...prevData, ...data]));
      setPage(page + 1);
      if (data.length < MAX_LIMIT) setLoadMore(false);
      if (result) setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (id_location) {
      const onLoadFeedByLocation = async () => {
        setPage(1);
        await getReviewLocation({ id: id_location, page: 1 });
      };
      onLoadFeedByLocation();
    }
  }, [id_location]);

  const fetchData = React.useCallback(
    async () => {
      if (page !== previousPage && page !== 1) {
        setTimeout(
          async () => {
            await getReviewLocation({ id: id_location, page, isScrollLoad: true });
          },
          page === 1 ? 800 : 100
        );
      }
    },
    [id_location, isLoadMore, page, previousPage]
  );

  const onVoteDocument = async (type, document) => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const data = await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
        if (data) {
          const result = reviewOfLocation.map(item => {
            if (getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) === document) {
              return { ...item, voted: !item.voted, totalVote: item.voted ? item.totalVote - 1 : item.totalVote + 1 };
            }
            return item;
          });
          setReviewOfLocation(result);
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const handleChangeSort = async selectedOptionSort => {
    const selectSort = selectedOptionSort.value;
    try {
      if (selectSort.type === 'updatedAt') {
        await getReviewLocation({ id: id_location, isSort: true });
      } else {
        await getReviewLocation({ id: id_location, rating: selectSort.value, isSort: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="wrapper-review-location col-lg-6 col-12 ">
      <PopupModalDownload isOpen={isShowingDownload} toggle={toggleDownload} close={closeDownload} />
      <div className=" d-flex justify-content-center align-items-center px-5 flex-column">
        <button className="text-uppercase button-location text-white shadow fz-16 border-0 border font-weight-bold bg-link w-75 d-flex align-items-center justify-content-center btn btn-secondary" onClick={() => toggleDownload()}>
          <p className="mt-3">{`${REVIEW_LOCATION_TEXT.REVIEW_LOCATION} (${total})`}</p>
        </button>
      </div>
      <div className="d-flex pt-3  justify-content-between pb-3 flex-column flex-md-row align-items-center">
        <p className="font-weight-bold fz-18 m-0"> </p>
        <div className="d-flex  align-items-center pt-2 pt-md-0">
          <p className="m-0 mr-2">Sắp xếp theo </p>
          <Select
            className="sort-select-option shadow "
            options={sortOption}
            isSearchable={false}
            defaultValue={sortOption[0]}
            onChange={handleChangeSort}
          />
        </div>
      </div>
      <InfiniteScroll
        pageStart={0}
        threshold={0}
        loadMore={fetchData}
        hasMore={isLoadMore}
        initialLoad={true}
        loader={<PlaceHolder />}
      >
        {reviewOfLocation.length > 0 &&
        reviewOfLocation.map((item, index) => (
          <LocationItem newFeedItem={item} key={index} onVoteDocument={onVoteDocument} user={user} />
        ))}
      </InfiniteScroll>
      {isLoading === false && reviewOfLocation && reviewOfLocation.length === 0 && <DataFound />}
    </div>
  );
};

export default Location;
