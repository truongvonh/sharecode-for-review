import React, { useState } from 'react';
import University from './component/university';
import Location from './component/location';
import Member from './component/member';
import Poster from './component/poster';
import { connect } from 'react-redux';
import Head from 'components/common/head';
import './result.scss';
import { array, string } from 'prop-types';
import NoResultData from 'components/NoResultData';
import { SEARCH_ENDPOINT } from 'constants/endpoints';
import { onSearchMain } from 'redux/common/actions';
import Link from 'next/link';
import { getNestedObjectSafe } from 'utils/helper';

const Result = ({ searchData, keyword , setSearchData }) => {
  const { location, user, location_review, school } = searchData;

  const UpdateFlowUser = id_flow => {
    const newSearch = [...searchData.user];
    newSearch.filter(item => {
      if (item._id === id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setSearchData(newSearch);
  };

  const UpdateFlowSchool = id_flow => {
    const newSchool = [...searchData.school];
    newSchool.filter(item => {
      if (item._id === id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setSearchData(newSchool);
  };
  return (
    <>
      <Head title="Danh sách tìm kiếm" />
      <div >

        {!location.length && !user.length && !location_review.length && !school.length &&
          <NoResultData />
        }
        <Link href={`result/school/${keyword}`} >
          <a >
            {school.length > 0 &&
              (<div className="pt-4 result-university ">
                <button className="result-university-button font-weight-bold border-0">Trường Học</button>
              </div>)}
          </a>
        </Link>

        <div className="row pt-4">
          {school.length > 0 && school.slice(0, 8).map((item, index) =>
            <University
              key={index}
              avatar={item.avatar}
              name={item.name}
              index={index}
              follow={item.follow}
              id={item._id}
              flowSchoolSuccess={UpdateFlowSchool}
            />
          )}
        </div>
      </div>

      <div >
        <Link href={`result/location/${keyword}`}>
          <a>
            {location.length > 0 &&
              (<div className="pt-4 result-university">
                <button className="result-university-button font-weight-bold border-0">Địa điểm</button>
              </div>)}
          </a>
        </Link>

        <div className="row content-place-page pt-4">
          {location.length > 0 && location.slice(0, 8).map((item, index) =>
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
      </div>

      <div >
        <Link href={`result/user/${keyword}`}>
          <a>
            {user.length > 0 &&
              (<div className="pt-4 result-university">
                <button className="result-university-button font-weight-bold border-0">Thành viên</button>
              </div>)}
          </a>
        </Link>

        <div className="row pt-4">
          {user.length > 0 && user.slice(0, 8).map((item, index) =>
            <Member flowIdSuccess={id_flow => UpdateFlowUser(id_flow)} item={item} index={index} key={index} id={item._id}
            />)}
        </div>
      </div>
      <Link href={`/result/location_review/${keyword}`}>
        <a>
          {location_review.length > 0 &&
            (<div className="pt-4 result-university">
              <button className="result-university-button font-weight-bold border-0">Bài viết</button>
            </div>)}
        </a>
      </Link>
      <div>
        <div className="row pt-4">
          {location_review.length > 0 && location_review.slice(0, 2).map((item, index) =>
            <Poster
              key={index}
              avatar={getNestedObjectSafe(item, ['user', 'profile', 'avatar'])}
              name={getNestedObjectSafe(item,['location','name'])}
              fullName={getNestedObjectSafe(item,['user','profile','fullName'])}
              rating = {getNestedObjectSafe(item,['location','rating'])}
              score = {getNestedObjectSafe(item,['location','score'])}
              content = {getNestedObjectSafe(item,['content'])}
              photos = {getNestedObjectSafe(item,['photos'])}
              createdAt = {getNestedObjectSafe(item,['createdAt'])}
              id = {getNestedObjectSafe(item,['_id'])}
            />)}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    searchData: state.common.searchData
  };
};

Result.propTypes = {
  searchData: array,
  keyword: string,
  setSearchData :array,
  setSearchSchool: array,
};

Result.getInitialProps = async (cxt) => {
  const { keyword } = cxt.query;
  let searchResult = {};
  if (keyword) {
    try {
      searchResult = await SEARCH_ENDPOINT.LIST_SEARCH({ key_search: keyword });
    } catch (e) {
      // console.log(e);
    }
  }
  cxt.reduxStore.dispatch(onSearchMain(searchResult));
  return {
    keyword
  };
};

export default connect(mapStateToProps, null)(Result);
