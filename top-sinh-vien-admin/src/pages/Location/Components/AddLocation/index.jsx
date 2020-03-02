import React, { memo, useEffect, useMemo } from 'react';
import { bool, func, string } from 'prop-types';
import { Form } from 'react-bootstrap';
import BaseModal from '../../../../components/BaseModal/index';
import LocationSearchInput from './../../../School/Components/AutoCompletePlace';
import {  useSelector, shallowEqual } from 'react-redux';
import { GET_LOCATION_PROGRESS, GET_LOCATION_SUCCESS } from '../../../../store/location/constant';

const AddLocation = ({  onHide, onAddLocation, ...props }) => {

  const isOpen = useSelector(store => store.school.isOpen, shallowEqual);
  const addLocationStatus = useSelector(store => store.location.status, shallowEqual);
  const checkProgress = useMemo(() => addLocationStatus === GET_LOCATION_PROGRESS,[addLocationStatus]);

  useEffect(() => {
    if (addLocationStatus === GET_LOCATION_SUCCESS) onHide();
  }, [addLocationStatus]);

  const onSelectPlace = ({ placeId }) => {
    onAddLocation(placeId);
  };

  const renderFormContent = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Search location</Form.Label>
          <LocationSearchInput
            disabled={checkProgress}
            isProgress={checkProgress}
            onSelectPlace={onSelectPlace}
          />
        </Form.Group>
      </Form>
    );
  };

  return (
    <BaseModal
      show={isOpen}
      onHide={onHide}
      title="Select new location"
      borderNone={true}
      {...props}
    >
      {
        renderFormContent()
      }
    </BaseModal>
  );
};

AddLocation.propTypes = {
  isOpen: bool,
  onHide: func,
  onAddLocation: func,
  getLocation: func,
  isLoading: bool,
  status: string,
};

export default (memo(AddLocation));
