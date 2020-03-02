import BaseModal from './../../../../components/BaseModal';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { func, string, element } from 'prop-types';

const ConfirmModal = ({ content, onHide, onSelect, ...props }) => {
  const renderActions =  (
    <>
      <Button onClick={onHide} variant="secondary mr-2">Cancel</Button>
      <Button onClick={onSelect} variant="primary">Ok</Button>
    </>
  );

  return (
    <BaseModal 
      { ...props }
      title="Confirm"
      size="sm"
      centered
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
};

export default memo(ConfirmModal);