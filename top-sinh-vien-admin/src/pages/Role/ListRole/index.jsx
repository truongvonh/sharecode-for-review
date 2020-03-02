import React, { useEffect, useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import { rendeTableHeader } from 'utils/renderUltil';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import { array, string } from 'prop-types';
import ConfirmModal from 'components/ConfirmModal';
import { deleteRole } from 'store/user/actions';
import { DELETE_ROLE_SUCCESS } from 'store/user/constant';

import ActionsRoleModal from '../ActionsRoleModal/index';

const headerField = ['No.', 'Tên', 'Các chức năng', 'Thao tác'];
const allColors = ['primary', 'success', 'info', 'danger', 'dark'];
const ListRole = ({ allRoles, roleActionStatus }) => {
  const deleteRoleAction = useActions(deleteRole, null);
  const [confirmMdStatus, toggleMdConfirm, closeMdConfirm] = useModal(false);
  const [actionMdStatus, toggleMdActions, closeMdAction] = useModal(false);
  const [roleItem, setRoleItem] = useState({});

  const onSelectItem = (item, cb) => {
    setRoleItem(item);
    cb();
  };

  const onClearItem = cb => {
    setRoleItem({});
    cb();
  };

  useEffect(() => {
    if (roleActionStatus === DELETE_ROLE_SUCCESS) {
      onClearItem(closeMdConfirm);
    }
  }, [roleActionStatus]);

  const renderALlPermissions = data =>
    data.length > 0 &&
    data.map((item, index) => (
      <Badge key={index} variant={allColors[index]} className="mr-2 mb-1">
        {item}
      </Badge>
    ));

  const renderTypesBody = allRoles => {
    const result = allRoles.length
      ? allRoles.map((item, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td className="d-flex flex-wrap">{renderALlPermissions(item.permissions)}</td>
            <td className="px-0">
              {item.name !== 'SUPER_ADMIN' ? (
                <div className="d-flex justify-content-around">
                  <ButtonWithToolTip
                    content="Xoá quyền "
                    icons="icon-trash-2"
                    variant="danger"
                    onClick={() => onSelectItem(item, toggleMdConfirm)}
                  />

                  <ButtonWithToolTip
                    content="Sửa quyền "
                    icons="icon-edit-2"
                    onClick={() => onSelectItem(item, toggleMdActions)}
                  />
                </div>
              ) : null}
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
        {renderTypesBody(allRoles)}
      </Table>
      <ConfirmModal
        onHide={closeMdConfirm}
        content="Bạn có muốn xoá không?"
        show={confirmMdStatus}
        onSelect={() => deleteRoleAction({ id: roleItem._id })}
      />
      <ActionsRoleModal
        show={actionMdStatus}
        roleItem={roleItem}
        allRoles={allRoles}
        onHide={closeMdAction}
        roleActionStatus={roleActionStatus}
      />
    </>
  );
};

ListRole.propTypes = {
  allRoles: array,
  roleActionStatus: string
};

export default React.memo(ListRole);
