import React, { memo } from 'react';
import { string, element, bool } from 'prop-types';
import Modal from 'react-bootstrap/Modal';

const BaseModal = ({ title, actions, borderNone, size, children, ...props }) => {
  return (
    <Modal size={size} animation centered { ...props }>
      <Modal.Header className={`${borderNone ? 'border-0' : ''} `} closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer className={`${borderNone ? 'border-0' : ''} `}>
        {actions}
      </Modal.Footer>
    </Modal>
  );
};

BaseModal.propTypes = {
  title: string,
  children: element,
  actions: element,
  borderNone: bool,
};

export default memo(BaseModal);
