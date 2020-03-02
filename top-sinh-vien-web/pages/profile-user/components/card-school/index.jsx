import React from 'react';
import { Button } from 'reactstrap';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import ImageWithFallback from 'components/ImageWithFallback';
import Truncate from 'react-truncate';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { TYPE_FOLLOW, UNFOLLOW_TYPE } from 'constants/common';
import ModalUnFollowUser from 'components/ModalUnFollowUser';
import { Tooltip } from 'reactstrap';

// styles
import './style.scss';

import useModal from 'hooks/useModal';
import { NAVIGATE_URL } from 'constants/url';

const CardSchool = ({ schoolData, flowIdSuccess }) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const [isShowing, toggle, close] = useModal(false);

  const onClickFlowSchool = async id_flow => {
    const type = TYPE_FOLLOW.SCHOOL_FOLLOW;

    const follow_id = id_flow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        const data = await FLOW_ENDPOINT.FLOW_SCHOOL({ follow_id, type });
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
      onClickFlowSchool(id_follow);
    }
  };

  return (
    <>
      <ModalUnFollowUser
        isOpen={isShowing}
        toggle={toggle}
        schoolData={schoolData}
        close={close}
        type={UNFOLLOW_TYPE.SCHOOL}
        onClickFlowSchool={onClickFlowSchool}
      />

      <div className="col-md-6 col-lg-4 col-xl-3 px-2 mb-3 wrapper-card-user">
        <div className="d-flex wrapper-card border-0 shadow justify-content-between h-100">
          <div className="d-flex w-100 p-3">
            <div className=" d-flex">
              <div className="wrapper-avatar rounded-circle overflow-hidden">
                <ImageWithFallback
                  className="w-100 h-100 img-school"
                  alt="img-school"
                  src={schoolData.avatar[0] && schoolData.avatar[0].origin}
                />
              </div>
            </div>

            <div className="user-info d-flex flex-column ml-2 w-100">
              <Link href={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(schoolData._id)}>
                <a className="color-font d-flex align-items-center" id={'Tooltip-' + schoolData._id}>
                  <Truncate lines={1} className="font-weight-bold fz-16">
                    {schoolData.name}
                  </Truncate>
                </a>
              </Link>
              <Tooltip
                placement={'top'}
                isOpen={tooltipOpen}
                target={'Tooltip-' + schoolData._id}
                toggle={toggleTooltip}
              >
                {schoolData.name}
              </Tooltip>

              <Button
                onClick={() => onClickFollow({ id_follow: schoolData._id, follow: schoolData.follow })}
                className={`fz-12 font-weight-bold mt-2 ${schoolData.follow ? 'btn-unfollow' : 'btn-follow'}`}
              >
                {`${schoolData.follow ? 'Đang theo dõi' : 'Theo dõi'}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CardSchool);
