import React from 'react';
import { func, string, bool, element } from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

const ModalActions = ({ onHide, onOk, typeOk, disabledOk, isLoading }) => {
  return (
    <>
      <Button onClick={onHide} variant="secondary mr-2">Thoát</Button>
      <Button 
        disabled={disabledOk} 
        onClick={onOk} 
        variant={typeOk}
      >
        { isLoading && 
          <Spinner
            animation="border"
            size="sm"
            className="mr-1"
          /> } 
        Xong
      </Button>
    </>
  );
};

ModalActions.defaultProps = {
  typeOk: 'primary',
  disabledOk: false,
};

ModalActions.propTypes = {
  onHide: func,
  onOk: func,
  disabledOk: bool,
  isLoading: bool,
  loadingComponent: element,
  typeOk: string
};

export default ModalActions;
