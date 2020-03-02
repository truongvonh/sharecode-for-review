import React, { useEffect, useState } from 'react';
import { RAKING_ENDPOINT, SCHOOL_ENDPOINT } from 'constants/endpoints';
import Select from 'react-select';
import Head from 'components/common/head';
import dynamic from 'next/dynamic';
import UserRankItem from 'pages/rank/UserRankItem';
import './rank.scss';

const InfiniteScroll = dynamic(() => import('react-infinite-scroller'));

const initPagination = {
  page: 1,
  limit: 15
};

const Rank = () => {
  const [pagination, setPagination] = React.useState(initPagination);
  const [rankingData, setRankingData] = React.useState([]);
  const [loadMore, setLoadMore] = useState(true);

  const { page, limit } = pagination;

  const getUserRanking = async ({ page, limit, id_school, sort, onScrollLoad = false }) => {
    try {
      const newData = await RAKING_ENDPOINT.LIST_RAKING({ page, limit, id_school, sort });
      if (onScrollLoad) {
        setRankingData(prevData => [...prevData, ...newData]);

        if (newData.length) setPagination(prevPaginate => ({ ...prevPaginate, page: prevPaginate.page + 1 }));
        if (newData.length < initPagination.limit) setLoadMore(false);
      } else setRankingData(newData);
    } catch (e) {
      console.log(e);
    }
  };

  const [sort] = useState(false);

  const options = [];
  const sortOption = [
    { value: true, label: 'Từ thấp đến cao' },
    { value: false, label: 'Từ cao đến thấp' }
  ];
  const [schoolData, setSchoolData] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedOptionSort, setSelectedOptionSort] = React.useState(sortOption[1]);

  //Call API list school
  const getSchool = async () => {
    try {
      const school = await SCHOOL_ENDPOINT.LIST_SCHOOL({});
      setSchoolData(school);
    } catch (e) {
      console.log(e);
    }
  };
  //Call API list school

  if (schoolData && schoolData.length > 0) {
    schoolData.map((item, index) => {
      options.push({ value: item._id, label: item.name });
    });
  }

  //handle select school
  const handleChange = async selectedOption => {
    const id_school_select = selectedOption ? selectedOption.value : '';
    setSelectedOption(id_school_select);
    setPagination({ ...pagination, page: initPagination.page });
    if (id_school_select) {
      setLoadMore(false);
      await getUserRanking({
        page: initPagination.page,
        limit,
        id_school: id_school_select,
        sort: selectedOptionSort.value
      });
    } else {
      setLoadMore(true);
      await getUserRanking({ page: initPagination.page, limit, sort: selectedOptionSort.value });
    }
  };

  const handleChangeSort = async selectedOptionSort => {
    const sort = selectedOptionSort.value;
    setSelectedOptionSort(selectedOptionSort);
    if (!loadMore) setLoadMore(true);
    setPagination({ ...pagination, page: initPagination.page });
    try {
      await getUserRanking({ page: initPagination.page, limit, sort, id_school: selectedOption });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUserRanking({ page, limit });
    getSchool();
  }, []);

  const UpdateFlowUser = id_flow => {
    const newRankingData = [...rankingData];
    newRankingData.filter(item => {
      if (item.user_ranking._id == id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setRankingData(newRankingData);
  };

  const loadFunc = async nextPage => {
    if (nextPage !== page && loadMore) {
      await getUserRanking({ page: page + 1, limit, sort, onScrollLoad: true });
    }
  };

  return (
    <div className="">
      <Head title="Danh sách xếp hạng user" />
      <div className="wrapper-ranking d-flex align-items-center justify-content-md-between flex-column flex-md-row">
        <div className="wrapper-input-search-uni">
          <Select
            className="search-school"
            options={options}
            onChange={handleChange}
            placeholder="Tìm trường..."
            isClearable="true"
          />
        </div>
        <div className="wrapper-select-rank d-flex align-items-center justify-content-center">
          <span className="mr-2 text-nowrap fz-16">Sắp xếp thứ hạng</span>
          <Select
            className="sort-select"
            options={sortOption}
            isSearchable={sort}
            defaultValue={sortOption[1]}
            value={selectedOptionSort}
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
        <div className="row  py-5 px-2 px-lg-0">
          {rankingData.map((item, index) => (
            <UserRankItem flowIdSuccess={id_flow => UpdateFlowUser(id_flow)} item={item} index={index} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Rank;
