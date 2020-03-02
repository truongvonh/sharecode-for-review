import React, { memo, useEffect, useState } from 'react';
import { func } from 'prop-types';
import { Form } from 'react-bootstrap';
import BaseModal from 'components/BaseModal/index';
import ModalActions from 'components/ModalActions';

const AddType = ({ isShow, isEdit, closeAdd, onSubmit, dataType, ...props }) => {
  const [name, setName] = useState('');
  const [isDisabled, setIsDisable] = useState(true);

  useEffect(() => {
    setName(dataType && dataType.name);
  }, [dataType]);

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  const handleChange = e => {
    setName(e.target.value);
    setIsDisable(false);
  };

  const renderFormContent = () => {
    return (
      <Form onSubmit={onSubmitForm}>
        <Form.Group>
          <Form.Label>Tên loại</Form.Label>
          <Form.Control type="text" value={name} onChange={handleChange} />
        </Form.Group>
      </Form>
    );
  };

  return (
    <BaseModal
      borderNone
      show={isShow}
      onHide={closeAdd}
      title={!isEdit ? 'Thêm loại quảng cáo' : 'Sửa loại quảng cáo'}
      {...props}
      actions={<ModalActions onOk={onSubmitForm} onHide={closeAdd} disabledOk={!name || isDisabled} />}
    >
      {renderFormContent()}
    </BaseModal>
  );
};

AddType.propTypes = {
  onSubmit: func
};

export default memo(AddType);
