import React, { useState } from 'react';
import ImageWithFallback from 'components/ImageWithFallback';
import { Tooltip } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { string, func } from 'prop-types';
import { Button } from 'reactstrap';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import Link from 'next/link';

import './university.scss';
import { NAVIGATE_URL } from 'constants/url';

const AllUniversity = ({ avatar, name, follow, flowSchoolSuccess, id, index }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleName = () => setTooltipOpen(!tooltipOpen);
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const onClickFlowSchool = async id_flow => {
    const type = 'SCHOOL_FOLLOW';
    const follow_id = id_flow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        const data = await FLOW_ENDPOINT.FLOW_SCHOOL({ follow_id, type });
        if (data) flowSchoolSuccess(id_flow);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="col-lg-6 col-xl-3 px-2 mb-3 mx-auto mx-md-0" >
      <div className="wrapper-item-university  shadow" >
        <div className="p-3 d-flex">
          <div className="wrapper-item-image flex-shrink-0">
            <Link href={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(id)}>
              <a>
                <ImageWithFallback
                  src={avatar.length && avatar[0].thumb}
                  alt="img-avatar"
                  className="image-university rounded-circle "
                />
              </a>
            </Link>
          </div>
          <div className="wrapper-name-university col-8">
            <Link href={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(id)}>
              <a>
                <h4 className="name-university fz-18 font-weight-bold text-truncate" id={'Tooltip-user-' + index}>{name}</h4>
                <Tooltip placement="top" isOpen={tooltipOpen} target={'Tooltip-user-' + index} toggle={toggleName}>
                  {name}
                </Tooltip>
              </a>
            </Link>
            <Button
              disabled={follow === 'ME'}
              onClick={() => onClickFlowSchool(id)}
              className={`fz-12 font-weight-bold p-2 ${follow ? 'button-item' : 'button-item-follow'}`}>
              {`${follow ? 'Đang theo dõi' : 'Theo dõi'}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

AllUniversity.propTypes = {
  avatar: string,
  name: string,
  follow: string,
  id: string,
  flowSchoolSuccess: func
};

AllUniversity.defaultProps = {
  avatar: '',
  name: '',
  follow: '',
  id: ''
};

export default AllUniversity;
