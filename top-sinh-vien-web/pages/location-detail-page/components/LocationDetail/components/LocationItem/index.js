import React from 'react';
import { object } from 'prop-types';
import i18n from 'locales/i18n';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { Link } from 'routes/routesConfig';
import { getFromNow, getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import SvgIcons from 'components/SvgIcons';
import './style.scss';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import VoteAction from 'components/VoteAction';
// import CommentAction from 'album-detail/CommentAction';
import dynamic from 'next/dynamic';
import { NAVIGATE_URL } from 'constants/url';
import useCommentToPostOnFeed from 'hooks/useCommentToPostOnFeed';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';

const CommentAction = dynamic(() => import('components/CommentAction'), { ssr: false });

const NewFeedItem = ({ newFeedItem, user = null, ...voteFunc }) => {
  const toggleLoginMdAction = useActions(toggleLoginModal, null);

  const { impactObj } = newFeedItem;

  const checkLinkProfile = impactObj => {
    const checkType = impactObj.isSchool ? '/school' : impactObj.isLocation ? '/location' : '/group';

    return `${checkType}/${impactObj.linkProfile}`;
  };

  const onCommentToPost = useCommentToPostOnFeed(
    ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION,
    getNestedObjectSafe(newFeedItem, ['impactObj', 'linkDetailPost'])
  );

  const renderUserAvatar = user => (
    <div className="avatar overflow-hidden flex-shrink-0 shadow-lg">
      <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(user, ['_id']))}>
        <a className="d-block">
          <ImageWithFallback
            src={getNestedObjectSafe(user, ['profile', 'avatar', 0, 'thumb'])}
            alt={getNestedObjectSafe(user, ['profile', 'fullName'])}
          />
        </a>
      </Link>
    </div>
  );
  return (
    <>
      <div className="new-feed-item bg-white rounded-lg p-3 mb-4 fz-16">
        <body>
          <div className="user-infor d-flex mb-3">
            {renderUserAvatar(newFeedItem.user)}
            <div className="relate-info pl-3 fz-16">
              <div className="mb-1 d-flex flex-column flex-lg-row">
                <div className="d-flex align-items-center">
                  <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(newFeedItem, ['user', '_id']))}>
                    <a className="mb-0 color-font font-weight-bold">
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
                {impactObj.isGroup && (
                  <div className="d-flex">
                    <div className="px-2">
                      <SvgIcons fileName="icon_arrow_right" width={8} height={7} />
                    </div>
                    <Link
                    // route={checkLinkProfile(impactObj)}
                    >
                      <a className="mb-0 font-weight-bold color-font">{impactObj.name}</a>
                    </Link>
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center">
                <p className="mb-0 fz-14 text-secondary pr-2">{getFromNow(newFeedItem.updatedAt)}</p>
                {/*  <Link*/}
                {/*  // route={checkLinkProfile(impactObj)}*/}
                {/*>*/}
                {/*    <a className="  font-weight-bold  pr-3 color-link">*/}
                {/*      {getNestedObjectSafe(newFeedItem, ['impactObj', 'name'])}*/}
                {/*    </a>*/}
                {/*  </Link>*/}
                <p className=" mb-0 font-weight-bold  pr-3 color-link">
                  {getNestedObjectSafe(newFeedItem, ['impactObj', 'name'])}
                </p>
              </div>
            </div>
            {!impactObj.isGroup && (
              <p className="mb-0 fz-18 ml-auto color-orange font-weight-bold">{`${impactObj.rating}/5.0`}</p>
            )}
          </div>
          <div className="content mb-3">
            <p className="mb-0 text-secondary">{impactObj.content}</p>
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
            <CommentAction
              user={user}
              // id={newFeedItem.last_id || 0}
              onSubmit={onCommentToPost}
            />
          )}
        </footer>
      </div>
    </>
  );
};

NewFeedItem.propTypes = {
  newFeedItem: object,
  user: object
};

export default React.memo(NewFeedItem);
