import React, { useState } from 'react';
import Head from 'components/common/head';
import { SEARCH_ENDPOINT } from 'constants/endpoints';
import University from '../component/university';
import Location from '../component/location';
import Member from '../component/member';
import Poster from '../component/poster';
import dynamic from 'next/dynamic';
import { checkResultTitle, getNestedObjectSafe } from 'utils/helper';
import { ALL_TYPE } from 'constants/common';
import './resultType.scss';
import { array, string } from 'prop-types';
import NoResultData from 'components/NoResultData';

const InfiniteScroll = dynamic(
  () => import('react-infinite-scroller'),
);

const initPagination = {
  page: 1,
  limit: 16
};

const ResultTypes = ({ searchData, keyword, search_type, }) => {
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [pagination, setPagination] = React.useState(initPagination);
  const { page, limit } = pagination;
  const getSearch = async ({ key_search, page = 1, limit = 16, type, onScrollLoad = false }) => {
    try {
      const data = await SEARCH_ENDPOINT.SEARCH_TYPE({ key_search, page, limit, type });
      if (onScrollLoad) {
        setSearchFilterData(prevData => ([...prevData, ...data]));
        if (data.length) setPagination(prevPaginate => ({ ...prevPaginate, page: prevPaginate.page + 1 }));
        if (data.length < initPagination.limit) setLoadMore(false);
      }
      else setSearchFilterData(data);
    } catch (error) {
      // console.log(error);
    }
  };

  React.useEffect(() => {
    setSearchFilterData(searchData);
    setPagination({
      ...pagination,
      page: initPagination.page
    });
  }, [searchData]);

  const loadFunc = async (nextPage) => {
    if (nextPage !== page && loadMore && (searchFilterData.length >= initPagination.limit)) {
      await getSearch({
        page: page + 1,
        key_search: keyword,
        type: search_type.toUpperCase(),
        onScrollLoad: true
      });
    }
  };

  const UpdateFlowSchool = id_flow => {
    const newSchool = [...searchFilterData];
    newSchool.filter(item => {
      if (item._id === id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setSearchFilterData(newSchool);
  };

  const UpdateFlowUser = id_flow => {
    const newSearch = [...searchFilterData];
    newSearch.filter(item => {
      if (item._id === id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setSearchFilterData(newSearch);
  };

  return (
    <>

      <Head title={checkResultTitle(search_type)} />

      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={loadMore}
          loader={searchFilterData.length >= limit ? <p className="font-weight-bold fz-18 text-primary">Loading ...</p> : false}
          threshold={10}
        >
          <div className="row w-100 pt-4">
            {!searchFilterData.length && (
              <NoResultData />
            )}
          </div>

          <div className="row pt-4">
            {searchFilterData && searchFilterData.length > 0 && search_type.toUpperCase() === ALL_TYPE.SCHOOL && searchFilterData.map((item, index) =>
              <University
                key={index}
                avatar={item.avatar}
                name={item.name}
                index={index}
                id={item._id}
                follow = {item.follow}
                flowSchoolSuccess={id_flow => UpdateFlowSchool(id_flow)}
              />
            )}
          </div>

          <div className="row">
            {searchFilterData && searchFilterData.length > 0 && search_type.toUpperCase() === ALL_TYPE.LOCATION && searchFilterData.map((item, index) =>
              <Location
                key={index}
                avatar={item.avatar}
                name={item.name}
                address={item.address}
                rating={item.rating}
                school={item.school}
                score={item.score}
                index={index}
                id={item._id}
              />)}
          </div>

          <div className="row">
            {searchFilterData && searchFilterData.length > 0 && search_type.toUpperCase() === ALL_TYPE.USER && searchFilterData.map((item, index) =>
              <Member flowIdSuccess={id_flow => UpdateFlowUser(id_flow)}  item={item} index={index} key={index} id={item._id}
              />
            )}
          </div>

          <div className="row">
            {searchFilterData && searchFilterData.length > 0 && search_type.toUpperCase() === ALL_TYPE.LOCATION_REVIEW && searchFilterData.map((item, index) =>
              <Poster
                key={index}
                avatar= {getNestedObjectSafe(item,['user','profile','avatar'])}
                name = {getNestedObjectSafe(item,['location','name'])}
                fullName = {getNestedObjectSafe(item,['user','profile','fullName'])}
                rating = {getNestedObjectSafe(item,['location','rating'])}
                score = {getNestedObjectSafe(item,['location','score'])}
                content = {getNestedObjectSafe(item,['content'])}
                photos = {getNestedObjectSafe(item,['photos'])}
                createdAt = {getNestedObjectSafe(item,['createdAt'])}
                id = {getNestedObjectSafe(item,['_id'])}
              />)}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

ResultTypes.getInitialProps = async (context) => {
  const { search_type, keyword } = context.query;
  let searchData = [];
  try {
    searchData = await SEARCH_ENDPOINT.SEARCH_TYPE({ key_search: keyword, limit: initPagination.limit, type: search_type.toUpperCase() });
  } catch (error) {
    // console.log(error);
  }
  return {
    search_type,
    keyword,
    searchData
  };
};

ResultTypes.propTypes = {
  searchData: array,
  keyword: string,
  search_type: string
};

export default ResultTypes;
