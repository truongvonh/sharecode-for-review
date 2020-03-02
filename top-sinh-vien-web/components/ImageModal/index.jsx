import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ImageWithFallback from 'components/ImageWithFallback';
import { func, string } from 'prop-types';
import React from 'react';

const ImageModal = ({ toggle, close, image, title, ...props }) => (
  <Modal {...props} className="modal-campaign-type" toggle={toggle}>
    <ModalHeader className="border-0" toggle={close} />
    <ModalBody>
      <ImageWithFallback src={image} alt={title}/>
    </ModalBody>
  </Modal>
);

ImageModal.propTypes = {
  image: string,
  toggle: func,
  close: func,
  title: string
};

export default (ImageModal);
