import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import './style.scss';
import ImageWithFallback from 'components/ImageWithFallback';
import Truncate from 'react-truncate';
import { getNestedObjectSafe } from 'utils/helper';

const ModalUnFollow = ({ className, toggle, isOpen, schoolData, close, ...props }) => {
  const onClickAgree = async id_follow => {
    try {
      await onClickFlowUser(id_follow);
      toggle();
    } catch (e) {
      console.log(e);
    }
  };

  const closeBtn = (
    <button className="close" onClick={close}>
      &times;
    </button>
  );

  return (
    <div>
      {/*<Modal {...props} isOpen={isOpen} toggle={toggle} className="wrapper-modal-unfollow">*/}
      {/*  <ModalHeader close={closeBtn} className="border-0"></ModalHeader>*/}
      {/*  <ModalBody>*/}
      {/*    <div className="wrapper-unfollow d-flex align-items-center justify-content-center flex-column">*/}
      {/*      <div className="wrapper-avatar mb-4 mt-5">*/}
      {/*        <ImageWithFallback*/}
      {/*          alt="user-avatar"*/}
      {/*          className="h-100 w-100 rounded-circle"*/}
      {/*          src={userData.profile && userData.profile.avatar[0] && userData.profile.avatar[0].origin}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <h2 className="font-weight-bold fz-14 mb-3">*/}
      {/*        Bỏ theo dõi {getNestedObjectSafe(userData, ['profile', 'fullName'])}*/}
      {/*      </h2>*/}
      {/*      <button*/}
      {/*        className="w-100 btn-agree font-weight-bold fz-12 py-2"*/}
      {/*        onClick={() =>*/}
      {/*          // onClickFlowUser(userData._id)*/}
      {/*          onClickAgree(userData._id)*/}
      {/*        }*/}
      {/*      >*/}
      {/*        Đồng ý*/}
      {/*      </button>*/}
      {/*      <button className="w-100 btn-disagree mt-2 font-weight-bold fz-12 py-2" onClick={close}>*/}
      {/*        Hủy*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </ModalBody>*/}
      {/*</Modal>*/}
    </div>
  );
};

export default ModalUnFollow;
