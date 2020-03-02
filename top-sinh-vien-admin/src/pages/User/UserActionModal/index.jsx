import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import BaseModal from '../../../components/BaseModal';
import ModalActions from '../../../components/ModalActions';
import { useActions } from '../../../hooks/useActions';
import { addUser, updateUser } from '../../../store/user/actions';
import { func, string } from 'prop-types';
import {
  ADD_USER_PROGRESS,
  ADD_USER_SUCCESS,
  UPDATE_USER_PROGRESS,
  UPDATE_USER_SUCCESS
} from '../../../store/user/constant';

const UserActionModal = ({ onHide, userStatus, userItem, ...props }) => {
  const [addUserAction, updateUserAction] = useActions([addUser, updateUser], null);
  const [formValue, setFormValue] = React.useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });

  const { first_name, last_name, username, password } = formValue;
  const allFormFields = [
    {
      name: 'first_name',
      label: 'Họ',
      value: first_name
    },
    {
      name: 'last_name',
      label: 'Tên',
      value: last_name
    },
    {
      name: 'username',
      label: 'Tên đăng nhập',
      value: username
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      value: password
    }
  ];
  const isEditUser = userItem && Object.values(userItem).length;
  const checkLoading = userStatus === ADD_USER_PROGRESS || userStatus === UPDATE_USER_PROGRESS;

  const onChangeForm = e => {
    const { name } = e.target;
    setFormValue({
      ...formValue,
      [name]: e.target.value
    });
  };

  const onClear = cb => {
    setFormValue({
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    });
    cb();
  };

  const onSubmit = () => {
    if (isEditUser) {
      const payload = {
        ...formValue,
        id: userItem._id
      };
      updateUserAction(payload);
    } else addUserAction(formValue);
  };

  useEffect(() => {
    if (isEditUser) {
      setFormValue({
        last_name: userItem.last_name,
        first_name: userItem.first_name,
        username: userItem.email || userItem.username
      });
    }
  }, [userItem]);

  useEffect(() => {
    if (userStatus === ADD_USER_SUCCESS || userStatus === UPDATE_USER_SUCCESS) onClear(onHide);
  }, [userStatus]);

  const renderFormAction = () => {
    return (
      <Form>
        {allFormFields.map((item, index) => (
          <div className="mb-3" key={index}>
            {!(isEditUser && index === 3) && <Form.Label>{item.label}</Form.Label>}
            <Form.Control
              type="text"
              value={item.value}
              disabled={isEditUser && index === 2}
              className={`${isEditUser && index === 3 ? 'd-none' : ''}`}
              name={item.name}
              onChange={onChangeForm}
            />
          </div>
        ))}
      </Form>
    );
  };

  return (
    <BaseModal
      borderNone
      onHide={onHide}
      title={`${isEditUser ? 'Cập nhật user' : 'Thêm user'}`}
      actions={<ModalActions onHide={onHide} isLoading={checkLoading} onOk={onSubmit} />}
      {...props}
    >
      {renderFormAction()}
    </BaseModal>
  );
};

UserActionModal.propTypes = {
  userStatus: string,
  onHide: func
};

export default React.memo(UserActionModal);
