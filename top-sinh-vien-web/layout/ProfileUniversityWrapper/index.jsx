import React, { useState } from 'react';
import { getNestedObjectSafe } from 'utils/helper';
import { element, string } from 'prop-types';
import LocationCard from 'components/LocationCard';

import './style.scss';
import StarRating from 'components/StarRating';
import { ALBUM_PHOTOS_ENDPOINT, FLOW_ENDPOINT, SCHOOL_ENDPOINT } from 'constants/endpoints';
import { Animated } from 'react-animated-css';
import i18n from 'locales/i18n';
import IonicIcons from 'components/IonicIcons';
import { Collapse } from 'reactstrap';

import ImagesWithLightBox from 'components/ImagesWithLightBox';
import {
  ALL_TYPE,
  GALLERY_TYPE,
  NO_DATA_PROFILE,
  OVERVIEW_SCHOOL_STATUS,
  TYPE_FOLLOW,
  UNFOLLOW_TYPE
} from 'constants/common';
import { Router } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import { useRouter } from 'next/router';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { useSelector } from 'react-redux';
import ModalUnFollowUser from 'components/ModalUnFollowUser';
import useModal from 'hooks/useModal';
import PopupModalDownload from 'components/PopupModalDownload';
import Link from 'next/link';
import ImageWithFallback from 'components/ImageWithFallback';

export const { Provider: ProfileSchoolProvider, Consumer: ConsumerProfileSchool } = React.createContext();

const ProfileUniversityWrapper = ({
  children,
  university_id,
  isAlbumSchool,
  review_id,
  isReviewDetail,
  isStudentFollow
}) => {
  const [schoolAbout, setSchoolAbout] = React.useState([]);
  const [albumSchool, setAlbumSchool] = React.useState([]);
  const [locationNearSchool, setlocationNearSchool] = React.useState([]);
  const [rating, setRating] = React.useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [selectStatus, setSelectStatus] = React.useState();
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const user = useSelector(store => store.auth.user);
  const [isShowing, toggle, close] = useModal(false);
  const [isShowingDownload, toggleDownload, closeDonwload] = useModal(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getSchoolAbout = async ({ university_id: university_id }) => {
    try {
      const data = await SCHOOL_ENDPOINT.SCHOOL_INFO({ university_id: university_id });
      setSchoolAbout(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAlbumSchool = async ({ id_school: university_id }) => {
    const arrAlbum = [];
    try {
      const data = await ALBUM_PHOTOS_ENDPOINT.ALBUM_SCHOOL({ id_school: university_id });
      data.map(
        item =>
          (getNestedObjectSafe(item, ['photos']) || []).length > 0 &&
          getNestedObjectSafe(item, ['photos']).map(image => arrAlbum.push(image))
      );
      setAlbumSchool(arrAlbum);
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

  React.useEffect(() => {
    const pathName = router.pathname;
    const splitUrlToArr = pathName.split('/');
    const statusIndex = 2;
    setSelectStatus(splitUrlToArr[statusIndex]);
  }, []);

  const onClickStatus = text => {
    setSelectStatus(text);
    Router.replaceRoute(NAVIGATE_URL.SCHOOl_PROFILE_PAGE.URL(university_id, text));
  };

  const flowIdSuccess = () => {
    setSchoolAbout({
      ...schoolAbout,
      follow: !schoolAbout.follow
    });
  };

  const onClickFlowSchool = async id_flow => {
    const type = TYPE_FOLLOW.SCHOOL_FOLLOW;

    const follow_id = id_flow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        const data = await FLOW_ENDPOINT.FLOW_SCHOOL({ follow_id, type });
        if (data) flowIdSuccess();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onClickFollow = ({ id_follow, follow }) => {
    if (follow === true) {
      toggle();
    } else {
      onClickFlowSchool(id_follow);
    }
  };

  React.useEffect(() => {
    getSchoolAbout({ university_id: university_id });
    getLocationNearSchool({ id: university_id });
    getAlbumSchool({ id_school: university_id });
  }, [university_id]);

  React.useEffect(() => {
    setRating(getNestedObjectSafe(schoolAbout, ['school', 'rating']));
  }, [schoolAbout]);

  return (
    <>
      <PopupModalDownload isOpen={isShowingDownload} toggle={toggleDownload} close={closeDonwload} />
      <ModalUnFollowUser
        isOpen={isShowing}
        toggle={toggle}
        schoolData={getNestedObjectSafe(schoolAbout, ['school'])}
        close={close}
        type={UNFOLLOW_TYPE.SCHOOL}
        onClickFlowSchool={onClickFlowSchool}
      />
      <div className="wrapper-university">
        <div className="university-header d-flex align-items-center p-3">
          <div className="wrapper-avatar-university flex-shrink-0">
            {schoolAbout &&
              schoolAbout.school &&
              schoolAbout.school.avatar &&
              schoolAbout.school.avatar[0] &&
              schoolAbout.school.avatar[0].origin && (
                <ImageWithFallback
                  alt="school-avatar"
                  className="w-100 h-100 rounded-circle img-avatar-university"
                  src={getNestedObjectSafe(schoolAbout, ['school', 'avatar', 0, 'origin'])}
                />
              )}
          </div>
          <div className="wrapper-university-info ml-3">
            <div className="d-flex flex-column flex-md-row pb-2">
              <p className="university-name fz-20 font-weight-bold color-font m-0 mr-3">
                {getNestedObjectSafe(schoolAbout, ['school', 'name'])}
              </p>
              <div className="d-flex mr-3">
                <div className="wrapper-rank-star">
                  <StarRating val={Math.ceil(getNestedObjectSafe(schoolAbout, ['school', 'avgRating']))} />
                </div>
                <p className="total-rating">
                  {Math.ceil(getNestedObjectSafe(schoolAbout, ['school', 'avgRating']))}/5.0
                </p>
                <p className="color-content-light text-secondary mb-0 text-follow">
                  ({getNestedObjectSafe(schoolAbout, ['total_follow_school'])})
                </p>
              </div>
              <button
                className={`fz-12 font-weight-bold px-4 py-1 my-2 my-md-0 ${
                  schoolAbout.follow ? 'btn-unfollow' : 'btn-follow'
                }`}
                onClick={() =>
                  onClickFollow({
                    id_follow: getNestedObjectSafe(schoolAbout, ['school', '_id']),
                    follow: getNestedObjectSafe(schoolAbout, ['follow'])
                  })
                }
              >
                {`${schoolAbout.follow ? 'Đang theo dõi' : 'Theo dõi'}`}
              </button>
            </div>
            <p className="fz-16 font-weight-medium color-content-light university-address">
              {getNestedObjectSafe(schoolAbout, ['school', 'address'])}
            </p>
          </div>
        </div>
        <div className="nav-profile p-3 fz-14 px-lg-5">
          <div className="d-none d-lg-flex justify-content-between">
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === OVERVIEW_SCHOOL_STATUS.OVERVIEW_SCHOOL && 'link-active'}`}
              onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.OVERVIEW_SCHOOL)}
            >
              <p>Tổng quan</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === OVERVIEW_SCHOOL_STATUS.ALBUM_SCHOOL && 'link-active'}`}
              onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.ALBUM_SCHOOL)}
            >
              <p>{getNestedObjectSafe(schoolAbout, ['total_image'])}</p>
              <p>Hình ảnh</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === OVERVIEW_SCHOOL_STATUS.REVIEW_SCHOOL && 'link-active'}`}
              onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.REVIEW_SCHOOL)}
            >
              <p>{getNestedObjectSafe(schoolAbout, ['total_review_school'])}</p>
              <p>Review</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === OVERVIEW_SCHOOL_STATUS.REVIEW_LOCATION && 'link-active'}`}
              onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.REVIEW_LOCATION)}
            >
              <p>{getNestedObjectSafe(schoolAbout, ['location_near_by_school'])}</p>
              <p>Địa điểm xung quanh</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === OVERVIEW_SCHOOL_STATUS.STUDENT_FOLLOW && 'link-active'}`}
              onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.STUDENT_FOLLOW)}
            >
              <p>{getNestedObjectSafe(schoolAbout, ['total_follow_school'])}</p>
              <p>Sinh viên theo dõi</p>
            </div>
          </div>
          <div className="d-flex flex-column d-block d-lg-none">
            <IonicIcons name="ion ion-md-list text-light fz-40 cursor-pointer" onClick={toggleMenu} />
            <Collapse isOpen={isOpen}>
              <div className="d-block d-lg-none">
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 ${selectStatus ===
                    OVERVIEW_SCHOOL_STATUS.OVERVIEW_SCHOOL && 'link-active'}`}
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.OVERVIEW_SCHOOL)}
                >
                  <p>Tổng quan</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 ${selectStatus ===
                    OVERVIEW_SCHOOL_STATUS.ALBUM_SCHOOL && 'link-active'}`}
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.ALBUM_SCHOOL)}
                >
                  <p className="pr-2">{getNestedObjectSafe(schoolAbout, ['total_image'])}</p>
                  <p>Hình ảnh</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 ${selectStatus ===
                    OVERVIEW_SCHOOL_STATUS.REVIEW_SCHOOL && 'link-active'}`}
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.REVIEW_SCHOOL)}
                >
                  <p className="pr-2">{getNestedObjectSafe(schoolAbout, ['total_review_school'])}</p>
                  <p>Review</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 ${selectStatus ===
                    OVERVIEW_SCHOOL_STATUS.REVIEW_LOCATION && 'link-active'}`}
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.REVIEW_LOCATION)}
                >
                  <p className="pr-2">{getNestedObjectSafe(schoolAbout, ['location_near_by_school'])}</p>
                  <p>Địa điểm xung quanh</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 ${selectStatus ===
                    OVERVIEW_SCHOOL_STATUS.STUDENT_FOLLOW && 'link-active'}`}
                  onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.STUDENT_FOLLOW)}
                >
                  <p className="pr-2">{getNestedObjectSafe(schoolAbout, ['total_follow_school'])}</p>
                  <p>Sinh viên theo dõi</p>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        <div className="mt-4 d-flex">
          {!isAlbumSchool && !isStudentFollow && (
            <Animated
              animationIn="bounceInUp"
              animationOut="zoomOutDown"
              isVisible={true}
              className="d-none d-xl-block side-content"
            >
              <div className="d-flex flex-column h-100 sticky-top">
                <div className="wrapper-slide p-3">
                  <div className="d-flex justify-content-between boder-bottom align-items-center">
                    <p className="font-weight-bold fz-16 color-font">Giới thiệu</p>
                    {/*<p className="fz-14 color-content-light cursor-pointer">Xem tất cả</p>*/}
                  </div>
                  <div className="university-intro pt-3">
                    <p className="font-weight-medium color-content-light fz-14">
                      {getNestedObjectSafe(schoolAbout, ['school', 'intro'])}
                    </p>
                  </div>
                </div>

                <div className="wrapper-slide p-3 mt-4">
                  <div className="d-flex justify-content-between boder-bottom align-items-center">
                    <p className="font-weight-bold fz-16 color-font">Đào tạo tuyển sinh</p>
                    {/*<p className="fz-14 color-content-light cursor-pointer">Xem tất cả</p>*/}
                  </div>
                  <div className="university-intro pt-3">
                    <p className="font-weight-medium color-content-light fz-14">
                      {getNestedObjectSafe(schoolAbout, ['school', 'educationProgramer'])}
                    </p>
                  </div>
                </div>

                <div className="wrapper-slide p-3 mt-4">
                  <div className="d-flex justify-content-between boder-bottom align-items-center">
                    <p className="font-weight-bold fz-16 color-font">Câu lạc bộ</p>
                    {/*<p className="fz-14 color-content-light cursor-pointer">Xem tất cả</p>*/}
                  </div>
                  <div className="university-intro pt-3">
                    <p className="font-weight-medium color-content-light fz-14">
                      {getNestedObjectSafe(schoolAbout, ['school', 'club'])}
                    </p>
                  </div>
                </div>
              </div>
            </Animated>
          )}

          {!isAlbumSchool && !isReviewDetail && !isStudentFollow && (
            <ProfileSchoolProvider
              value={{
                university_id: university_id,
                schoolAbout: schoolAbout,
                onClickStatus: onClickStatus,
                toggleDownload: toggleDownload
              }}
            >
              <div className="wrapper-content new-feed-wrapper profile-uni-wrapper col-12 col-lg-6 pb-5 pb-lg-0">
                {children}
              </div>
            </ProfileSchoolProvider>
          )}

          {(isAlbumSchool || isStudentFollow) && (
            <ProfileSchoolProvider
              value={{
                university_id: university_id,
                schoolAbout: schoolAbout,
                albumSchool: albumSchool,
                onClickStatus: onClickStatus
              }}
            >
              <div className="w-100 h-100">{children}</div>
            </ProfileSchoolProvider>
          )}

          {!isAlbumSchool && !isStudentFollow && (
            <Animated
              animationIn="bounceInUp"
              animationOut="zoomOutDown"
              isVisible={true}
              className="d-none d-xl-block h-100 side-content"
            >
              <div className="d-flex flex-column h-100 sticky-top">
                <div className="wrapper-slide p-3">
                  <div className="d-flex justify-content-between boder-bottom align-items-center">
                    <p className="font-weight-bold fz-16 color-font">Khám phá trên bản đồ</p>
                    <Link href={NAVIGATE_URL.LOCATION_PAGE.URL(getNestedObjectSafe(university_id ,[]))}>
                      <a >
                        <p className="fz-14 color-content-light cursor-pointer">Xem tất cả</p>
                      </a>
                    </Link>
                  </div>
                  <Link href={NAVIGATE_URL.LOCATION_MAP_PAGE.URL(getNestedObjectSafe(university_id ,[]))} >
                    <a>
                      <div className="university-intro pt-3">
                        <LocationCard
                          coordinate={getNestedObjectSafe(schoolAbout, ['school', 'coordinate'])}
                          locationNearSchool={locationNearSchool}
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <button className="mt-4 btn-review py-2 font-weight-bold fz-12" onClick={() => toggleDownload()}>
                  {`VIẾT REVIEW ĐỊA ĐIỂM XUNG QUANH (${getNestedObjectSafe(schoolAbout, ['location_near_by_school'])})`}
                </button>

                <div className="wrapper-slide-review  p-3 mt-4">
                  <div className="d-flex justify-content-between boder-bottom">
                    <p className="font-weight-bold fz-16 color-font">Điểm review</p>
                    <p className="total-rating font-weight-bold fz-14">
                      {Math.ceil(getNestedObjectSafe(schoolAbout, ['school', 'avgRating']))}/5.0
                      <span className="ml-2 fz-12 color-content-light text-secondary mb-0 text-follow font-weight-medium">
                        ({getNestedObjectSafe(schoolAbout, ['total_follow_school'])})
                      </span>
                    </p>
                  </div>
                  <div className="review-intro pt-3">
                    {rating &&
                      rating.length > 0 &&
                      rating.map((item, index) => (
                        <div key={index}>
                          <p className="font-weight-bold fz-14 mb-2">
                            {i18n.t(`type_school_rating.${getNestedObjectSafe(item, ['type', 'name'])}`)}
                          </p>
                          <div className="wrapper-rank-star d-flex mb-2">
                            <StarRating val={Math.ceil(getNestedObjectSafe(item, ['avgRating']))} />
                            <div className="text-circle d-flex justify-content-center align-items-center p-3 ml-2">
                              <span className="color-white font-weight-medium fz-14">
                                {Math.ceil(getNestedObjectSafe(item, ['avgRating']))}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="wrapper-slide p-3 mt-4">
                  <div className="d-flex justify-content-between boder-bottom">
                    <p className="font-weight-bold fz-16 color-font">
                      Hình ảnh ({getNestedObjectSafe(schoolAbout, ['total_image'])})
                    </p>
                    <p
                      className="fz-14 color-content-light cursor-pointer"
                      onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.ALBUM_SCHOOL)}
                    >
                      Xem tất cả
                    </p>
                  </div>
                  <div className="pt-3">
                    <div className="h-100">
                      {!schoolAbout.school ||
                        (albumSchool && albumSchool.length === 0 && (
                          <div className="d-flex justify-content-center align-items-center flex-column pt-2">
                            <ion-icon name="image" size="large"></ion-icon>
                            <p className="font-weight-bold fz-16 pt-2">{NO_DATA_PROFILE.PHOTO}!</p>
                          </div>
                        ))}
                      <ImagesWithLightBox
                        images={albumSchool && albumSchool.length > 0 && albumSchool.slice(0, 9)}
                        typeGallery={GALLERY_TYPE.ALBUM}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          )}
        </div>
      </div>
    </>
  );
};

ProfileUniversityWrapper.propTypes = {
  children: element,
  university_id: string,
  school_id: string,
  review_id: string
};

export default ProfileUniversityWrapper;
