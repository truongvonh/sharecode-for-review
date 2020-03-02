import React, { useState } from 'react';
import Head from 'components/common/head';
import { ConsumerProfiler } from 'layout/ProfileUserWrapper';
import DataFound from 'components/dataFound';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import 'pages/profile-user/time-line/style.scss';
import dynamic from 'next/dynamic';
import CardUser from 'pages/profile-user/components/card-user';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import PlaceHolder from 'components/place-hoder-card-user';

const initPagination = {
  page: 1,
  limit: 12
};

const InfiniteScroll = dynamic(() => import('react-infinite-scroller'), { ssr: false });

const YouFollow = ({ user_id, onClickViewID }) => {
  const [pagination, setPagination] = React.useState(initPagination);
  const [loadMore, setLoadMore] = useState(true);
  const { page, limit } = pagination;
  const toggleModalLoginAction = useActions(toggleLoginModal, null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [listYouFollow, setlistYouFollow] = React.useState([]);

  const getFollowMe = async ({ page, limit, user_id, key, onScrollLoad = false }) => {
    try {
      const newData = await FLOW_ENDPOINT.LIST_YOU_FOLLOW_PEOPLE({ page, limit, user_id, key });
      if (newData.length < initPagination.limit) {
        setLoadMore(false);
      }
      if (onScrollLoad) {
        setlistYouFollow(prevData => [...prevData, ...newData]);
        if (newData.length) setPagination(prevPaginate => ({ ...prevPaginate, page: prevPaginate.page + 1 }));
        if (newData.length < initPagination.limit) setLoadMore(false);
      } else setlistYouFollow(newData);
      if (newData) setIsLoading(false);
    } catch (e) {
      if (e === 'TOKEN_INVALID') {
        toggleModalLoginAction();
      }
    }
  };

  const flowIdSuccess = id_flow => {
    const newlistYouFollow = [...listYouFollow];
    newlistYouFollow.filter(item => {
      if (item._id == id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setlistYouFollow(newlistYouFollow);
  };

  const [search] = useDebouncedCallback(async text => {
    setPagination({ ...pagination, page: initPagination.page });
    if (text && text != '') {
      setLoadMore(false);
      await getFollowMe({
        user_id: user_id,
        key: text
      });
    } else {
      setLoadMore(true);
      await getFollowMe({ user_id: user_id });
    }
  }, 500);

  const loadFunc = async nextPage => {
    const hasFollow = listYouFollow.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasFollow) {
      await getFollowMe({ page: page + 1, limit, user_id: user_id, onScrollLoad: true });
    }
  };

  React.useEffect(() => {
    getFollowMe({ page, limit, user_id });
  }, []);

  React.useEffect(() => {
    if (user_id) {
      getFollowMe({ page, limit, user_id });
    }
  }, [user_id]);

  return (
    <>
      <Head ogImage="/static/img/img_logo.png" title="Đang theo dõi" />
      <div className="wrapper-nav-search pt-4">
        <input
          className="input-search fz-12 pr-4 py-3 form-control"
          placeholder="Tìm kiếm..."
          onChange={e => search(e.target.value)}
        />
        <img className="ic-search cursor-pointer" src="/static/icons/ic_tim_kiem.svg" />
      </div>
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} loader={<PlaceHolder />} threshold={10}>
        <div className="wrapper-content pt-4 row ">
          {listYouFollow.map((item, index) => (
            <CardUser userData={item} key={index} flowIdSuccess={flowIdSuccess} onClickViewID={onClickViewID} />
          ))}
        </div>
      </InfiniteScroll>
      {isLoading === false && listYouFollow && listYouFollow.length <= 0 && <DataFound />}
    </>
  );
};

const WrapYouFollow = () => {
  return (
    <ConsumerProfiler>
      {context => (
        <React.Fragment>
          <YouFollow
            user_id={context.user_id}
            profileInfo={context.profileInfo}
            onClickViewID={context.onClickViewID}
          />
        </React.Fragment>
      )}
    </ConsumerProfiler>
  );
};

export default WrapYouFollow;
