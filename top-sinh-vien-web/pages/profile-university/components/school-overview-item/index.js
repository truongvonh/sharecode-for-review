import React from 'react';
import { array, object, string } from 'prop-types';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { Link } from 'routes/routesConfig';
import { getFromNow, getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import './style.scss';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import VoteAction from 'components/VoteAction';
import { OVERVIEW_SCHOOL_STATUS, OVERVIEW_SCHOOL_TYPE, REVIEW_SCHOOL_TEXT } from 'constants/common';
import { NAVIGATE_URL } from 'constants/url';

const OverviewItem = ({
  schoolAbout,
  overviewSchool,
  user = null,
  university_id,
  onClickStatus,
  type = OVERVIEW_SCHOOL_TYPE.REVIEW_LOCATION,
  ...voteFunc
}) => {
  const toggleLoginMdAction = useActions(toggleLoginModal, null);

  const checkLinkProfile = impactObj =>
    impactObj.isSchool
      ? NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(impactObj.linkProfile)
      : impactObj.isLocation
      ? NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(impactObj.linkProfile)
      : NAVIGATE_URL.GROUP_DETAIL_PAGE.URL(impactObj.linkProfile);

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
      {overviewSchool && (
        <div className="school-overview-wrapper bg-white rounded-lg p-3 mb-4 fz-16">
          <header className="border-bottom pb-3 mb-4">
            {type === OVERVIEW_SCHOOL_TYPE.REVIEW_SCHOOL ? (
              <p className="m-0 p-0 font-weight-bold fz-16">
                {REVIEW_SCHOOL_TEXT.REVIEW_SCHOOL} ({getNestedObjectSafe(schoolAbout, ['total_review_school'])})
              </p>
            ) : (
              <p className="m-0 p-0 font-weight-bold fz-16">
                {REVIEW_SCHOOL_TEXT.REVIEW_LOCATION} ({getNestedObjectSafe(schoolAbout, ['location_near_by_school'])})
              </p>
            )}
          </header>
          <body>
            {overviewSchool.map((item, index) => (
              <div key={index}>
                <div className="user-infor d-flex mb-3 align-items-center">
                  {renderUserAvatar(getNestedObjectSafe(item, ['user']))}
                  <div className="relate-info pl-3 fz-16">
                    <div className="mb-1 d-flex flex-column flex-lg-row">
                      <div className="d-flex align-items-center">
                        <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(item, ['user', '_id']))}>
                          <a className="mb-0 color-font font-weight-bold fz-14">
                            {getNestedObjectSafe(item, ['user', 'profile', 'fullName']) || ''}
                          </a>
                        </Link>

                        <div className="all-badge d-flex align-items-center">
                          {(getNestedObjectSafe(item, ['user', 'badge']) || []).length > 0 &&
                            getNestedObjectSafe(item, ['user', 'badge']).map(badge => (
                              <ImageWithFallback
                                className="ml-2"
                                key={badge._id}
                                src={getNestedObjectSafe(badge, ['photos', 0, 'thumb'])}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0 fz-14 text-secondary pr-2">
                        {getFromNow(getNestedObjectSafe(item, ['updatedAt']))}
                      </p>
                      <Link route={checkLinkProfile(getNestedObjectSafe(item, ['impactObj']))}>
                        <a className="fz-14 color-link cursor-pointer mb-0 font-weight-bold">
                          {getNestedObjectSafe(item, ['impactObj', 'name'])}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <p className="ml-auto mb-0 color-orange font-weight-bold fz-16">{`${getNestedObjectSafe(item, [
                    'impactObj',
                    'rating'
                  ])}/5.0`}</p>
                </div>
                <div className="content mb-3">
                  <p className="mb-0 text-secondary">{getNestedObjectSafe(item, ['impactObj', 'content'])}</p>
                </div>
                {Array.isArray(getNestedObjectSafe(item, ['impactObj', 'photos'])) &&
                  (getNestedObjectSafe(item, ['impactObj', 'photos']) || []).length > 0 && (
                    <ImagesWithLightBox images={getNestedObjectSafe(item, ['impactObj', 'photos'])} />
                  )}
                <div className="border-bottom mb-4 clear-both pt-2">
                  <VoteAction
                    isNewFeed
                    objItem={item}
                    user={user}
                    postId={getNestedObjectSafe(item, ['impactObj', 'linkDetailPost'])}
                    {...voteFunc}
                  />
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-center">
              {type === OVERVIEW_SCHOOL_TYPE.REVIEW_SCHOOL ? (
                <button
                  className="btn-view-all px-5 py-2 font-weight-bold"
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.REVIEW_SCHOOL)}
                >
                  Xem tất cả
                </button>
              ) : (
                <button
                  className="btn-view-all px-5 py-2 font-weight-bold"
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.REVIEW_LOCATION)}
                >
                  Xem tất cả
                </button>
              )}
            </div>
          </body>
        </div>
      )}
    </>
  );
};

OverviewItem.propTypes = {
  schoolAbout: object,
  overviewSchool: array,
  user: object,
  type: string
};

export default React.memo(OverviewItem);
