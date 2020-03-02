import React from 'react';
import { LOCATION_ENDPOINT, SCHOOL_ENDPOINT } from 'constants/endpoints';
import { shallowEqual, useSelector } from 'react-redux';
import i18n from 'locales/i18n';
// import Link from 'next/link';
import { Link, Router } from 'routes/routesConfig';
import { Animated } from 'react-animated-css';
import dynamic from 'next/dynamic';
import 'layout/NewsFeedWrapper/style.scss';
import ImageWithFallback from 'components/ImageWithFallback';
import SchoolItem from 'components/SchoolItem';
import { NAVIGATE_URL } from 'constants/url';
import { getNestedObjectSafe } from 'utils/helper';
import LocationCard from 'components/LocationCard';
import './style.scss';
import StarRating from 'components/StarRating';
import { ALL_NEWS_FEED_TYPE, FALLBACK_IMAGE_TYPE } from 'constants/common';
import Truncate from 'react-truncate';
import { useActions } from 'hooks/useActions';
import { openLoading } from 'redux/common/actions';

const GlobalLoadingWrapper = dynamic(() => import('layout/GlobalLoadingWrapper'), { ssr: false });

const MAX_COUNT_LIMIT = 4;

const DetailSchoolWrapper = ({ children, id_review }) => {
  const [schools, setSchools] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [moreReview, setMoreReview] = React.useState([]);
  const [schoolAbout, setSchoolAbout] = React.useState([]);
  const allGroups = useSelector(store => store.common.allGroups, shallowEqual);
  const detailReviewData = useSelector(store => store.common.detailReviewData, shallowEqual);
  const [locationNearSchool, setlocationNearSchool] = React.useState([]);
  const openLoadingAction = useActions(openLoading, null);

  const getAllSideBarInfor = async () => {
    try {
      const [schools, locations] = await Promise.all([
        SCHOOL_ENDPOINT.LIST_SCHOOL({ limit: MAX_COUNT_LIMIT }),
        LOCATION_ENDPOINT.LIST_LOCATION({ limit: MAX_COUNT_LIMIT })
      ]);

      if (schools.length) setSchools(schools);
      if (locations.length) setLocations(locations);
    } catch (e) {
      console.log(e);
    }
  };

  const getMoreReviewSchool = async ({ id, page, limit = 3 }) => {
    try {
      const data = await SCHOOL_ENDPOINT.REVIEW_OF_SCHOOL({ id, page, limit });
      const newMoreReview = getNestedObjectSafe(data, ['result']).filter(
        item => getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) !== id_review
      );
      setMoreReview(newMoreReview);
    } catch (e) {
      console.log(e);
    }
  };

  const getLocationNearSchool = async ({ id: id }) => {
    try {
      const data = await SCHOOL_ENDPOINT.LOCATION_NEAR_SCHOOL({ id: id });
      setlocationNearSchool(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getSchoolAbout = async ({ id: id }) => {
    try {
      const data = await SCHOOL_ENDPOINT.SCHOOL_INFO({ university_id: id });
      setSchoolAbout(data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const id_school = getNestedObjectSafe(detailReviewData, ['school', '_id']);
    if (id_school) {
      getSchoolAbout({ id: id_school });
      getLocationNearSchool({ id: id_school });
      getMoreReviewSchool({ id: id_school });
    }
  }, [detailReviewData]);

  React.useEffect(() => {
    getAllSideBarInfor();
  }, []);

  const schoolBackground = {
    background: `url("${
      getNestedObjectSafe(detailReviewData, ['school', 'cover', 0, 'origin'])
        ? getNestedObjectSafe(detailReviewData, ['school', 'cover', 0, 'origin'])
        : '/static/img/bg_cover.png'
    }") no-repeat center center`,
    backgroundSize: 'cover'
  };

  const navigateOtherReview = React.useCallback(review => {
    openLoadingAction();
    Router.pushRoute(
      NAVIGATE_URL.DETAIL_SCHOOL_REVIEW.URL(
        getNestedObjectSafe(review, ['impactObj', 'linkDetailPost']),
        ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL
      ),
      NAVIGATE_URL.DETAIL_SCHOOL_REVIEW.AS
    );

  }, []);

  return (
    <>
      <div className="container detail-school-wrapper">
        <GlobalLoadingWrapper />
        <div className="row news-page">
          {allGroups.length > 0 && locations.length > 0 && (
            <aside className="position-fixed side-content col-lg-3 d-none d-lg-block pb-3">
              <Animated animationIn="bounceInUp" animationOut="zoomOutDown" isVisible={allGroups.length > 0}>
                {detailReviewData && (
                  <div className="over-clay-background position-relative rounded mb-3 overflow-hidden">
                    <div
                      className="avatar-school rounded d-flex justify-content-center align-items-center"
                      style={schoolBackground}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <h3 className="text-white school-name fz-16 font-weight-bold text-center px-2">
                          {getNestedObjectSafe(detailReviewData, ['school', 'name'])}
                        </h3>
                        <div className="wraper-rating">
                          <StarRating val={Math.ceil(getNestedObjectSafe(detailReviewData, ['school', 'rating']))} />
                        </div>
                        <h3 className="text-white school-name fz-18 font-weight-bold pt-2">
                          {Math.ceil(getNestedObjectSafe(detailReviewData, ['school', 'rating']))}/5.0
                        </h3>
                        {schoolAbout && (
                          <h3 className="text-white school-name fz-16">
                            ({getNestedObjectSafe(schoolAbout, ['total_review_school'])} đánh giá)
                          </h3>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {detailReviewData && locationNearSchool && (
                  <div className="main-group-wrapper bg-white rounded p-3 mb-3">
                    <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
                      {i18n.t('suggest_maps_location')}
                    </h3>
                    <div className="pt-3">
                      <LocationCard
                        coordinate={getNestedObjectSafe(detailReviewData, ['school', 'coordinate'])}
                        locationNearSchool={locationNearSchool}
                      />
                    </div>
                  </div>
                )}

                {moreReview && moreReview.length > 0 && (
                  <div className="main-group-wrapper bg-white rounded p-3 mb-3">
                    <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
                      {i18n.t('suggest_more_review')}
                    </h3>
                    <div className="pt-3">
                      {moreReview.slice(0, 2).map((item, index) => (
                        <div key={index}>
                          <div className="img-cover-more-review rounded cursor-pointer" 
                               onClick={() => navigateOtherReview(item)}>
                            <ImageWithFallback
                              alt="img-more-review"
                              fallbackType={FALLBACK_IMAGE_TYPE.REVIEW}
                              src={getNestedObjectSafe(item, ['impactObj', 'photos', 0, 'origin'])}
                            />
                          </div>
                          <div className="user-wrapper py-2 d-flex align-items-center">
                            <div className="avatar-user">
                              <ImageWithFallback
                                alt="img-avatar"
                                fallbackType={FALLBACK_IMAGE_TYPE.AVATAR}
                                src={getNestedObjectSafe(item, ['user', 'profile', 'avatar', 0, 'origin'])}
                              />
                            </div>
                            <div className="d-flex flex-column">
                              <p className="mb-0 fz-14 font-weight-bold color-font pl-2">
                                <Truncate lines={1}>
                                  {getNestedObjectSafe(item, ['user', 'profile', 'fullName'])}
                                </Truncate>
                              </p>
                              <h3 className="pl-2 mb-0 color-orange font-weight-bold fz-16">
                                {getNestedObjectSafe(item, ['impactObj', 'rating'])}/5
                              </h3>
                            </div>
                          </div>
                          <p>
                            <Truncate lines={2} className="fz-14">
                              {getNestedObjectSafe(item, ['impactObj', 'content'])}
                            </Truncate>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Animated>
            </aside>
          )}
          <div className="new-feed-wrapper col-12 pb-5 pb-lg-0 px-0 px-lg-2">{children}</div>

          <aside className="position-fixed side-content col-lg-3 d-none d-lg-block right-position">
            <Animated
              animationIn="bounceInUp"
              animationOut="zoomOutDown"
              // isVisible={schools.length > 0}
            >
              {schools.length > 0 && (
                <div className="main-group-wrapper bg-white rounded p-3 mb-3">
                  <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
                    {i18n.t('school')}
                  </h3>
                  <ul className="pl-0 m-0">
                    {schools.map((item, index) => (
                      <li key={index}>
                        <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(item._id)}>
                          <a>
                            <SchoolItem schoolData={item} />
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Animated>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DetailSchoolWrapper;
