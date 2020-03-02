import React from 'react';
import { element, object, string } from 'prop-types';
import i18n from 'locales/i18n';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { Link } from 'routes/routesConfig';
import { getFromNow, getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import { NAVIGATE_URL } from 'constants/url';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import VoteAction from 'components/VoteAction';
import dynamic from 'next/dynamic';
import { ALL_NEWS_FEED_TYPE, GROUP_TYPE, PROFILE_USER_TYPE } from 'constants/common';
import useCommentToPostOnFeed from 'hooks/useCommentToPostOnFeed';
import ReadMoreText from 'components/ReadmoreText';
import { Button } from 'reactstrap';

import './style.scss';

const CommentAction = dynamic(() => import('components/CommentAction'), { ssr: false });

const GroupItem = ({ groupItem, user = null, bannerAds = null, groupType, ...voteFunc }) => {
  const toggleLoginMdAction = useActions(toggleLoginModal, null);
  const onCommentToPost = useCommentToPostOnFeed(
    ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP,
    getNestedObjectSafe(groupItem, ['impactObj', 'linkDetailPost'])
  );

  const { impactObj } = groupItem;

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

  const converMoney = value => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  };

  return (
    <>
      <div className="new-feed-item bg-white rounded-lg p-3 mb-4 fz-16 group-item">
        <body>
          <div className="user-infor d-flex mb-3">
            {renderUserAvatar(groupItem.user)}
            <div className="relate-info pl-3 fz-16">
              <div className={`mb-1 d-flex flex-column ${impactObj.isGroup ? 'flex-lg-row' : ''}`}>
                <div className="d-flex align-items-center">
                  <Link
                    href={NAVIGATE_URL.USER_PROFILE_PAGE.URL(
                      getNestedObjectSafe(groupItem, ['user', '_id']),
                      PROFILE_USER_TYPE.TIME_LINE
                    )}
                  >
                    <a className="mb-0 color-font font-weight-bold text-nowrap">
                      {getNestedObjectSafe(groupItem, ['user', 'profile', 'fullName']) || ''}
                    </a>
                  </Link>

                  <div className="all-badge d-flex align-items-center">
                    {(getNestedObjectSafe(groupItem, ['user', 'badge']) || []).length > 0 &&
                      getNestedObjectSafe(groupItem, ['user', 'badge']).map(badge => (
                        <ImageWithFallback
                          className="ml-2"
                          key={badge._id}
                          src={getNestedObjectSafe(badge, ['photos', 0, 'thumb'])}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <p className="mb-0 fz-14 text-secondary">{getFromNow(groupItem.updatedAt)}</p>
            </div>
            {!impactObj.isGroup && (
              <p className="mb-0 fz-18 ml-auto color-orange font-weight-bold">{`${impactObj.rating}/5.0`}</p>
            )}
          </div>
          <div className="content mb-3">
            <p className="mb-0 text-secondary">
              <ReadMoreText text={impactObj.content}></ReadMoreText>
            </p>
            {getNestedObjectSafe(groupItem, ['groupType']) === GROUP_TYPE.TENANT &&
              getNestedObjectSafe(groupItem, ['host']) === true && (
                <div className="pt-2">
                  <Button className="fz-12 font-weight-bold btn-rented">{i18n.t('tenant.rent')}</Button>
                  {
                    <Button color="success" className="fz-12 font-weight-bold ml-2">
                      {getNestedObjectSafe(groupItem, ['occupation']) === 'PENDING'
                        ? i18n.t('tenant.finish')
                        : i18n.t('tenant.unfinished')}
                    </Button>
                  }
                </div>
              )}
            {getNestedObjectSafe(groupItem, ['groupType']) === GROUP_TYPE.TENANT &&
              getNestedObjectSafe(groupItem, ['host']) === false && (
                <div className="pt-2">
                  <Button className="fz-12 font-weight-bold btn-lease">{i18n.t('tenant.tenant')}</Button>
                  {
                    <Button className="fz-12 font-weight-bold ml-2 btn-occupation">
                      {getNestedObjectSafe(groupItem, ['occupation']) === 'PENDING'
                        ? i18n.t('tenant.finish')
                        : i18n.t('tenant.unfinished')}
                    </Button>
                  }
                </div>
              )}
            {getNestedObjectSafe(groupItem, ['groupType']) === GROUP_TYPE.TRADING && (
              <p className="font-weight-bold fz-14 color-orange pt-2 mb-0">
                Giá: {converMoney(getNestedObjectSafe(groupItem, ['price']))}
              </p>
            )}

            <div className="d-flex pt-2">
              {(getNestedObjectSafe(groupItem, ['groupTags']) || []).length > 0 &&
                getNestedObjectSafe(groupItem, ['groupTags']).map((item, index) => (
                  <p key={index} className="fz-14 font-weight-bold color-link pr-2 mb-0">
                    #{getNestedObjectSafe(item, ['tag'])}
                  </p>
                ))}
            </div>
          </div>
          {Array.isArray(impactObj.photos) && impactObj.photos.length > 0 && (
            <ImagesWithLightBox images={impactObj.photos} />
          )}
          <VoteAction isNewFeed objItem={groupItem} user={user} postId={impactObj.linkDetailPost} {...voteFunc} />
        </body>
        <footer className="border-top pt-3">
          {!user ? (
            <p className="text-primary fz-14 mb-0 cursor-pointer" onClick={toggleLoginMdAction}>
              {i18n.t('auth.login_please')}
            </p>
          ) : (
            <CommentAction user={user} onSubmit={onCommentToPost} />
          )}
        </footer>
      </div>
      {bannerAds}
    </>
  );
};

GroupItem.propTypes = {
  groupItem: object,
  groupType: string,
  user: object,
  bannerAds: element
};

export default React.memo(GroupItem);
