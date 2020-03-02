import React, { memo, useEffect, useState } from 'react';
import { func, object } from 'prop-types';
import { Form } from 'react-bootstrap';
import BaseModal from '../../../../components/BaseModal/index';
import {  useSelector, shallowEqual } from 'react-redux';
import {  POST_LOCATION_TYPE_SUCCESS } from '../../../../store/location/constant';
import ModalActions from '../../../../components/ModalActions';

const AddLocation = ({  onHide, onAddLocationType, locationType, editLocationType, ...props }) => {

  const isOpen = useSelector(store => store.school.isOpen, shallowEqual);
  const addLocationStatus = useSelector(store => store.location.status, shallowEqual);
  const isLoading = useSelector(store => store.location.isLoading, shallowEqual);
  const [name, setName] = useState('');
  const isEdit = Object.values(locationType).length;

  useEffect(() => {
    if (addLocationStatus === POST_LOCATION_TYPE_SUCCESS) {
      setName('');
      onHide();
    }
  }, [addLocationStatus]);

  useEffect(() => {
    setName(locationType.name);
  }, [isEdit]);

  const renderFormContent = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Location type</Form.Label>
          <Form.Control   type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}  />
        </Form.Group>
      </Form>
    );
  };

  const onOk = () => {
    if (!isEdit) onAddLocationType({ name });
    else  editLocationType({ name, id: locationType._id });
  };

  return (
    <BaseModal  show={isOpen}
                onHide={onHide}
                title={`${isEdit ? 'Edit location type' : 'Add new location type'}`}
                actions={( <ModalActions  onHide={onHide}
                                          onOk={onOk}
                                          disabledOk={!name || isLoading}
                                          isLoading={isLoading} /> )}
                borderNone={true}
                {...props} > {renderFormContent()} </BaseModal>
  );
};

AddLocation.propTypes = {
  onHide: func,
  onAddLocationType: func,
  editLocationType: func,
  locationType: object
};

export default (memo(AddLocation));
