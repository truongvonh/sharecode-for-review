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
import { Tooltip } from 'reactstrap';
import { TYPE_FOLLOW } from 'constants/common';

// styles
import './style.scss';
import { getNestedObjectSafe } from 'utils/helper';

const SchoolItem = ({ schoolData, flowIdSuccess = () => null }) => {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const user = useSelector(store => store.auth.user);
  const toggleLoginModalAction = useActions(toggleLoginModal, null);

  // const onClickFlowSchool = async id_flow => {
  //   const type = TYPE_FOLLOW.SCHOOL_FOLLOW;
  //
  //   const follow_id = id_flow;
  //   if (!user) {
  //     toggleLoginModalAction();
  //   } else {
  //     try {
  //       const data = await FLOW_ENDPOINT.FLOW({ follow_id, type });
  //       if (data) flowIdSuccess(id_flow);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  return (
    <div className="d-flex bg-white school-item align-items-center py-2 overflow-hidden">
      <div className="avatar  flex-shrink-0">
        <ImageWithFallback src={getNestedObjectSafe(schoolData, ['avatar', 0, 'origin'])}
                           className="border-light border shadow-sm"
                           alt={getNestedObjectSafe(schoolData, ['name'])} />
      </div>
      <div className="info ml-2">
        <h3 className="fz-14 color-font text-wrap" id={'Tooltip-' + schoolData._id}>{schoolData.name}</h3>
        <Tooltip
          placement={'bottom'}
          isOpen={tooltipOpen}
          target={'Tooltip-' + schoolData._id}
          toggle={toggle}
        >
          {schoolData.name}
        </Tooltip>
        <Button className={`border fz-12
          ${schoolData.follow ?
          'bg-white text-primary border-primary' :
          'bg-main text-white border-white'}`}>{
          schoolData.follow ? 'Bỏ theo dõi' : 'Theo dõi'
        }</Button>
      </div>
    </div>
  );
};

SchoolItem.propTypes = {
  schoolData: object,
  flowIdSuccess: func
};

export default React.memo(SchoolItem);
