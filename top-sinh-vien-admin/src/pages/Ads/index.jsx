import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import Pagination from 'components/Pagination';
import AdsActionModal from './AdsActionModal';
import ListAds from './ListAds';
import { getAllBanner, getAllBannerTypeDelete } from 'store/ads/actions';

const Ads = () => {
  const [getAllBannerAction, getAllBannerTypeDeleteAction] = useActions([getAllBanner, getAllBannerTypeDelete], null);
  const allAds = useSelector(store => store.ads.allAds, shallowEqual);
  const allBannerType = useSelector(store => store.ads.allAdsTypeDelete, shallowEqual);
  const totalAds = useSelector(store => store.ads.total, shallowEqual);
  const adsStatus = useSelector(store => store.ads.status, shallowEqual);
  const [adsMdStatus, toggleAdsMd, closeAdsMd] = useModal(false);

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
    getAllBannerAction({ page, limit });
  };

  useEffect(() => {
    getAllBannerTypeDeleteAction();
    getAllBannerAction({ page, limit });
  }, []);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Tất cả quảng cáo">
            <Button className="border-0 theme-bg1 btn-theme" onClick={toggleAdsMd}>
              <UcFirst text="Thêm quảng cáo" />
            </Button>
            <ListAds allAds={allAds} indexNumber={indexNumber} adsStatus={adsStatus} allBannerType={allBannerType} />
            <div className="d-flex justify-content-center mt-4">
              <Pagination total={totalAds} forcePage={page - 1} onPageChange={onPaginate} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
      <AdsActionModal show={adsMdStatus} adsStatus={adsStatus} onHide={closeAdsMd} allBannerType={allBannerType} />
    </Aux>
  );
};

export default React.memo(Ads);
