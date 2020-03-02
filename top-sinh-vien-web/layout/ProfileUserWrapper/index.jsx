import React from 'react';
import { USER_ENDPOINT } from 'constants/endpoints';
import { useSelector } from 'react-redux';
import 'layout/NewsFeedWrapper/style.scss';
import { element, string } from 'prop-types';
import { Button, Collapse } from 'reactstrap';
import { ALL_UPLOAD_TYPE, FALLBACK_IMAGE_TYPE, PROFILE_USER_TYPE, TEXT_IMAGE_TYPE } from 'constants/common';
import useModal from 'hooks/useModal';
import { useRouter } from 'next/router';
import { Router } from 'routes/routesConfig';
import { getNestedObjectSafe } from 'utils/helper';
import ModalUploadImage from 'components/modalUploadImage';
import ImageWithFallback from 'components/ImageWithFallback';
import PopupModalDownload from 'components/PopupModalDownload';

import './style.scss';
import { NAVIGATE_URL } from 'constants/url';
import IonicIcons from 'components/IonicIcons';
import { toast } from 'react-toastify';
import i18n from 'locales/i18n';

export const { Provider: ProfileUserProvider, Consumer: ConsumerProfiler } = React.createContext();

const ProfileUserWrapper = ({ children, user_id }) => {
  const [isShowing, toggle, closeCover] = useModal(false);
  const [isShowingAvatar, toggleAvatar, closeAvatar] = useModal(false);
  const [isShowingDownload, toggleDownload, closeDonwload] = useModal(false);
  const [clearImage, setClearImage] = React.useState(false);
  const user = useSelector(store => store.auth.user);
  const router = useRouter();
  const [userAbout, setUserAbout] = React.useState([]);
  const [selectStatus, setSelectStatus] = React.useState();
  const [profileInfo, setProfileInfo] = React.useState({});
  const [idUser, setId] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const getUserAbout = async ({ user_id }) => {
    try {
      const data = await USER_ENDPOINT.LIST_ABOUT_USER({ user_id });
      setUserAbout(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getInfoProfile = async ({ user_id }) => {
    try {
      const data = await USER_ENDPOINT.PROFILE_INFO({ user_id });
      setProfileInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickStatus = text => {
    setSelectStatus(text);
    Router.replaceRoute(NAVIGATE_URL.USER_PROFILE_PAGE.URL(idUser, text));
  };

  const onClickViewID = id_user => {
    setId(id_user);
    setSelectStatus(PROFILE_USER_TYPE.TIME_LINE);
    Router.replaceRoute(NAVIGATE_URL.USER_PROFILE_PAGE.URL(id_user));
  };

  const coverBackground = {
    background: `url("${
      getNestedObjectSafe(profileInfo, ['profile', 'cover', 0, 'origin'])
        ? getNestedObjectSafe(profileInfo, ['profile', 'cover', 0, 'origin'])
        : '/static/img/bg_cover.png'
    }") no-repeat center center`
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    getUserAbout({ user_id });
    getInfoProfile({ user_id });
    setId(user_id);
    const pathName = router.pathname;
    const splitUrlToArr = pathName.split('/');
    const statusIndex = 2;
    setSelectStatus(splitUrlToArr[statusIndex]);
  }, [user_id]);

  const onUploadFile = async (fileUpload, type) => {
    let payload = {
      last_name: user.profile.lastName,
      gender: user.profile.gender,
      date_of_birth: user.profile.dateOfBirt || undefined,
      school: user.profile.school._id,
      address: user.profile.address || undefined,
      describe: user.profile.describe || undefined
    };
    if (type === 'COVER') payload = { ...payload, cover: fileUpload };
    else payload = { ...payload, avatar: fileUpload };

    try {
      const data = await USER_ENDPOINT.UPDATE_USER_INFO(payload);
      if (data) {
        toast.success(`Update ${type} thành công`);
        setTimeout(async () => {
          if (type === 'COVER') {
            const newProfileInfo = { ...profileInfo };
            newProfileInfo.profile.cover = fileUpload;
            setProfileInfo(newProfileInfo);
          } else {
            const newProfileInfo = { ...profileInfo };
            newProfileInfo.profile.avatar = fileUpload;
            setProfileInfo(newProfileInfo);
          }
          closeCover();
          closeAvatar();
          setClearImage(true);
        }, 1000);
      }
    } catch (errorMessage) {
      toast.error(i18n.t(`error.${errorMessage}`));
    }
  };

  return (
    <>
      <div className="wrapper-profile-user">
        <ModalUploadImage
          isOpen={isShowingAvatar}
          toggle={toggleAvatar}
          onUploadFile={fileUpload => onUploadFile(fileUpload, 'AVATAR')}
          isMuti={false}
          typeImage={FALLBACK_IMAGE_TYPE.AVATAR}
          textImage={TEXT_IMAGE_TYPE.AVATAR}
          type={ALL_UPLOAD_TYPE.AVATAR}
          clearImage={clearImage}
        />
        <ModalUploadImage
          isOpen={isShowing}
          toggle={toggle}
          onUploadFile={fileUpload => onUploadFile(fileUpload, 'COVER')}
          isMuti={false}
          typeImage={FALLBACK_IMAGE_TYPE.COVER}
          textImage={TEXT_IMAGE_TYPE.COVER}
          type={ALL_UPLOAD_TYPE.AVATAR}
          clearImage={clearImage}
        />
        <PopupModalDownload isOpen={isShowingDownload} toggle={toggleDownload} close={closeDonwload} />
        <div className="wrapper-cover ">
          <div className="wrapper-img-cover position-relative" style={coverBackground}>
            {user && user._id === user_id && (
              <div className="pl-2 pt-2 cursor-pointer" onClick={toggle}>
                <img src="/static/icons/btn_update_cover.svg" />
              </div>
            )}

            <div className="d-flex position-absolute wrapper-info align-items-center">
              <div className="wrapper-img-avatar rounded-circle overflow-hidden">
                {profileInfo &&
                  profileInfo.profile &&
                  profileInfo.profile.avatar &&
                  profileInfo.profile.avatar[0] &&
                  profileInfo.profile.avatar[0].origin && (
                    <ImageWithFallback
                      alt="user-avatar"
                      className="user-avatar h-100 w-100"
                      src={getNestedObjectSafe(profileInfo, ['profile', 'avatar', 0, 'origin'])}
                    />
                  )}
              </div>
              {user && user._id === idUser && (
                <img
                  src="/static/icons/ic_thay avt.svg"
                  alt="ic-change-avatar"
                  className="ic-change-avatar position-absolute"
                  onClick={toggleAvatar}
                />
              )}

              <div className="d-flex flex-column pl-3">
                <span className="font-weight-bold fz-16 user-name pb-2">
                  {profileInfo.profile && profileInfo.profile.fullName}
                  {profileInfo.badge &&
                    profileInfo.badge.length > 0 &&
                    profileInfo.badge.map((item, index) => (
                      <ImageWithFallback
                        className="ml-2 ic_badge"
                        width="15"
                        height="15"
                        alt="icon"
                        key={index}
                        src={item.photos.length > 0 && item.photos[0].thumb}
                      />
                    ))}
                </span>
                <Button className="btn-message font-weight-bold fz-12" onClick={() => toggleDownload()}>
                  Nhắn tin
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-profile p-3 fz-14 px-lg-5">
          <div className="d-none d-lg-flex justify-content-between">
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === PROFILE_USER_TYPE.TIME_LINE && 'link-active'}`}
              onClick={() => onClickStatus(PROFILE_USER_TYPE.TIME_LINE)}
            >
              <p>Dòng thời gian</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                           ${selectStatus === PROFILE_USER_TYPE.FOLLOW_YOU && 'link-active'}`}
              onClick={() => onClickStatus(PROFILE_USER_TYPE.FOLLOW_YOU)}
            >
              <p>{userAbout.totalUserFollowing}</p>
              <p>Được theo dõi</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                      ${selectStatus === PROFILE_USER_TYPE.YOU_FOLLOW && 'link-active'}`}
              onClick={() => onClickStatus(PROFILE_USER_TYPE.YOU_FOLLOW)}
            >
              <p>{userAbout.totalUserFollow}</p>
              <p>Đang theo dõi</p>
            </div>
            <div
              className={`pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold
                        ${selectStatus === PROFILE_USER_TYPE.FOLLOW_SCHOOL && 'link-active'}`}
              onClick={() => onClickStatus(PROFILE_USER_TYPE.FOLLOW_SCHOOL)}
            >
              <p>{userAbout.followSchool}</p>
              <p>Trường đang theo dõi</p>
            </div>
            <div
              className={'pr-2 pr-md-4 d-flex justify-content-center flex-column align-items-center font-weight-bold'}
            >
              <p>{userAbout.accumulatedPoints}</p>
              <p onClick={() => toggleDownload()}>Điểm tích lũy</p>
            </div>
          </div>
          <div className="d-flex flex-column d-block d-lg-none">
            <IonicIcons name="ion ion-md-list text-light fz-40 cursor-pointer" onClick={toggleMenu} />
            <Collapse isOpen={isOpen}>
              <div className="d-block d-lg-none">
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 
                    ${selectStatus === PROFILE_USER_TYPE.TIME_LINE && 'link-active'}`}
                  onClick={() => onClickStatus(PROFILE_USER_TYPE.TIME_LINE)}
                >
                  <p>Dòng thời gian</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 
                     ${selectStatus === PROFILE_USER_TYPE.FOLLOW_YOU && 'link-active'}`}
                  onClick={() => onClickStatus(PROFILE_USER_TYPE.FOLLOW_YOU)}
                >
                  <p className="pr-2">{userAbout.totalUserFollowing}</p>
                  <p>Được theo dõi</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2 
                   ${selectStatus === PROFILE_USER_TYPE.YOU_FOLLOW && 'link-active'}`}
                  onClick={() => onClickStatus(PROFILE_USER_TYPE.YOU_FOLLOW)}
                >
                  <p className="pr-2">{userAbout.totalUserFollow}</p>
                  <p>Đang theo dõi</p>
                </div>
                <div
                  className={`d-flex align-items-center font-weight-bold py-2
                    ${selectStatus === PROFILE_USER_TYPE.FOLLOW_SCHOOL && 'link-active'}`}
                  onClick={() => onClickStatus(PROFILE_USER_TYPE.FOLLOW_SCHOOL)}
                >
                  <p className="pr-2">{userAbout.followSchool}</p>
                  <p>Trường đang theo dõi</p>
                </div>
                <div className={'d-flex align-items-center font-weight-bold py-2'}>
                  <p className="pr-2">{userAbout.accumulatedPoints}</p>
                  <p onClick={() => toggleDownload()}>Điểm tích lũy</p>
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <ProfileUserProvider
          value={{
            user_id: idUser,
            profileInfo: profileInfo,
            onClickViewID: onClickViewID,
            onClickStatus: onClickStatus
          }}
        >
          {children}
        </ProfileUserProvider>
      </div>
    </>
  );
};

ProfileUserWrapper.propTypes = {
  children: element,
  user_id: string
};

export default ProfileUserWrapper;
