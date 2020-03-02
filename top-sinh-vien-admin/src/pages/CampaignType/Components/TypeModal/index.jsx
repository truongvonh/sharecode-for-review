import { func, string } from 'prop-types';
import React, { memo, useState } from 'react';
import BaseModal from './../../../../components/BaseModal';
import ModalActions from '../../../../components/ModalActions/index';
import useForm from '../../../../hooks/useForm';
import CustomForm from '../../../../components/CustomForm/index';

const allFields = [
  {
    lable: 'Name',
    name: 'name',
  }
];

const initData = {
  name: ''
};

const TypeModal = ({ onHide, onSubmit, ...props }) => {

  const [state, setstate] = useState({});

  const {
    values,
  } = useForm(null, null, initData);

  return (
    <BaseModal
      {...props}
      title="Thêm thể loại"
      size="md"
      centered
      onHide={onHide}
      actions={
        <ModalActions
          onHide={onHide}
          onOk={() => onSubmit(state)}
          typeOk="outline-primary"
        />
      }
    >
      <CustomForm
        allFields={allFields}
        values={values}
        handleChangeData={(data) => setstate(data)}
      />
    </BaseModal>
  );
};

TypeModal.propTypes = {
  content: string,
  onHide: func,
  onSubmit: func,
};

export default memo(TypeModal);