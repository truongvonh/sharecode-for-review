import BaseModal from '../../../../components/BaseModal';
import React, { memo, useMemo, useState } from 'react';
import { func, object, string } from 'prop-types';
import ModalActions from './../../../../components/ModalActions';
import CustomForm from './../../../../components/CustomForm';
import useForm from '../../../../hooks/useForm';
import { connect, shallowEqual, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateRound, updateStatusRound } from './../../../../store/campaign/actions';
import { toast } from 'react-toastify';

const allFields = [
  {
    name: 'name_round',
    label: 'Round name',
    disabled: true,
  },
  {
    name: 'startTime',
    label: 'Start time',
    showTime: true,
    type: 'datePicker'
  },
  {
    name: 'endTime',
    showTime: true,
    label: 'End time',
    type: 'datePicker'
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    allSelect: [
      {
        name: 'HAPPENED'
      },
      {
        name: 'HAPPENING'
      },
      {
        name: 'NOT_HAPPEN'
      }]
  },
];

const UpdateRoundModal = ({ updateRound, updateStatusRound, roundItem, onHide, ...props }) => {

  const allRound = useSelector(store => store.campaign.roundOfType, shallowEqual);

  const {
    values,
  } = useForm(null, null, roundItem);
  const [formValue, setFormValue] = useState({});

  const handleChangeData = (formValue) => {

    const startTime = new Date(formValue.startTime).getTime();
    const endTime = new Date(formValue.endTime).getTime();
    if (startTime > endTime) toast.warn('Not valid time. End time must be greeter than Start time ');
    setFormValue(formValue);
  };

  const onUpdateRound = () => {
    const { _id, startTime, endTime } = formValue;
    updateRound({ round_id: _id, startTime, endTime });
    onHide();
  };

  const checkDisabledStatus = useMemo(() => {
    if (formValue._id) {
      const round_id = formValue._id;
      const roundUpdate = allRound.find(item => item._id === round_id);
      return !roundUpdate.startTime && !roundUpdate.endTime;
    }
  }, [formValue, allRound]);

  const handleChangeStatus = (status) => {
    if (checkDisabledStatus) toast.warn('Please set start time and end time before update status');
    else updateStatusRound({ status, round_id: formValue._id });
  };

  return (
    <BaseModal
      {...props}
      title="Edit round"
      size="md"
      centered
      onHide={onHide}
      actions={
        <ModalActions
          onOk={onUpdateRound}
          onHide={onHide}
        />
      }
    >
      <CustomForm
        allFields={allFields}
        values={values}
        disabledStatus={checkDisabledStatus}
        handleChangeData={handleChangeData}
        handleChangeStatus={handleChangeStatus}
      />
    </BaseModal>
  );
};

UpdateRoundModal.propTypes = {
  content: string,
  onHide: func,
  roundItem: object,
  updateRound: func,
  updateStatusRound: func,
};
const mapDispatchToProps = dispatch => (
  bindActionCreators(
    { updateRound, updateStatusRound },
    dispatch,
  )
);

export default connect(null, mapDispatchToProps)(memo(UpdateRoundModal));
