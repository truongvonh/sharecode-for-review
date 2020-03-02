import React from 'react';
import { element, object } from 'prop-types';
import i18n from 'locales/i18n';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { Link } from 'routes/routesConfig';
import { getFromNow, getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import { NAVIGATE_URL } from 'constants/url';
import SvgIcons from 'components/SvgIcons';
import './style.scss';
import { useActions } from 'hooks/useActions';
import { closeLoading, openLoading, toggleLoginModal } from 'redux/common/actions';
import VoteAction from 'components/VoteAction';
import dynamic from 'next/dynamic';
import Linkify from 'react-linkify';
import SkeletonLoading from 'components/Skeleton';
import ReadMoreText from 'components/ReadmoreText';
import useCommentToPostOnFeed from 'hooks/useCommentToPostOnFeed';
import { PROFILE_USER_TYPE } from 'constants/common';

const CommentAction = dynamic(() => import('components/CommentAction'), {
  ssr: false,
  loading: () => (
    <div className="d-flex justify-content-between align-items-center">
      <SkeletonLoading width="50px" height="50px" isCircle />
      <SkeletonLoading width="5000px" maxWidth="calc(100% - 150px)" height="50px" />
      <SkeletonLoading height="50px" width="50px" isCircle />
    </div>
  )
});

const NewFeedItem = ({ newFeedItem, user = null, bannerAds = null, ...voteFunc }) => {
  const [toggleLoginMdAction, openLoadingAction, closeLoadingAction] = useActions(
    [toggleLoginModal, openLoading, closeLoading],
    null
  );

  const { impactObj } = newFeedItem;

  const checkLinkProfile = impactObj =>
    impactObj.isSchool
      ? NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(impactObj.linkProfile)
      : impactObj.isLocation
      ? NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(impactObj.linkProfile)
      : NAVIGATE_URL.GROUP_DETAIL_PAGE.URL(impactObj.linkProfile);

  const renderUserAvatar = user => (
    <div className="avatar overflow-hidden flex-shrink-0 shadow-lg">
      <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(user._id)}>
        <a className="d-block">
          <ImageWithFallback
            src={getNestedObjectSafe(user, ['profile', 'avatar', 0, 'thumb'])}
            alt={getNestedObjectSafe(user, ['profile', 'fullName'])}
          />
        </a>
      </Link>
    </div>
  );

  const isDisplayHeader = React.useMemo(
    () => getNestedObjectSafe(newFeedItem, ['owner', '_id']) !== getNestedObjectSafe(newFeedItem, ['user', '_id']),
    [newFeedItem]
  );

  const onCommentToPost = useCommentToPostOnFeed(
    newFeedItem.type,
    getNestedObjectSafe(newFeedItem, ['impactObj', 'linkDetailPost'])
  );

  return (
    <>
      <div className="new-feed-item bg-white rounded-lg p-3 mb-4 fz-16">
        {isDisplayHeader && (
          <header className="border-bottom pb-3 mb-4">
            <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(newFeedItem, ['owner', '_id']))}>
              <a className="color-font font-weight-bold">
                {getNestedObjectSafe(newFeedItem, ['owner', 'profile', 'fullName'])}
              </a>
            </Link>
            <span className="color-font fz-14 d-inline-block mx-2">
              {i18n.t(`new_feed_activity.${newFeedItem.type}`)}
            </span>
            <Link route={checkLinkProfile(impactObj)}>
              <a className="color-font font-weight-bold">{impactObj.name}</a>
            </Link>
          </header>
        )}
        <body>
          <div className="user-infor d-flex mb-3">
            {renderUserAvatar(newFeedItem.user)}
            <div className="relate-info pl-3 fz-16">
              <div className={`mb-1 d-flex flex-column ${impactObj.isGroup ? 'flex-lg-row' : ''}`}>
                <div className="d-flex align-items-center">
                  <Link
                    route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(
                      getNestedObjectSafe(newFeedItem, ['user', '_id']),
                      PROFILE_USER_TYPE.TIME_LINE
                    )}
                  >
                    <a className="mb-0 color-font font-weight-bold text-nowrap cursor-pointer">
                      {getNestedObjectSafe(newFeedItem, ['user', 'profile', 'fullName']) || ''}
                    </a>
                  </Link>
                  <div className="all-badge d-flex align-items-center">
                    {(getNestedObjectSafe(newFeedItem, ['user', 'badge']) || []).length > 0 &&
                      getNestedObjectSafe(newFeedItem, ['user', 'badge']).map(badge => (
                        <ImageWithFallback
                          className="ml-2"
                          key={badge._id}
                          src={getNestedObjectSafe(badge, ['photos', 0, 'thumb'])}
                        />
                      ))}
                  </div>
                </div>
                <div className="d-flex">
                  {impactObj.isGroup && (
                    <div className="px-2">
                      <SvgIcons fileName="icon_arrow_right" width={8} height={7} />
                    </div>
                  )}
                  <Link route={checkLinkProfile(impactObj)}>
                    <a
                      className={`mb-0 font-weight-bold d-inline-block pr-3 ${
                        impactObj.isGroup ? 'color-font' : 'color-link'
                      }`}
                    >
                      {impactObj.name}
                    </a>
                  </Link>
                </div>
              </div>
              <p className="mb-0 fz-14 text-secondary">{getFromNow(newFeedItem.updatedAt)}</p>
            </div>
            {!impactObj.isGroup && (
              <p className="mb-0 fz-18 ml-auto color-orange font-weight-bold">{`${impactObj.rating}/5.0`}</p>
            )}
          </div>
          <div className="content mb-3">
            <p className="mb-0 text-secondary">
              <Linkify target="_blank">
                <ReadMoreText text={impactObj.content}></ReadMoreText>
              </Linkify>
            </p>
          </div>
          {Array.isArray(impactObj.photos) && impactObj.photos.length > 0 && (
            <ImagesWithLightBox images={impactObj.photos} />
          )}
          <VoteAction isNewFeed objItem={newFeedItem} user={user} postId={impactObj.linkDetailPost} {...voteFunc} />
        </body>
        <footer className="border-top pt-3">
          {!user ? (
            <p className="text-primary fz-14 mb-0 cursor-pointer" onClick={toggleLoginMdAction}>
              {i18n.t('auth.login_please')}
            </p>
          ) : (
            <CommentAction user={user} id={newFeedItem.last_id || 0} onSubmit={onCommentToPost} />
          )}
        </footer>
      </div>
      {bannerAds}
    </>
  );
};

NewFeedItem.propTypes = {
  newFeedItem: object,
  user: object,
  bannerAds: element
};

export default React.memo(NewFeedItem);
