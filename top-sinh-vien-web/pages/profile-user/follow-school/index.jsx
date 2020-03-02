import React from 'react';
import Head from 'components/common/head';
import { ConsumerProfiler } from 'layout/ProfileUserWrapper';
// import InfiniteScroll from 'react-infinite-scroller';
import DataFound from 'components/dataFound';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import 'pages/profile-user/time-line/style.scss';
import dynamic from 'next/dynamic';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import CardSchool from 'pages/profile-user/components/card-school';
import PlaceHolder from 'components/place-hoder-card-user';

const initPagination = {
  page: 1,
  limit: 12
};

const InfiniteScroll = dynamic(() => import('react-infinite-scroller'), { ssr: false });

const FollowSchool = ({ user_id }) => {
  const [pagination, setPagination] = React.useState(initPagination);
  const [loadMore, setLoadMore] = React.useState(true);
  const { page, limit } = pagination;
  const [listFollowSchool, setlistFollowSchool] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getSchoolFollow = async ({ page, limit, user_id, key, onScrollLoad = false }) => {
    try {
      const data = await FLOW_ENDPOINT.LIST_FOLLOW_SCHOOL({ page, limit, user_id, key });
      if (data.length < initPagination.limit) {
        setLoadMore(false);
      }
      if (onScrollLoad) {
        setlistFollowSchool(prevData => [...prevData, ...data]);
        if (data.length) setPagination(prevPaginate => ({ ...prevPaginate, page: prevPaginate.page + 1 }));
        if (data.length < initPagination.limit) setLoadMore(false);
      } else setlistFollowSchool(data);
      if (data) setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const flowIdSuccess = id_flow => {
    const newListFollow = [...listFollowSchool];
    newListFollow.filter(item => {
      if (item._id == id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setlistFollowSchool(newListFollow);
  };

  const loadFunc = async nextPage => {
    const hasSchool = listFollowSchool.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasSchool) {
      await getSchoolFollow({ page: page + 1, limit, user_id, onScrollLoad: true });
    }
  };

  const [search] = useDebouncedCallback(async text => {
    setPagination({ ...pagination, page: initPagination.page });
    if (text && text != '') {
      setLoadMore(false);
      await getSchoolFollow({
        user_id: user_id,
        key: text
      });
    } else {
      setLoadMore(true);
      await getSchoolFollow({ user_id: user_id });
    }
  }, 1000);

  React.useEffect(() => {
    if (user_id) {
      getSchoolFollow({ page: 1, limit: 15, user_id });
    }
  }, [user_id]);

  return (
    <>
      <Head ogImage="/static/img/img_logo.png" title="Trường đang theo dõi" />
      <div className="wrapper-nav-search pt-4">
        <input
          className="input-search fz-12 pr-4 py-3 form-control"
          onChange={e => search(e.target.value)}
          placeholder="Tìm kiếm..."
        />
        <img className="ic-search cursor-pointer" src="/static/icons/ic_tim_kiem.svg" />
      </div>
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} threshold={10} loader={<PlaceHolder />}>
        <div className="wrapper-content pt-4 row ">
          {listFollowSchool.map((item, index) => (
            <CardSchool schoolData={item} key={index} flowIdSuccess={flowIdSuccess} />
          ))}
        </div>
      </InfiniteScroll>
      {isLoading === false && listFollowSchool && listFollowSchool.length <= 0 && <DataFound />}
    </>
  );
};

const WrapperFollowSchool = () => {
  return (
    <ConsumerProfiler>
      {context => (
        <React.Fragment>
          <FollowSchool
            user_id={context.user_id}
            profileInfo={context.profileInfo}
            onClickViewID={context.onClickViewID}
          />
        </React.Fragment>
      )}
    </ConsumerProfiler>
  );
};

export default WrapperFollowSchool;
