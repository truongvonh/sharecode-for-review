import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import Pagination from 'components/Pagination';
import { shallowEqual, useSelector } from 'react-redux';
import ListLocationReview from './ListReview/index';
import { getAllLocationReview } from 'store/locationReview/actions';
import { useActions } from 'hooks/useActions';
import { getAllLocation } from 'store/location/actions';
import SelectSearchBox from 'components/SelectSearchBox';

const LocationReview = () => {
  const [allLocationStore, allReviewStore] = useActions([getAllLocation, getAllLocationReview], null);
  const allLocationReview = useSelector(store => store.locationReview.allLocationReview, shallowEqual);
  const allLocation = useSelector(store => store.location.allLocation, shallowEqual);
  const locationReviewStatus = useSelector(store => store.locationReview.status, shallowEqual);
  const totalLocationReview = useSelector(store => store.locationReview.total, shallowEqual);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { page, limit } = pagination;
  const [location, setLocation] = useState();
  const indexNumber = (page - 1) * limit;

  const locationOptions = React.useMemo(
    () =>
      allLocation.length
        ? allLocation.map(item => ({
            ...item,
            fullName: `${item.name}`,
            value: item._id,
            label: `${item.name}`
          }))
        : [],
    [allLocation.length]
  );

  const onGetSchool = item => {
    setLocation(item ? item._id : '');
  };

  const onSubmitSearch = () => {
    allReviewStore({ location });
  };

  const onPaginate = value => {
    const { selected } = value;
    const page = selected + 1;

    setPagination({
      ...pagination,
      page
    });

    allReviewStore({ page, limit: 10 });
  };

  useEffect(() => {
    allReviewStore({ limit: 10 });
    allLocationStore({ limit: 500 });
  }, []);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Đánh giá điạ điểm">
            <div className="row mb-4">
              <div className="col-12 col-xl-3">
                <SelectSearchBox
                  isMulti={false}
                  options={locationOptions}
                  placeholder="Tìm kiếm địa điểm"
                  classes="flex-shrink-0"
                  onChange={onGetSchool}
                  keyLabel="fullName"
                />
              </div>
              <div className="col-12 col-xl-2">
                <Button color="primary" className="ml-3 flex-shrink-0" onClick={() => onSubmitSearch()}>
                  Tìm kiếm
                </Button>
              </div>
            </div>
            <ListLocationReview
              locationReviewStatus={locationReviewStatus}
              allLocationReview={allLocationReview}
              indexNumber={indexNumber}
            />
            <div className="d-flex justify-content-center">
              <Pagination total={totalLocationReview} forcePage={page - 1} onPageChange={onPaginate} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default React.memo(LocationReview);
