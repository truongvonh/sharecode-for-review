import React, { useState } from 'react';
import { SCHOOL_ENDPOINT, SEARCH_SCHOOL_ENDPOINT } from 'constants/endpoints';
import Select from 'react-select';
import Link from 'next/link';
import { shallowEqual, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
// AlbumHoder
import Head from 'components/common/head';
// styles
import './university.scss';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import ImageWithFallback from 'components/ImageWithFallback';
import StarRating from 'components/StarRating';
import { NAVIGATE_URL } from 'constants/url';
import { FALLBACK_IMAGE_TYPE } from 'constants/common';

const sortOption = [
  { value: 'NAME', label: 'Tất cả các trường' },
  { value: 'FOLLOW', label: 'Số lượng sinh viên theo dõi' },
  { value: 'RATING', label: 'Điểm đánh giá' }
];

const initPagination = {
  page: 1,
  limit: 12
};

const University = () => {
  const [schoolData, setSchoolData] = React.useState([]);
  const [listSchool, setListSchool] = React.useState([]);
  const [schoolCode, setSchoolCode] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [selectedOptionSort, setSelectedOptionSort] = React.useState(sortOption[0].value);
  const [loadMore, setLoadMore] = useState(true);
  const [pagination, setPagination] = React.useState(initPagination);
  const toggleModalLoginAction = useActions(toggleLoginModal, null);
  const user = useSelector(store => store.auth.user, shallowEqual);

  const { page, limit } = pagination;

  const getSearchSchool = async ({
    page,
    limit = initPagination.limit,
    key,
    filter = 'NAME',
    sort = 'desc',
    onScrollLoad = false
  }) => {
    try {
      const school = await SEARCH_SCHOOL_ENDPOINT.LIST_SEARCH_SCHOOL({
        page,
        limit,
        key,
        filter,
        sort
      });
      if (onScrollLoad) {
        setSchoolData(prevSchool => [...prevSchool, ...school]);
        if (school.length) setPagination(prevPagination => ({ ...prevPagination, page: prevPagination.page + 1 }));
        if (school.length < initPagination.limit) setLoadMore(false);
      } else setSchoolData(school);
    } catch (e) {
      if (e === 'TOKEN_INVALID') {
        toggleModalLoginAction();
      }
    }
  };

  const getListSchool = async ({ page, limit }) => {
    try {
      const school = await SCHOOL_ENDPOINT.LIST_SCHOOL({ page, limit });
      setListSchool(school);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getSearchSchool({ page, limit, key: '', filter: 'NAME', sort: 'desc' });
    getListSchool({ page: 1, limit: 1000 });
  }, []);

  React.useEffect(() => {
    if (user && !schoolData.length) getSearchSchool({ page, limit, key: '', filter: 'NAME', sort: 'desc' });
  }, [user]);

  const optionsSchool = [];
  if (listSchool && listSchool.length > 0) {
    listSchool.map((item, index) => {
      optionsSchool.push({ value: item.schoolCode, label: item.name });
    });
  }

  //handle select school
  const handleChangeSchool = async selectedOption => {
    const schoolCode_select = selectedOption ? selectedOption.value : '';
    setSchoolCode(schoolCode_select);
    setPagination(prevPagination => ({ ...prevPagination, page: initPagination.page }));
    if (schoolCode_select) {
      setLoadMore(false);
      await getSearchSchool({
        page: initPagination.page,
        key: schoolCode_select,
        filter: selectedOptionSort
      });
    } else {
      setLoadMore(true);
      await getSearchSchool({
        page: initPagination.page,
        filter: selectedOptionSort
      });
    }
  };
  //handle select school

  //Sort university
  const handleChangeSort = async selectedOptionSort => {
    const selectSort = selectedOptionSort.value;
    setSelectedOptionSort(selectedOptionSort.value);
    setPagination(prevPagination => ({ ...prevPagination, page: initPagination.page }));
    try {
      await getSearchSchool({ page: initPagination.page, limit, key: schoolCode, filter: selectSort, sort: 'desc' });
    } catch (e) {
      console.log(e);
    }
  };
  //Sort university

  const loadFunc = async nextPage => {
    const hasSchool = schoolData.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasSchool) {
      await getSearchSchool({
        page: page + 1,
        limit,
        filter: selectedOptionSort,
        sort: 'desc',
        onScrollLoad: true
      });
    }
  };

  return (
    <div className="wrapper-school">
      <Head title="Danh sách các trường đại học cao đẳng" />
      <div className="d-flex align-items-center justify-content-md-between flex-column flex-md-row">
        <div className="wrapper-input-search-uni">
          <Select
            className="search-school"
            options={optionsSchool}
            onChange={handleChangeSchool}
            placeholder="Tìm trường..."
            isClearable="true"
          />
        </div>
        <div className="wrapper-select-sort d-flex align-items-center">
          <span className="mr-2 text-nowrap fz-16">Sắp xếp theo</span>
          <Select
            className="sort-select"
            options={sortOption}
            isSearchable={false}
            defaultValue={sortOption[0]}
            onChange={handleChangeSort}
          />
        </div>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={loadMore}
        // loader={<p>loading</p>}
        threshold={10}
      >
        <div className="row py-5 px-3">
          {schoolData.map((item, index) => (
            <div className="col-sm-6 col-md-4 col-xl-3 pb-4 pb-sm-3 px-2" key={index}>
              <Link href={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(item._id)}>
                <a>
                  <div className="wrapper-card h-100">
                    <div className="wrapper-img-university">
                      <ImageWithFallback
                        fallbackType={FALLBACK_IMAGE_TYPE.SCHOOL}
                        className="img-university"
                        src={item.cover[0] && item.cover[0].thumb}
                        alt="img-university"
                      />
                    </div>
                    <div className="university-card p-3 d-flex flex-column">
                      <h4 className="fz-18 font-weight-bold color-font">{item.name}</h4>

                      <p className="university-address fz-16 text-secondary">{item.address}</p>
                      <div className="wrapper-evaluate d-flex mt-auto align-items-center">
                        <div className="wrapper-rank-star">
                          <StarRating val={Math.ceil(item.rating)} />
                        </div>
                        <p className="total-rating">{item.rating}/5.0</p>
                        <p className="total-user-rating text-secondary mb-0">({item.total_follow_school})</p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default University;
