import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { bool, func, string } from 'prop-types';
import IonicIcons from 'components/IonicIcons';

const ConfirmModal = ({
                        isOpen,
                        toggle,
                        className,
                        onOk = () => null,
                        close = () => null,
                        confirmText = 'Bạn có chắc chắn muốn xoá?',
                        okText = 'Xoá',
                        cancelText = 'Thoát',
                        ...propsModal
                      }) => {

  return (
    <div>
      <Modal isOpen={isOpen}
             toggle={toggle}
             size="sm"
             centered
             className={className}
             {...propsModal}>
        <ModalBody>
          <h3 className="text-center font-weight-bold fz-16">
            <IonicIcons name="ion-ios-alert fz-50 font-weight-bold text-danger mb-3 d-block text-center" />
            { confirmText }
          </h3>
        </ModalBody>
        <ModalFooter className="border-0 d-flex justify-content-center">
          <Button outline color="primary py-0 px-4 font-weight-bold d-flex align-items-center fz-14"
                  onClick={close}>
            <IonicIcons name="text-primary fz-30 ion-ios-undo mr-2" />
            {cancelText}
          </Button>
          <Button color="danger"
                  className="d-flex align-items-center ml-3 py-0 px-4 font-weight-bold fz-14"
                  onClick={onOk}>
            <IonicIcons name="text-white fz-30 ion-md-trash mr-2" />
            {okText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ConfirmModal.propTypes = {
  isOpen: bool,
  toggle: func,
  onOk: func,
  close: func,
  className: string,
  confirmText: string,
  okText: string,
  cancelText: string,
};

export default ConfirmModal;
