import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import Pagination from 'components/Pagination';
import { getAllAffiliate } from '../../store/affiliate/actions';
import ActionAffiliateModal from './BadgeActionModal';
import ListBadge from './ListBadge';
import { getAllBadge } from 'store/badge/actions';

const User = () => {

  // define actions
  const getAllBadgeAction = useActions(getAllBadge, null);
  
  // mapState from store
  const allBadge = useSelector(store => store.badge.allBadge, shallowEqual);
  const badgeStatus = useSelector(store => store.badge.status, shallowEqual);

  useEffect(() => {
    getAllBadgeAction();
  }, []);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Quản lý tất cả các danh hiệu">
            <ListBadge  allBadge={allBadge}
                        badgeStatus={badgeStatus}/>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default React.memo(User);