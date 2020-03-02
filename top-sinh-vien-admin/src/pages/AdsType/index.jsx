import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';
import ListAdsType from './ListAdsType';
import { getAllBannerType, postBannerType } from 'store/ads/actions';
import AddType from './AddType';

const AdsType = () => {
  const [allBannerType, postBannerTypeAction] = useActions([getAllBannerType, postBannerType], null);
  const allAdsType = useSelector(store => store.ads.allAdsType, shallowEqual);
  const [isShow, toggleAdd, closeAdd] = useModal(false);

  /* Handle */
  useEffect(() => {
    allBannerType();
  }, []);

  const handleAddBannerType = name => {
    postBannerTypeAction({ name });
    closeAdd();
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Danh sách loại quảng cáo">
            <Button className="border-0 theme-bg1 btn-theme" onClick={toggleAdd}>
              <UcFirst text="Thêm loại quảng cáo" />
            </Button>
            <ListAdsType allAdsType={allAdsType} />
          </Card>
        </Col>
      </Row>
      <AddType show={isShow} isEdit={null} closeAdd={closeAdd} onSubmit={handleAddBannerType} />
    </Aux>
  );
};

export default React.memo(AdsType);
