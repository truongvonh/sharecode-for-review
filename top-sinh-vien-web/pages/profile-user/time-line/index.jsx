import React, { useState } from 'react';
import Head from 'components/common/head';
import { ConsumerProfiler } from 'layout/ProfileUserWrapper';
import { Animated } from 'react-animated-css';
import { GALLERY_TYPE, NO_DATA_PROFILE, PROFILE_USER_TYPE } from 'constants/common';
import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
import InfiniteScroll from 'react-infinite-scroller';
import PlaceHolder from 'components/NewFeedItem/PlaceHolder';
import NewFeedItem from 'components/NewFeedItem';
import DataFound from 'components/dataFound';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { ALBUM_PHOTOS_ENDPOINT, USER_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import 'pages/profile-user/time-line/style.scss';

const initPagination = {
  page: 1,
  limit: 10
};

const TimeLine = ({ user_id, profileInfo, onClickStatus }) => {
  const [listUserActivity, setListUserActivity] = React.useState([]);
  const user = useSelector(store => store.auth.user, shallowEqual);
  const toggleLoginMdAction = useActions(toggleLoginModal, null);
  const [album_photo_review, setAlbum_photo_review] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [pagination, setPagination] = React.useState(initPagination);
  const { page, limit } = pagination;

  const getUserActivity = async ({ page, user_id, onScrollLoad = false }) => {
    try {
      const data = await USER_ENDPOINT.LIST_USER_ACTIVITY({ page, user_id });
      if (data.length < initPagination.limit) setLoadMore(false);
      if (data) setIsLoading(false);
      if (onScrollLoad) {
        setListUserActivity(prevData => [...prevData, ...data]);
        if (data.length) setPagination(prevPagination => ({ ...prevPagination, page: prevPagination.page + 1 }));
      } else setListUserActivity(data);
      if (data) setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const albumPhotos = [];
  const getAlbumPhotos = async ({ user_id }) => {
    try {
      const data = await ALBUM_PHOTOS_ENDPOINT.ALBUM_PHOTOS({ user_id });
      data.map(item => albumPhotos.push(item.photos.length && item.photos));
      const itemAlbumPhotos = [].concat(...albumPhotos);
      setAlbum_photo_review(itemAlbumPhotos);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (user_id) getAlbumPhotos({ user_id });
    if (user_id && !listUserActivity.length) getUserActivity({ user_id: user_id, page });
  }, [user_id]);

  const loadFunc = async nextPage => {
    const hasActivity = listUserActivity.length >= initPagination.limit;
    if (nextPage !== page && loadMore && hasActivity) {
      await getUserActivity({
        user_id: user_id,
        page: page + 1,
        onScrollLoad: true
      });
    }
  };

  const onVoteDocument = async (type, document) => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const data = await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
        if (data) {
          const result = listUserActivity.map(item => {
            if (getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) === document) {
              return { ...item, voted: !item.voted, totalVote: item.voted ? item.totalVote - 1 : item.totalVote + 1 };
            }
            return item;
          });
          setListUserActivity(result);
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      {profileInfo && profileInfo.profile && profileInfo.profile.fullName && (
        <Head
          ogImage="/static/img/img_logo.png"
          title={`${getNestedObjectSafe(profileInfo, ['profile', 'fullName'])}`}
        />
      )}

      <div className="mt-4 wrapper-time-line d-flex">
        <Animated
          animationIn="bounceInUp"
          animationOut="zoomOutDown"
          isVisible={true}
          className="wrapper-slide p-3 d-none d-xl-block sticky-top"
        >
          <div>
            <div className="pb-4 text-introduce">
              <span className="font-weight-bold fz-16 color-font">
                Giới thiệu
                {user && user._id === user_id && (
                  <img
                    className="cursor-pointer pl-3"
                    src="/static/img/ic_edit.png"
                    onClick={() => onClickStatus(PROFILE_USER_TYPE.EDIT_PROFILE)}
                  />
                )}
              </span>
            </div>
            {profileInfo.profile &&
              (!profileInfo.profile.school ||
                (profileInfo.profile.school && profileInfo.profile.school.name.length === 0)) &&
              profileInfo.profile.address.length === 0 &&
              profileInfo.profile.describe.length === 0 && (
                <div className="d-flex align-items-center justify-content-center flex-column pt-2">
                  <ion-icon name="information-circle-outline" size="large"></ion-icon>
                  <p className="font-weight-bold fz-16 pt-2">{NO_DATA_PROFILE.INFO}</p>
                </div>
              )}

            {profileInfo && profileInfo.profile && profileInfo.profile.school && profileInfo.profile.school.name && (
              <div className="d-flex pt-3 pb-3">
                <span className="fz-14 color-font col-5 pl-0">Trường học: </span>
                <span className="fz-14 color-font font-weight-bold">
                  {getNestedObjectSafe(profileInfo, ['profile', 'school', 'name'])}
                </span>
              </div>
            )}

            {profileInfo && profileInfo.profile && profileInfo.profile.address && (
              <div className="d-flex pb-3">
                <span className="fz-14 color-font col-5 pl-0">Đến từ: </span>
                <span className="fz-14 color-font font-weight-bold">
                  {getNestedObjectSafe(profileInfo, ['profile', 'address'])}
                </span>
              </div>
            )}

            {profileInfo && profileInfo.profile && profileInfo.profile.describe && (
              <div className="d-flex pb-3">
                <span className="fz-14 color-font col-5 pl-0">Mô tả thêm: </span>
                <span className="fz-14 color-font font-weight-bold">
                  {getNestedObjectSafe(profileInfo, ['profile', 'describe'])}
                </span>
              </div>
            )}
          </div>
        </Animated>

        <div className="new-feed-wrapper col-12 col-lg-6 pb-5 pb-lg-0">
          <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={loadMore} threshold={10} loader={<PlaceHolder />}>
            {listUserActivity.length > 0 &&
              listUserActivity.map((item, index) => (
                <NewFeedItem newFeedItem={item} key={index} onVoteDocument={onVoteDocument} user={user} />
              ))}
          </InfiniteScroll>
          {isLoading === false && listUserActivity && listUserActivity.length <= 0 && <DataFound />}
        </div>

        <Animated
          animationIn="bounceInUp"
          animationOut="zoomOutDown"
          isVisible={true}
          className="wrapper-slide p-3 d-none d-xl-block sticky-top"
        >
          <div>
            <div className="pb-2 text-introduce d-flex justify-content-between">
              <span className="font-weight-bold fz-16 color-font">Hình ảnh</span>
              <span
                className="color-font fz-14 cursor-pointer"
                onClick={() => onClickStatus(PROFILE_USER_TYPE.ALBUM_USER)}
              >
                Xem tất cả
              </span>
            </div>
            <div className="wrapper-album-photos">
              {!album_photo_review ||
                (album_photo_review.length === 0 && (
                  <div className="d-flex justify-content-center align-items-center flex-column pt-2">
                    <ion-icon name="image" size="large"></ion-icon>
                    <p className="font-weight-bold fz-16 pt-2">{NO_DATA_PROFILE.PHOTO}!</p>
                  </div>
                ))}
              <ImagesWithLightBox
                images={album_photo_review && album_photo_review.length > 0 && album_photo_review.slice(0, 9)}
                typeGallery={GALLERY_TYPE.ALBUM}
              />
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
};

const WrapperTimeLine = () => {
  return (
    <ConsumerProfiler>
      {context => (
        <React.Fragment>
          <TimeLine user_id={context.user_id} profileInfo={context.profileInfo} onClickStatus={context.onClickStatus} />
        </React.Fragment>
      )}
    </ConsumerProfiler>
  );
};

export default WrapperTimeLine;
