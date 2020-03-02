import React, { useState } from 'react';
import ImageWithFallback from 'components/ImageWithFallback';
import { useSelector } from 'react-redux';
import { Button, Tooltip } from 'reactstrap';
import { toggleLoginModal } from 'redux/common/actions';
import { useActions } from 'hooks/useActions';
import { FLOW_ENDPOINT } from 'constants/endpoints';
import Link from 'next/link';
import { func, object, string } from 'prop-types';
import { TYPE_FOLLOW } from 'constants/common';

import './member.scss';
import './../../../rank/rank.scss';
import { getNestedObjectSafe } from 'utils/helper';
import { NAVIGATE_URL } from 'constants/url';

const AllMember = ({ item, index, id ,flowIdSuccess }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tool = () => setTooltipOpen(!tooltipOpen);
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);
  const onClickFlowUser = async id_flow => {
    const type = TYPE_FOLLOW.USER_FOLLOW;
    const follow_id = id_flow;
    if (!user) {
      toggleLoginModalAction();
    } else {
      try {
        const data = await FLOW_ENDPOINT.FLOW_USER({ follow_id, type });
        if (data) flowIdSuccess(id_flow);
      } catch (e) {
        // console.log(e);
      }
    }
  };
  return (
    <div className="col-lg-6 col-xl-3 px-2 mb-3 main-card-item">
      <div className="wrapper-card-rank justify-content-between shadow p-3">
        <div className="d-flex">
          <div className="align-items-center d-flex">
            <div className="img-avatar rounded-circle overflow-hidden">
              <Link href={NAVIGATE_URL.USER_PROFILE_PAGE(id)}>
                <a>
                  <ImageWithFallback
                    src={ getNestedObjectSafe(item ,['profile','avatar',0,'thumb'])}
                    alt="img-avatar"
                    className="rounded-circle img-avatar"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="user-info d-flex flex-column some-flex pl-3 w-100 ">
            <div className='d-flex '>
              <div className="name-user  text-truncate">
                <Link href={NAVIGATE_URL.USER_PROFILE_PAGE(id)}>
                  <a>
                    <span className="font-weight-bold fz-14 d-flex">
                      { getNestedObjectSafe(item, ['profile', 'fullName']) }
                    </span>
                  </a>
                </Link>
              </div>
              <div className=" icon-badge pl-2 ">
                {item.badge && item.badge.length > 0 && item.badge.map((item, index) => (
                  <ImageWithFallback
                    className="ml-2 ic_badge"
                    width="15"
                    height="15"
                    alt="icon"
                    key={index}
                    src={ getNestedObjectSafe(item, ['photos', 0, 'thumb']) }
                  />
                ))}
              </div>
            </div>
            <div>
              <Link href={NAVIGATE_URL.USER_PROFILE_PAGE(id)}>
                <a>
                  <span className="fz-16 user-university-name  text-truncate " id={'tooltip-school' + index}>
                    {getNestedObjectSafe(item,['profile','school','name'])}
                  </span>
                  <Tooltip placement="top" isOpen={tooltipOpen} target={'tooltip-school' + index} toggle={tool}>
                    {getNestedObjectSafe(item, ['profile','school','name'])}
                  </Tooltip>
                </a>
              </Link>
            </div>
            <Button
              disabled={item.follow === 'ME'}
              onClick={() => onClickFlowUser( item._id)}
              className={`fz-12 font-weight-bold p-2 ${item.follow ? 'btn-unflow' : 'btn-flow'}`}
            >{`${item.follow ? 'Đang theo dõi' : 'Theo dõi'}`}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
AllMember.propTypes = {
  index :string,
  item :object,
  id :string,
  flowIdSuccess : func,
};

export default AllMember;
