import React from 'react';
import { Button } from 'reactstrap';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import ImageWithFallback from 'components/ImageWithFallback';
import Truncate from 'react-truncate';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { TYPE_FOLLOW } from 'constants/common';
import { useRouter } from 'next/router';
import ModalUnFollowUser from 'components/ModalUnFollowUser';
// styles
// import './style.scss';
import useModal from 'hooks/useModal';
import { func, object } from 'prop-types';
import { getNestedObjectSafe } from 'utils/helper';

const CardUser = ({ userData, flowIdSuccess, onClickViewID }) => {
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const router = useRouter();
  const [isShowing, toggle, close] = useModal(false);

  const onClickFlowUser = async id_follow => {
    const type = TYPE_FOLLOW.USER_FOLLOW;

    const follow_id = id_follow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        const data = await FLOW_ENDPOINT.FLOW_USER({ follow_id, type });
        if (data) flowIdSuccess(id_follow);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onClickFollow = ({ id_follow, follow }) => {
    if (follow === true) {
      toggle();
    } else {
      onClickFlowUser(id_follow);
    }
  };

  return (
    <>
      <ModalUnFollowUser
        isOpen={isShowing}
        toggle={toggle}
        userData={userData}
        close={close}
        onClickFlowUser={onClickFlowUser}
      />
      <div className="wrapper-card-user col-md-6 col-lg-4 col-xl-3 px-2 mb-3">
        <div className="d-flex wrapper-card border-0 shadow justify-content-between h-100">
          <div className="d-flex w-100 p-3">
            <div className=" d-flex">
              <div className="wrapper-avatar rounded-circle overflow-hidden">
                <ImageWithFallback
                  alt="user-avatar"
                  className="user-avatar h-100 w-100"
                  src={userData.profile && userData.profile.avatar[0] && userData.profile.avatar[0].origin}
                />
              </div>
            </div>

            <div className="user-info d-flex flex-column ml-2 w-100">
              <a className="color-font d-flex align-items-center user-name" onClick={() => onClickViewID(userData._id)}>
                <Truncate lines={1} className="font-weight-bold fz-16">
                  {userData.profile && userData.profile.fullName}
                </Truncate>
                <div className="d-flex">
                  {userData.badge &&
                    userData.badge.length > 0 &&
                    userData.badge.map((item, index) => (
                      <ImageWithFallback
                        className="ml-2 ic_badge"
                        width="15"
                        height="15"
                        alt="icon"
                        key={index}
                        src={item.photos.length > 0 && item.photos[0].thumb}
                      />
                    ))}
                </div>
              </a>

              <Link href="">
                <a className="d-block mb-1">
                  <Truncate lines={1} className="university-name fz-14">
                    {getNestedObjectSafe(userData, ['profile', 'school', 'name'])}
                  </Truncate>
                </a>
              </Link>

              <Button
                disabled={userData.follow === 'ME'}
                onClick={() => onClickFollow({ id_follow: userData._id, follow: userData.follow })}
                className={`fz-12 font-weight-bold p-2 ${userData.follow ? 'btn-unfollow' : 'btn-follow'}`}
              >
                {`${userData.follow ? 'Đang theo dõi' : 'Theo dõi'}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CardUser.propTypes = {
  userData: object,
  flowIdSuccess: func,
  onClickViewID: func
};

export default CardUser;
