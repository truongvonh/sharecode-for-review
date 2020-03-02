import React from 'react';
import Head from 'components/common/head';
import { ConsumerProfileSchool } from 'layout/ProfileUniversityWrapper';
import { BADGE_ENDPOINT, FLOW_ENDPOINT } from 'constants/endpoints';
import InfiniteScroll from 'react-infinite-scroller';
import usePrevious from 'hooks/usePrevious';
import CardUser from 'pages/profile-university/components/card-user-follow';

import './style.scss';
import Select from 'react-select';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import PlaceHolder from '../components/place-hoder-card-user';
import DataFound from 'components/dataFound';

const AlbumSchool = ({ university_id }) => {
  const [listFollow, setListFollow] = React.useState([]);
  const [listBadge, setListBadge] = React.useState([]);
  const [isLoadMore, setLoadMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const MAX_LIMIT = 12;
  const [page, setPage] = React.useState(1);
  const previousPage = usePrevious(page);
  const [selectedOptionSort, setSelectedOptionSort] = React.useState('');

  const getListFollowSchool = async ({ id_school: university_id, page = 1, key, isSearch = false, id_badge }) => {
    try {
      const data = await FLOW_ENDPOINT.LIST_TOTAL_FOLLOW_SCHOOL({
        id_school: university_id,
        page: page,
        key,
        id_badge
      });
      setListFollow(prevData => (isSearch ? data : [...prevData, ...data]));
      setPage(page + 1);
      if (data.length < MAX_LIMIT) setLoadMore(false);
      if (data) setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getListBadge = async () => {
    let sortOption = [];
    try {
      const data = await BADGE_ENDPOINT.LIST_BADGE();
      setListBadge(data);
      data.map(item => {
        sortOption.push({ value: item._id, label: item.name });
      });
      setListBadge(sortOption);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getListBadge();
  }, []);

  const flowIdSuccess = id_flow => {
    const newListFollow = [...listFollow];
    newListFollow.filter(item => {
      if (item._id == id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setListFollow(newListFollow);
  };

  const fetchData = React.useCallback(
    async _ => {
      if (page !== previousPage) {
        setTimeout(
          async () => {
            await getListFollowSchool({ page: page, id_school: university_id, id_badge: selectedOptionSort });
          },
          page === 1 ? 800 : 100
        );
      }
    },
    [university_id, isLoadMore, page, previousPage]
  );

  const [search] = useDebouncedCallback(async text => {
    setPage(1);
    if (text && text != '') {
      setLoadMore(false);
      await getListFollowSchool({
        id_school: university_id,
        key: text,
        isSearch: true,
        id_badge: selectedOptionSort
      });
    } else {
      setLoadMore(true);
      await getListFollowSchool({ id_school: university_id, isSearch: true });
    }
  }, 1000);

  const handleChangeSort = async selectedOptionSort => {
    const selectSort = selectedOptionSort.value;
    setSelectedOptionSort(selectSort);
    if (selectSort && selectSort != '') {
      setLoadMore(true);
      await getListFollowSchool({ id_school: university_id, id_badge: selectSort, isSearch: true });
    } else {
      setLoadMore(true);
      await getListFollowSchool({ id_school: university_id, isSearch: true });
    }
  };

  const defaultValue = { value: '', label: 'Huy hiệu' };

  return (
    <div className="wrapper-student-follow">
      <Head ogImage="/static/img/img_logo.png" title="Danh sách sinh viên theo dõi" />
      <div className="d-flex align-items-center justify-content-md-between flex-column flex-md-row">
        <div className="wrapper-input-search-uni position-relative">
          <input
            className="input-search fz-12 pr-4 py-3 form-control"
            onChange={e => search(e.target.value)}
            placeholder="Tìm kiếm..."
          />
          <img className="ic-search cursor-pointer" src="/static/icons/ic_tim_kiem.svg" />
        </div>
        <div className="wrapper-select-sort d-flex align-items-center">
          <span className="mr-2 text-nowrap fz-16">Lọc theo</span>
          <Select
            className="sort-select"
            options={listBadge}
            isSearchable={false}
            defaultValue={defaultValue}
            onChange={handleChangeSort}
          />
        </div>
      </div>

      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchData}
          hasMore={isLoadMore}
          initialLoad={true}
          loader={<PlaceHolder />}
          threshold={10}
        >
          <div className="wrapper-list-student-follow pt-4 row">
            {listFollow.map((item, index) => (
              <CardUser
                userData={item}
                key={index}
                flowIdSuccess={flowIdSuccess}
                // onClickViewID={onClickViewID}
              />
            ))}
          </div>
        </InfiniteScroll>
        {listFollow && isLoading === false && listFollow.length === 0 && <DataFound />}
      </div>
    </div>
  );
};

const WrapperAlbumSchool = () => {
  return (
    <ConsumerProfileSchool>
      {context => (
        <React.Fragment>
          <AlbumSchool
            university_id={context.university_id}
            schoolAbout={context.schoolAbout}
            albumSchool={context.albumSchool}
          />
        </React.Fragment>
      )}
    </ConsumerProfileSchool>
  );
};

export default WrapperAlbumSchool;
