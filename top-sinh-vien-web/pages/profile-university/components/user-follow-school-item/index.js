import React from 'react';
import { array, object } from 'prop-types';
import { Link, Router } from 'routes/routesConfig';
import { getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import './style.scss';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { OVERVIEW_SCHOOL_STATUS, OVERVIEW_SCHOOL_TYPE, REVIEW_SCHOOL_TEXT, TYPE_FOLLOW } from 'constants/common';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import useModal from 'hooks/useModal';
import { useSelector } from 'react-redux';
import CardUser from '../../components/card-user';
import { NAVIGATE_URL } from 'constants/url';

const UserFollowSchol = ({
  schoolAbout,
  UserFollowSchool,
  type = OVERVIEW_SCHOOL_TYPE.REVIEW_LOCATION,
  flowIdSuccess,
  onClickStatus,
  university_id
}) => {
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const [isShowing, toggle, close] = useModal(false);
  const user = useSelector(store => store.auth.user);

  // const flowIdSuccess = id_flow => {
  //   const newUserFollowSchool = [...UserFollowSchool];
  //   newUserFollowSchool.filter(item => {
  //     if (item._id == id_flow) {
  //       item.follow = !item.follow;
  //     }
  //     return item;
  //   });
  //   setListFollowYou(newUserFollowSchool);
  // };

  return (
    <>
      {UserFollowSchool && (
        <div className="school-overview-wrapper bg-white rounded-lg p-3 mb-4 fz-16">
          <header className="border-bottom pb-3 mb-4">
            <p className="m-0 p-0 font-weight-bold fz-16">
              {REVIEW_SCHOOL_TEXT.USER_FOLLOW_SCHOOL} ({getNestedObjectSafe(schoolAbout, ['total_follow_school'])})
            </p>
          </header>
          <body>
            {UserFollowSchool &&
              UserFollowSchool.map((item, index) => (
                <div key={index}>
                  <CardUser userData={item} schoolAbout={schoolAbout} flowIdSuccess={flowIdSuccess} />
                </div>
              ))}

            <div className="d-flex justify-content-center">
              <button
                className="btn-view-all px-5 py-2 font-weight-bold"
                onClick={() => onClickStatus(OVERVIEW_SCHOOL_STATUS.STUDENT_FOLLOW)}
              >
                Xem tất cả
              </button>
            </div>
          </body>
        </div>
      )}
    </>
  );
};

UserFollowSchol.propTypes = {
  schoolAbout: object,
  UserFollowSchool: array,
  user: object
};

export default React.memo(UserFollowSchol);
