import React from 'react';
import { Button } from 'reactstrap';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import ImageWithFallback from 'components/ImageWithFallback';
import Truncate from 'react-truncate';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { func, object } from 'prop-types';
import { PROFILE_USER_TYPE, TYPE_FOLLOW } from 'constants/common';
import { NAVIGATE_URL } from 'constants/url';
import { getNestedObjectSafe } from 'utils/helper';
import ModalUnFollowUser from 'components/ModalUnFollowUser';
import useModal from 'hooks/useModal';

const UserRankItem = ({ item, flowIdSuccess }) => {
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const [isShowing, toggle, close] = useModal(false);

  const onClickFlowUser = async id_flow => {
    console.log('id_flow: ', id_flow);
    const type = TYPE_FOLLOW.USER_FOLLOW;
    const follow_id = id_flow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        const data = await FLOW_ENDPOINT.FLOW_USER({ follow_id, type });
        if (data) flowIdSuccess(id_flow);
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
        userData={item && item.user_ranking}
        close={close}
        onClickFlowUser={onClickFlowUser}
      />
      <div className="col-lg-6 col-xl-4 px-2 mb-3 main-card-item">
        <div className="d-flex wraper-card-rank border-0 shadow justify-content-between h-100">
          <div className="d-flex w-100 p-3">
            <div className="align-items-center d-flex">
              <div className="rank d-flex justify-content-center align-items-center rounded-circle mr-2 p-2 flex-shrink-0">
                <span className="font-weight-bold fz-18">{item.ranking}</span>
              </div>

              <div className="img-avatar rounded-circle overflow-hidden">
                <Link
                  href={NAVIGATE_URL.USER_PROFILE_PAGE.URL(
                    getNestedObjectSafe(item, ['user_ranking', '_id']),
                    PROFILE_USER_TYPE.TIME_LINE
                  )}
                >
                  <a>
                    <ImageWithFallback
                      src={
                        item.user_ranking && item.user_ranking.profile && item.user_ranking.profile.avatar.length
                          ? item.user_ranking.profile.avatar[0].thumb
                          : true
                      }
                      alt="img-avatar"
                      className="rounded-circle img-avatar"
                    />
                  </a>
                </Link>
              </div>
            </div>

            <div className="user-info d-flex flex-column ml-2 w-100">
              <Link
                href={NAVIGATE_URL.USER_PROFILE_PAGE.URL(
                  getNestedObjectSafe(item, ['user_ranking', '_id']),
                  PROFILE_USER_TYPE.TIME_LINE
                )}
              >
                <a className="color-font d-flex align-items-center">
                  <Truncate lines={1} className="font-weight-bold fz-14">
                    {item.user_ranking && item.user_ranking.profile && item.user_ranking.profile.fullName}
                  </Truncate>
                  <ImageWithFallback
                    className="icon-badge ml-2"
                    alt="icon"
                    src={process.env.API_URL + item.user_ranking.id_badge}
                  />
                </a>
              </Link>
              <span className="item-point fz-14 font-weight-bold">{`${item.user_ranking &&
                item.user_ranking.point} điểm`}</span>

              <Link
                href={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(
                  getNestedObjectSafe(item, ['user_ranking', 'profile', 'school', '_id'])
                )}
              >
                <a className="d-block mb-1">
                  <Truncate lines={1} className="university-name fz-12">
                    {item.user_ranking &&
                      item.user_ranking.profile &&
                      item.user_ranking.profile.school &&
                      item.user_ranking.profile.school.name}
                  </Truncate>
                </a>
              </Link>
              <Button
                disabled={item.follow === 'ME'}
                onClick={() => onClickFollow({ id_follow: item.user_ranking._id, follow: item.follow })}
                className={`fz-12 font-weight-bold p-2 ${item.follow ? 'btn-unflow' : 'btn-flow'}`}
              >{`${item.follow ? 'Đang theo dõi' : 'Theo dõi'}`}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UserRankItem.propTypes = {
  item: object,
  flowIdSuccess: func
};

export default React.memo(UserRankItem);
