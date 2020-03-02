import React from 'react';
import Head from 'components/common/head';
import { ConsumerProfiler } from 'layout/ProfileUserWrapper';
import DataFound from 'components/dataFound';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import 'pages/profile-user/time-line/style.scss';
import dynamic from 'next/dynamic';
import CardUser from 'pages/profile-user/components/card-user';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import PlaceHolder from 'components/place-hoder-card-user';

const initPagination = {
  page: 1,
  limit: 12
};

const InfiniteScroll = dynamic(() => import('react-infinite-scroller'), { ssr: false });

const FollowYou = ({ user_id, onClickViewID }) => {
  const [pagination, setPagination] = React.useState(initPagination);
  const [keySearch, setKeySearch] = React.useState('');
  const [loadMore, setLoadMore] = React.useState(true);
  const { page, limit } = pagination;
  const [listFollowYou, setListFollowYou] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getFollowYou = async ({ page, limit, user_id, key, onScrollLoad = false }) => {
    try {
      const newData = await FLOW_ENDPOINT.LIST_PEOPLE_FOLLOW_YOU({ page, limit, user_id, key });
      if (newData.length < initPagination.limit) {
        setLoadMore(false);
      }
      if (onScrollLoad) {
        setListFollowYou(prevData => [...prevData, ...newData]);
        if (newData.length) setPagination(prevPaginate => ({ ...prevPaginate, page: prevPaginate.page + 1 }));
        if (newData.length < initPagination.limit) setLoadMore(false);
      } else setListFollowYou(newData);
      if (newData) setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (user_id) {
      getFollowYou({ page: 1, limit: 15, user_id });
    }
  }, [user_id]);

  const flowIdSuccess = id_flow => {
    const newListFollowYou = [...listFollowYou];
    newListFollowYou.filter(item => {
      if (item._id == id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setListFollowYou(newListFollowYou);
  };

  const loadFunc = async nextPage => {
    const hasFollow = listFollowYou.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasFollow) {
      await getFollowYou({ page: page + 1, limit, user_id, onScrollLoad: true });
    }
  };

  const [searchDebouce] = useDebouncedCallback(async text => {
    setKeySearch(text);
    setPagination({ ...pagination, page: initPagination.page });
    if (text && text != '') {
      setLoadMore(false);
      await getFollowYou({
        user_id: user_id,
        key: text
      });
    } else {
      setLoadMore(true);
      await getFollowYou({ user_id: user_id });
    }
  }, 1000);

  return (
    <>
      <Head ogImage="/static/img/img_logo.png" title="Được theo dõi" />
      <div className="wrapper-nav-search pt-4">
        <input
          className="input-search fz-12 pr-4 py-3 form-control"
          onChange={e => searchDebouce(e.target.value)}
          placeholder="Tìm kiếm..."
        />
        <img className="ic-search cursor-pointer" src="/static/icons/ic_tim_kiem.svg" />
      </div>
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} loader={<PlaceHolder />}>
        <div className="wrapper-content pt-4 row ">
          {listFollowYou &&
            listFollowYou.map((item, index) => (
              <CardUser
                userData={item}
                key={index}
                flowIdSuccess={flowIdSuccess}
                status="followYou"
                onClickViewID={onClickViewID}
              />
            ))}
        </div>
      </InfiniteScroll>
      {isLoading === false && listFollowYou && listFollowYou.length <= 0 && <DataFound />}
    </>
  );
};

const WrapperFollow = () => {
  return (
    <ConsumerProfiler>
      {context => (
        <React.Fragment>
          <FollowYou
            user_id={context.user_id}
            profileInfo={context.profileInfo}
            onClickViewID={context.onClickViewID}
          />
        </React.Fragment>
      )}
    </ConsumerProfiler>
  );
};

export default WrapperFollow;
