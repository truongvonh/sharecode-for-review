import React from 'react';
import { Button } from 'reactstrap';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import ImageWithFallback from 'components/ImageWithFallback';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { TYPE_FOLLOW } from 'constants/common';
import { useRouter } from 'next/router';
import ModalUnFollowUser from 'components/ModalUnFollowUser';
import { Link } from 'routes/routesConfig';
// styles
import './style.scss';
import useModal from 'hooks/useModal';
import { getNestedObjectSafe } from 'utils/helper';
import { NAVIGATE_URL } from 'constants/url';

const CardUser = ({ userData, flowIdSuccess, schoolAbout }) => {
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const router = useRouter();
  const [isShowing, toggle, close] = useModal(false);

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

  const onClickFlowUser = async id_follow => {
    const type = TYPE_FOLLOW.USER_FOLLOW;

    const follow_id = id_follow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        // console.log('id_follow: ', id_follow);
        const data = await FLOW_ENDPOINT.FLOW_USER({ follow_id, type });
        // console.log('data follow', data);
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
        userData={getNestedObjectSafe(userData, ['user'])}
        close={close}
        onClickFlowUser={onClickFlowUser}
      />
      <div className="user-infor d-flex mb-3 border-bottom pb-4 justify-content-between">
        <div className="relate-info fz-16 d-flex">
          {renderUserAvatar(getNestedObjectSafe(userData, ['user']))}
          <div className="mb-1 d-flex flex-column pl-3">
            <div className="d-flex align-items-center">
              <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(userData, ['user', '_id']))}>
                <a className="mb-0 color-font font-weight-bold">
                  {getNestedObjectSafe(userData, ['user', 'profile', 'fullName']) || ''}
                </a>
              </Link>

              <div className="all-badge d-flex align-items-center">
                {(getNestedObjectSafe(userData, ['user', 'badge']) || []).length > 0 &&
                  getNestedObjectSafe(userData, ['user', 'badge']).map(badge => (
                    <ImageWithFallback
                      className="ml-2"
                      key={badge._id}
                      src={getNestedObjectSafe(badge, ['photos', 0, 'thumb'])}
                    />
                  ))}
              </div>
            </div>
            <p className="mb-0 fz-14 text-secondary pr-2">{getNestedObjectSafe(schoolAbout, ['school', 'name'])}</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Button
            disabled={getNestedObjectSafe(userData, ['user', 'follow']) === 'ME'}
            onClick={() =>
              onClickFollow({
                id_follow: getNestedObjectSafe(userData, ['user', '_id']),
                follow: getNestedObjectSafe(userData, ['follow'])
              })
            }
            className={`fz-12 font-weight-bold mt-2 px-4 ${
              getNestedObjectSafe(userData, ['follow']) ? 'btn-unfollow' : 'btn-follow'
            }`}
          >
            {`${getNestedObjectSafe(userData, ['follow']) ? 'Đang theo dõi' : 'Theo dõi'}`}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardUser;
