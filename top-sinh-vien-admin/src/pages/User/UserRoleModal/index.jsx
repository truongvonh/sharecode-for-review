import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import BaseModal from 'components/BaseModal';
import ModalActions from 'components/ModalActions';
import { array, func, object, string } from 'prop-types';
import { ADD_USER_PROGRESS, UPDATE_USER_PROGRESS } from 'store/user/constant';
import { useActions } from '../../../hooks/useActions';
import { updateUserRole } from '../../../store/user/actions';
import { UPDATE_USER_ROLE_PROGRESS, UPDATE_USER_ROLE_SUCCESS } from '../../../store/user/constant';

const UserRoleModal = ({ onHide, userStatus, allRoles, userItem, ...props }) => {
  const updateUserRoleAction = useActions(updateUserRole, null);
  const [role, setRole] = useState('');
  const checkLoading = userStatus === UPDATE_USER_ROLE_PROGRESS;

  const allOptions = React.useMemo(
    () =>
      allRoles.length > 0 &&
      allRoles.map((item, index) => (
        <option value={item._id} key={index}>
          {item.name}
        </option>
      )),
    [allRoles.length]
  );

  const onChangeRole = e => {
    setRole(e.target.value);
  };

  const onSubmit = () => {
    updateUserRoleAction({
      id_user: userItem._id,
      id_role: role
    });
  };

  const onCancel = cb => {
    setRole('');
    cb();
  };

  useEffect(() => {
    setRole(userItem.role ? userItem.role._id : !!allRoles[0] && allRoles[0]._id);
  }, [userItem]);

  useEffect(() => {
    if (userStatus === UPDATE_USER_ROLE_SUCCESS) onCancel(onHide);
  }, [userStatus]);

  const renderFormAction = () => {
    return (
      <Form>
        <Form.Label>Tên người dùng</Form.Label>
        <Form.Control type="text" disabled className={'mb-4'} value={userItem.fullName} />
        <Form.Label>Vai trò</Form.Label>
        <Form.Control as="select" onChange={onChangeRole} value={role}>
          {allOptions}
        </Form.Control>
      </Form>
    );
  };

  return (
    <BaseModal
      borderNone
      onHide={() => onCancel(onHide)}
      title="Thay đổi quyền của người dùng"
      actions={
        <ModalActions onHide={() => onCancel(onHide)} onOk={onSubmit} disabledOk={!role} isLoading={checkLoading} />
      }
      {...props}
    >
      {renderFormAction()}
    </BaseModal>
  );
};

UserRoleModal.propTypes = {
  userStatus: string,
  allRoles: array,
  userItem: object,
  onHide: func
};

export default React.memo(UserRoleModal);
