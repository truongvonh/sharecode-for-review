import React, { useState } from 'react';
import { GROUP_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import Head from 'components/common/head';
import useModal from 'hooks/useModal';
import { shallowEqual, useSelector } from 'react-redux';
import GroupItem from 'components/GroupItem';
import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import InfiniteScroll from 'react-infinite-scroller';
import PlaceHolder from 'components/ProfileSchoolItem/PlaceHolder';
import { array, string } from 'prop-types';
import { GROUP_NAME_BY_TYPE } from 'constants/common';
import ImageWithFallback from 'components/ImageWithFallback';
import Link from 'next/link';

import './style.scss';
import { NAVIGATE_URL } from 'constants/url';
import PopupModalDownload from 'components/PopupModalDownload';
import IonicIcons from 'components/IonicIcons';
import DataFound from 'components/dataFound';

const initPagination = {
  page: 1,
  limit: 10
};

const Group = ({ groupData, type: groupType }) => {
  const [isShowingDownload, toggleDownload, closeDonwload] = useModal(false);
  const [listUserActivity, setListUserActivity] = React.useState([]);
  const [groupName, setGroupName] = React.useState('');
  const user = useSelector(store => store.auth.user, shallowEqual);
  const allGroup = useSelector(store => store.common.allGroups, shallowEqual);
  const toggleLoginMdAction = useActions(toggleLoginModal, null);
  const [pagination, setPagination] = React.useState(initPagination);
  const { page, limit } = pagination;
  const [loadMore, setLoadMore] = useState(true);
  const toggleModalLoginAction = useActions(toggleLoginModal, null);

  React.useEffect(() => {
    if (groupData) {
      setListUserActivity(groupData);
      if (groupData.length < initPagination.limit) setLoadMore(false);
      setPagination({ ...pagination, page: 1 });
    }
  }, [groupData]);

  React.useEffect(() => {
    if (allGroup && groupType) {
      let typeName = allGroup.find(element => element.type === groupType);
      setGroupName(typeName.name);
    }
  }, [allGroup, groupType]);

  const listPostGroup = async ({ page = 1, type, onScrollLoad = false }) => {
    try {
      const data = await GROUP_ENDPOINT.GET_POST_GROUP({ page, type });

      if (data && data.length < initPagination.limit) {
        setLoadMore(false);
      }
      if (onScrollLoad) {
        setListUserActivity(prevData => [...prevData, ...data]);
        if (data.length) setPagination(prevPagination => ({ ...prevPagination, page: prevPagination.page + 1 }));
      } else setListUserActivity(data);
    } catch (e) {
      if (e === 'TOKEN_INVALID') {
        toggleModalLoginAction();
      }
    }
  };

  const loadFunc = async nextPage => {
    const hasSchool = listUserActivity && listUserActivity.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasSchool) {
      await listPostGroup({
        type: groupType,
        page: page + 1,
        onScrollLoad: true
      });
    }
  };

  const onVoteDocument = async (type = 'GROUP', document) => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const result = listUserActivity.map(item => {
          if (getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) === document) {
            return { ...item, voted: !item.voted, totalVote: item.voted ? item.totalVote - 1 : item.totalVote + 1 };
          }
          return item;
        });
        setListUserActivity(result);
        await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div className="wrapper-group">
      {groupType && <Head ogImage="/static/img/img_logo.png" title={groupName} />}
      <PopupModalDownload isOpen={isShowingDownload} toggle={toggleDownload} close={closeDonwload} />
      <div>
        <h1 className="color-font fz-20 d-inline-block font-weight-bold text-uppercase pb-4">{groupName}</h1>
        {user && (
          <div className="bg-white rounded-lg p-3 mb-4 fz-16 ">
            <div className="d-flex">
              <Link href={NAVIGATE_URL.USER_PROFILE_PAGE.URL(user._id)}>
                <div className="image-avatar flex-shrink-0 cursor-pointer">
                  <ImageWithFallback
                    src={getNestedObjectSafe(user, ['profile', 'avatar', 0, 'thumb'])}
                    alt={getNestedObjectSafe(user, ['profile', 'fullName'])}
                  />
                </div>
              </Link>

              <textarea
                className="ml-4 p-2 input-cmt rounded w-100 cursor-pointer"
                value="Bạn vui lòng tải App Top Sinh viên để thực hiện chức năng này!"
                onClick={() => toggleDownload()}
              />
            </div>
            <div className="d-flex flex-row-reverse">
              <IonicIcons name="ion-md-images fz-24 color-link cursor-pointer d-inline-block" />
              <IonicIcons name="ion-md-happy fz-24 color-link cursor-pointer d-inline-block mr-2" />
            </div>
          </div>
        )}
      </div>

      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} threshold={10} loader={<PlaceHolder />}>
        {listUserActivity &&
          listUserActivity.length > 0 &&
          listUserActivity.map((item, index) => (
            <GroupItem groupItem={item} key={index} user={user} onVoteDocument={onVoteDocument} groupType={groupType} />
          ))}
      </InfiniteScroll>
      {listUserActivity && listUserActivity.length === 0 && <DataFound />}
    </div>
  );
};

Group.getInitialProps = async ({ query, req }) => {
  const { type } = query;

  let options = {};
  let groupData = null;

  if (!process.browser) {
    options = {
      headers: { cookie: req.headers.cookie }
    };
  }

  try {
    groupData = await GROUP_ENDPOINT.GET_POST_GROUP({ page: 1, type, ...options });
  } catch (e) {
    console.log(e);
  }
  return {
    groupData,
    type
  };
};

Group.propTypes = {
  type: string,
  groupData: array
};

export default Group;
