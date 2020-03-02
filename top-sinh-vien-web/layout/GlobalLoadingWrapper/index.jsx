import React from 'react';
import { Modal, Spinner } from 'reactstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { bool } from 'prop-types';
import './style.scss';

const GlobalLoadingWrapper = ({ outSideLoading }) => {

  const isLoading = useSelector(store => store.common.globalLoading, shallowEqual);

  return (
    <Modal isOpen={isLoading || outSideLoading}
           centered
           className="global-loading-wrapper"
           style={{ width: '90px' }}>
      <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" size="xl" />
      <p className="text-primary mb-0 pt-2 text-center">Đang tải</p>
    </Modal>
  );
};

GlobalLoadingWrapper.propTypes = {
  outSideLoading: bool
};

export default GlobalLoadingWrapper;
