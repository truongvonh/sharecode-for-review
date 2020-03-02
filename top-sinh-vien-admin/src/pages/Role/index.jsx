import React, { useEffect } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { getAllRole } from 'store/user/actions';
import { useActions } from 'hooks/useActions';

import ActionsRoleModal from './ActionsRoleModal/index';
import ListRole from './ListRole';

const Role = () => {
  const allRoles = useSelector(store => store.user.allRoles, shallowEqual);
  const roleActionStatus = useSelector(store => store.user.status, shallowEqual);
  const [roleModalStatus, toggleRoleModal, closeRoleModal] = useModal(false);

  const getAllRoleActions = useActions(getAllRole, null);

  useEffect(() => {
    getAllRoleActions({});
  }, []);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Thêm quyền">
            <div className="d-flex justify-content-start">
              <Button className="border-0 theme-bg1 btn-theme" onClick={toggleRoleModal}>
                <UcFirst text="Thêm quyền" />
              </Button>
            </div>
          </Card>
          <Card title="Tất cả các quyền">
            <ListRole allRoles={allRoles} roleActionStatus={roleActionStatus} />
          </Card>
        </Col>
      </Row>
      <ActionsRoleModal
        show={roleModalStatus}
        onHide={closeRoleModal}
        roleActionStatus={roleActionStatus}
        allRoles={allRoles}
      />
    </Aux>
  );
};

export default React.memo(Role);
