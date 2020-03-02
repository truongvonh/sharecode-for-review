import React, { memo, useState, useEffect, useMemo } from 'react';
import { func, array, object } from 'prop-types';
import { Form } from 'react-bootstrap';
import BaseModal from '../../../../components/BaseModal/index';
import { useSelector, shallowEqual, connect } from 'react-redux';
import ModalActions from '../../../../components/ModalActions/index';
import { ADD_NEAR_SCHOOL_SUCCESS, ADD_NEAR_SCHOOL_PROGRESS } from '../../../../store/location/constant';
import SelectSearchBox from '../../../../components/SelectSearchBox';
import { addNearSchool } from '../../../../store/location/actions';
import { bindActionCreators } from 'redux';

const AddNearSchool = ({ addNearSchool, onHide, locationItem, allSchool, ...props }) => {

  const status = useSelector(store => store.location.status, shallowEqual);
  const isProgress = useMemo(() => status === ADD_NEAR_SCHOOL_PROGRESS, [status]);
  const isSuccess = useMemo(() => status === ADD_NEAR_SCHOOL_SUCCESS, [status]);

  const [school, setSchool] = useState(null);

  const onChangeSchool = (school) => {
    setSchool(school);
  };

  useEffect(() => {
    if (isSuccess) {
      setSchool(null);
      onHide();
    };
  }, [isSuccess]);

  const onAddNearSchool = () => {
    const id_school = school.value;
    const id_location = locationItem._id;
    addNearSchool({ id_school, id_location, flag: true });
  };

  const renderFormContent = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Search location</Form.Label>
          <SelectSearchBox
            value={school}
            options={allSchool}
            keyLabel="name"
            onChange={onChangeSchool}
          />
        </Form.Group>
      </Form>
    );
  };

  return (
    <BaseModal
      {...props}
      onHide={onHide}
      title="Add location near school"
      borderNone={true}
      actions={
        <ModalActions
          onHide={onHide}
          isLoading={isProgress}
          onOk={onAddNearSchool}
        />
      }
    >
      {renderFormContent()}
    </BaseModal>
  );
};

AddNearSchool.propTypes = {
  allSchool: array,
  locationItem: object,
  onHide: func,
  addNearSchool: func
};

const mapDispatchToProps = dispatch => (
  bindActionCreators(
    {
      addNearSchool
    },
    dispatch
  )
);

export default connect(null, mapDispatchToProps)(memo(AddNearSchool));
