import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import { useActions } from 'hooks/useActions';
import { func, object } from 'prop-types';
import { createRole, updateRole } from 'store/user/actions';
import { CREATE_ROLE_SUCCESS, EDIT_ROLE_SUCCESS } from 'store/user/constant';
import BaseModal from 'components/BaseModal';
import ModalActions from 'components/ModalActions';
import SelectSearchBox from 'components/SelectSearchBox';

const ActionsRoleModal = ({ roleItem, onHide, roleActionStatus, allRoles, ...props }) => {
  const mapToSelect = data => data.map((item, index) => ({ _id: index, label: item, value: item }));
  const [createRoleAction, updateRoleAction] = useActions([createRole, updateRole], null);
  const isEdit = roleItem && Object.values(roleItem).length;

  const getAllPermissons = allRoles => {
    let result = [];
    if (allRoles.length) {
      allRoles.forEach(item => {
        if (item.name.toUpperCase() === 'SUPER_ADMIN') {
          result = item.permissions.filter(element => element !== 'MANAGE_ALL');
          result = mapToSelect(result);
        }
      });
    }

    return result;
  };

  const options = React.useMemo(() => getAllPermissons(allRoles), [allRoles[0]]);

  const [formValue, setFormValue] = useState({
    name_role: '',
    permissions: []
  });
  const { name_role, permissions } = formValue;

  const onSelectPermissions = permissions => {
    setFormValue({
      ...formValue,
      permissions
    });
  };

  const onClearFormValue = cb => {
    setFormValue({
      name_role: '',
      permissions: []
    });
    if (cb) cb();
  };

  const onChangeForm = e => {
    const { name } = e.target;
    setFormValue({
      ...formValue,
      [name]: e.target.value
    });
  };

  const onSubmit = () => {
    if (permissions === null || permissions.length === 0) {
      toast.error('Please choice at least one permission !!!');
      return;
    }
    if (isEdit)
      updateRoleAction({
        id: roleItem._id,
        name_role,
        permissions: permissions.map(item => item.label)
      });
    else
      createRoleAction({
        name_role,
        permissions: permissions.map(item => item.label)
      });
  };

  useEffect(() => {
    if (roleActionStatus === CREATE_ROLE_SUCCESS || roleActionStatus === EDIT_ROLE_SUCCESS) onClearFormValue(onHide);
  }, [roleActionStatus]);

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        name_role: roleItem.name,
        permissions: mapToSelect(roleItem.permissions)
      });
    }
  }, [roleItem]);

  const renderForm = () => {
    return (
      <Form>
        <Form.Label>Tên</Form.Label>
        <Form.Control
          type="text"
          onChange={onChangeForm}
          className="bg-white mb-3"
          value={name_role}
          name="name_role"
        />
        <Form.Label>Chọn các chức năng</Form.Label>
        <SelectSearchBox isMulti={true} value={permissions} onChange={onSelectPermissions} options={options} />
      </Form>
    );
  };

  return (
    <BaseModal
      title={!isEdit ? 'Thêm quyền' : 'Sửa quyền'}
      onHide={onHide}
      borderNone
      actions={<ModalActions onHide={onHide} onOk={onSubmit} />}
      {...props}
    >
      {renderForm()}
    </BaseModal>
  );
};

ActionsRoleModal.propTypes = {
  onHide: func,
  roleItem: object
};

export default React.memo(ActionsRoleModal);
