import React, { useEffect, useState } from 'react';
import { Table, Badge, Form } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import { rendeTableHeader } from 'utils/renderUltil';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import { array, number, string } from 'prop-types';
import ConfirmModal from 'components/ConfirmModal';
import { _renderTitle } from 'utils/helper';
import { deleteUser } from 'store/user/actions';
import { DELETE_USER_SUCCESS } from 'store/user/constant';
import UserActionModal from '../UserActionModal';
import UserRoleModal from '../UserRoleModal';
import useForceUpdate from '../../../hooks/useForceUpdate';
import { UPDATE_USER_ROLE_SUCCESS } from '../../../store/user/constant';

const headerField = ['No.', 'Họ tên', 'Email', 'Điện thoại', 'Truờng học', 'Trạng thái', 'Quyền', 'Thao tác'];
const ListUser = ({ allUsers, userStatus, indexNumber, allRoles }) => {
  const forceUpdate = useForceUpdate();
  const [confirmMdStatus, toggleMdConfirm, closeMdConfirm] = useModal(false);
  const [actionMdStatus, toggleMdActions, closeMdAction] = useModal(false);
  const [userRoleMd, toggleUserRoleMd, closeUserRoleMd] = useModal(false);
  const [userItem, setUserItem] = useState({});
  const deleteUserAction = useActions(deleteUser, null);

  allRoles = allRoles.filter(element => element.name !== 'SUPER_ADMIN');

  const onSelectItem = (item, cb) => {
    setUserItem(item);
    cb();
  };

  const onClearItem = cb => {
    setUserItem({});
    cb();
  };

  useEffect(() => {
    if (userStatus === DELETE_USER_SUCCESS) onClearItem(closeMdConfirm);

    if (userStatus === UPDATE_USER_ROLE_SUCCESS) {
      setTimeout(() => forceUpdate(), 500);
    }
  }, [userStatus]);

  const renderTableBody = allUsers => {
    const result = allUsers.length
      ? allUsers.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">{indexNumber + index + 1}</th>
              <td>{_renderTitle(item.fullName)}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.schoolUser}</td>
              <td>
                <Badge variant={item.status ? item.status.color : 'warning'}>
                  {item.status ? item.status.label : 'Chưa kích hoạt'}
                </Badge>
              </td>
              <td>
                <Badge variant="info">{item.role ? item.role.name : null}</Badge>
              </td>
              <td className="px-0">
                <div className="d-flex justify-content-center">
                  {item && item.role && item.role.name === 'SUPER_ADMIN' ? null : (
                    <ButtonWithToolTip
                      content={`${!item.role ? 'Thêm quyền' : 'Sửa quyền'}  `}
                      icons={`${!item.role ? 'icon-unlock' : 'icon-settings'}`}
                      variant={`${!item.role ? 'success' : 'secondary'}`}
                      onClick={() => onSelectItem(item, toggleUserRoleMd)}
                    />
                  )}

                  <ButtonWithToolTip
                    content={`${
                      item.status.color === 'success'
                        ? 'Xóa user'
                        : item.status.color === 'danger'
                        ? 'Bỏ xóa user'
                        : null
                    }`}
                    icons={`${
                      item.status.color === 'success'
                        ? 'icon-trash-2'
                        : item.status.color === 'danger'
                        ? 'icon-refresh-ccw'
                        : null
                    }`}
                    variant={`${
                      item.status.color === 'success' ? 'danger' : item.status.color === 'danger' ? 'warning' : null
                    }`}
                    onClick={() => onSelectItem(item, toggleMdConfirm)}
                  />

                  <ButtonWithToolTip
                    content="Sửa user"
                    icons="icon-edit-2"
                    onClick={() => onSelectItem(item, toggleMdActions)}
                  />
                </div>
              </td>
            </tr>
          );
        })
      : null;

    return <tbody>{result}</tbody>;
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderTableBody(allUsers)}
      </Table>
      <ConfirmModal
        onHide={closeMdConfirm}
        content={
          !!userItem.status && userItem.status.color === 'success'
            ? 'Bạn có muốn xoá người này không?'
            : 'Bạn có muốn bỏ xoá người này không?'
        }
        show={confirmMdStatus}
        onSelect={() => deleteUserAction({ id: userItem._id })}
      />
      <UserActionModal show={actionMdStatus} userItem={userItem} userStatus={userStatus} onHide={closeMdAction} />
      <UserRoleModal
        show={userRoleMd}
        userItem={userItem}
        allRoles={allRoles}
        userStatus={userStatus}
        onHide={closeUserRoleMd}
      />
    </>
  );
};

ListUser.propTypes = {
  allUsers: array,
  allRoles: array,
  indexNumber: number,
  roleActionStatus: string
};

export default React.memo(ListUser);
