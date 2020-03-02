import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { LOCATION_ENDPOINT, SCHOOL_ENDPOINT,SCHOOL_V2_ENDPOINT } from '../../constants/endpoints';
import Head from 'components/common/head';
import UserPlace from '../place/PlaceItem';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import DataFound from 'components/dataFound';
import ModalButton from './ModalPlace/';
import { getNestedObjectSafe } from 'utils/helper';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
const InfiniteScroll = dynamic(
  () => import('react-infinite-scroller'),
);

import './place.scss';
import './ModalPlace/style.scss';
import PlaceHolder from  './components/place-horder';

const initPagination = {
  page: 1,
  limit: 10
};

const sortOption = [
  { value: 'NAME', label: 'Tất cả các địa điểm' },
  { value: 'FOLLOW', label: 'Số lượng người theo dõi' },
  { value: 'RATING', label: 'Điểm đánh giá' }
];

const Place = (id) => {
  const [locationNearSchool, setLocationNearSchool] = React.useState([]);
  const [pagination, setPagination] = React.useState(initPagination);
  const [schoolAbout, setSchoolAbout] = React.useState([]);
  const { page, limit } = pagination;
  const [loadMore, setLoadMore] = useState(true);
  const [idSchool, setIdSchool] = React.useState();
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const [listLocation, setListLocation] = React.useState();
  const [selectedOptionSort, setSelectedOptionSort] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const getSchoolAbout = async ({ university_id: university_id }) => {
    try {
      const data = await SCHOOL_ENDPOINT.SCHOOL_INFO({ university_id: university_id });
      setSchoolAbout(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getLocationNearSchool = async ({ id = idSchool, page, limit, onScrollLoad = false, key, id_type }) => {
    try {
      const data = await SCHOOL_V2_ENDPOINT.LOCATION_NEAR_SCHOOL({ id: id, page, limit, key, id_type });
      if (onScrollLoad) {
        setLocationNearSchool(prevData => ([...prevData, ...data]));
        if (data.length) setPagination(prevPaginate => ({ ...prevPaginate, page: prevPaginate.page + 1 }));
        if (data.length < initPagination.limit) setLoadMore(false);
        if (data.length > 0) setIsLoading(false);
      }
      else setLocationNearSchool(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListLocationType = async () => {
    const sortOption = [];
    try {
      const data = await LOCATION_ENDPOINT.ALL_LOCATION_TYPE();
      setListLocation(data);
      data.map(item => {
        sortOption.push({ value: item._id, label: item.name });
      });
      setListLocation(sortOption);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(async () => {
    const url = window.location.href;
    const args = url.split('/');
    const id = args[args.length - 1];
    setIdSchool(id);
    await getSchoolAbout({ university_id: id });
    await getLocationNearSchool({ id: id, page: 1, limit: 10 });
    await getListLocationType();
  }, []);

  const loadFunc = async nextPage => {
    if (nextPage !== page && loadMore) {
      await getLocationNearSchool({ page: page + 1, limit, onScrollLoad: true });
    }
  };

  const [search] = useDebouncedCallback(async text => {
    setPagination({ ...pagination, page: initPagination.page });
    if (text && text !== '') {
      setLoadMore(false);
      await getLocationNearSchool({
        id_school: id,
        key: text,
        page: initPagination.page,
        limit,
        id_type: selectedFilter,
      });
    } else {
      setLoadMore(true);
      await getLocationNearSchool({
        id_school: id, page: initPagination.page, limit
      });
    }
  }, 1000);

  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState([]);
  const toggle = async () => {
    const FilterSelect = select;
    setSelectedFilter(FilterSelect);
    setPagination({ ...pagination, page: initPagination.page });
    setModal(!modal);
    // setSelect(0);
    if (FilterSelect) {
      setLoadMore(false);
      await getLocationNearSchool({ id_school: id, id_type: FilterSelect, page: initPagination.page, limit });
    } else {
      setLoadMore(true);
      await getLocationNearSchool({ id_school: id, id_type: FilterSelect, page: initPagination.page, limit });
    }
  };
  const cancel = () => {
    setModal(!modal);
    // setSelect(0);
  };

  return (

    <div className=''>
      <div >
        <Head title="Danh sách địa điểm" />
        <h4 className="fz-16 title-place">Danh sách địa điểm xung quanh ({getNestedObjectSafe(schoolAbout, ['location_near_by_school'])}).</h4>
        <div className="wrapper-ranking d-flex align-items-center justify-content-md-between flex-column flex-md-row ">
          <div className="wrapper-input-search-uni position-relative">
            <input
              className="input-search fz-12 pr-4 py-3 form-control"
              onChange={e => search(e.target.value)}
              placeholder="Tìm kiếm..."
            />
            <img className="ic-search cursor-pointer" src="/static/icons/ic_tim_kiem.svg" />
          </div>
          <div className="wrapper-select-rank d-flex align-items-center justify-content-center pt-2">
            <span className="mr-2 text-nowrap fz-14">Sắp xếp theo</span>
            <Select
              className="sort-select"
              options={sortOption}
              isSearchable={false}
              defaultValue={sortOption[0]}
            // onChange={handleChangeSort}
            />
            <div className="ml-2">
              <button onClick={toggle} className="btn button-filter font-weight-bolder fz-14">Bộ lọc<img className="image-filter" src="/static/img/ic_filter.svg" /></button>
            </div>
          </div>
        </div>
      </div>
      <div className='content-place-page pt-4' >
        <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} loader={<PlaceHolder />} threshold={10}>
          <Row className="place-row" >
            {locationNearSchool.map((item, index) =>
              <UserPlace
                key={index}
                avatar={item.avatar}
                name={item.name}
                address={item.address}
                rating={item.rating}
                school={item.school}
                score={item.score}
                index={index}
                id={item._id}
              />
            )}
          </Row>
        </InfiniteScroll>
      </div>
      {locationNearSchool && isLoading === false && locationNearSchool.length === 0 && <DataFound />}
      <div>
        <ModalButton modal={modal} toggle={toggle} setSelect={setSelect} cancel={cancel} select={select} filterOption={listLocation} />
      </div>
    </div>
  );
};

export default Place;
