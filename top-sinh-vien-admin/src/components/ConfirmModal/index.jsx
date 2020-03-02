import BaseModal from './../BaseModal';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { func, string, element, bool, } from 'prop-types';

const ConfirmModal = ({ content, onHide, borderNone = true, onSelect, ...props }) => {
  const renderActions =  (
    <>
      <Button onClick={onHide} variant="secondary mr-2">Không</Button>
      <Button onClick={onSelect} variant="primary">Đồng ý</Button>
    </>
  );

  return (
    <BaseModal 
      { ...props }
      title="Xác nhận"
      size="sm"
      centered
      borderNone={borderNone}
      onHide={onHide}
      actions={renderActions}
    >
      {content}
    </BaseModal> 
  );
};

ConfirmModal.propTypes = {
  content: string || element,
  onHide: func,
  onSelect: func,
  borderNone: bool
};

export default memo(ConfirmModal);