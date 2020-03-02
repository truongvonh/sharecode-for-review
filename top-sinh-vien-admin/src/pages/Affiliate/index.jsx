import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Aux from 'hoc/_Aux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import Pagination from 'components/Pagination';
import { getAllAffiliate, affiliateAll } from '../../store/affiliate/actions';
import ActionAffiliateModal from './AffiliateActionModal';
import ListAffiliate from './ListAffiliate';
import PriorityAffiliate from './PriorityAffiliate';
import {
  DELETE_AFFILIATE_SUCCESS,
  ADD_AFFILIATE_SUCCESS,
  UPDATE_AFFILIATE_SUCCESS,
  PRIORITY_AFFILIATE_SUCCESS,
  TOGGLE_DISPLAY_AFFILIATE_SUCCESS
} from '../../store/affiliate/constant';

const User = () => {
  const [getAllAffiliateAction, getAllAffiliatesAction] = useActions([getAllAffiliate, affiliateAll], null);
  const allAffiliate = useSelector(store => store.affiliate.allAffiliate, shallowEqual);
  const allAffiliates = useSelector(store => store.affiliate.allAffiliates, shallowEqual);
  const totalAffiliate = useSelector(store => store.affiliate.total, shallowEqual);
  const affiliateStatus = useSelector(store => store.affiliate.status, shallowEqual);
  const [addAffiliateMd, toggleAffiliateMd, closeAffiliateMd] = useModal(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });

  const { page, limit } = pagination;
  const indexNumber = (page - 1) * limit;

  const onPaginate = value => {
    const page = value.selected + 1;
    setPagination({
      ...pagination,
      page
    });
    getAllAffiliateAction({ page, limit });
  };

  useEffect(() => {
    getAllAffiliateAction({ page, limit });
    getAllAffiliatesAction();
  }, []);

  useEffect(() => {
    switch (affiliateStatus) {
      case DELETE_AFFILIATE_SUCCESS: {
        toast.success('Cập nhật trạng thái thành công !');
        getAllAffiliatesAction();
        break;
      }
      case ADD_AFFILIATE_SUCCESS: {
        toast.success('Thêm đối tác thành công !');
        break;
      }
      case UPDATE_AFFILIATE_SUCCESS: {
        toast.success('Cập nhật thành công !');
        break;
      }
      case PRIORITY_AFFILIATE_SUCCESS: {
        toast.success('Sắp xếp thành công !');
        break;
      }
      case TOGGLE_DISPLAY_AFFILIATE_SUCCESS: {
        getAllAffiliatesAction();
        break;
      }
    }
  }, [affiliateStatus]);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Sắp xếp Affiliate">
            <div>
              <PriorityAffiliate allAffiliates={allAffiliates}></PriorityAffiliate>
            </div>
          </Card>
          <Card title="Tất cả liên kết">
            <Button className="border-0 theme-bg1 btn-theme" onClick={toggleAffiliateMd}>
              <UcFirst text="Thêm đối tác" />
            </Button>
            <ListAffiliate allAffiliate={allAffiliate} indexNumber={indexNumber} />
            <div className="d-flex justify-content-center mt-4">
              <Pagination total={totalAffiliate} forcePage={page - 1} onPageChange={onPaginate} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
      <ActionAffiliateModal show={addAffiliateMd} onHide={closeAffiliateMd} />
    </Aux>
  );
};

export default React.memo(User);
