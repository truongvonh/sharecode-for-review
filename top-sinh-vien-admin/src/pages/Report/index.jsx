import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Col, Row, DropdownButton, Dropdown } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';

import Pagination from 'components/Pagination';
import { getAllReport } from '../../store/report/actions';
import ListReport from './ListReport';

const allFilter = [
  {
    value: true,
    label: 'Đã xử lý',
    variant: 'danger'
  },
  {
    value: false,
    label: 'Chưa xử lý',
    variant: 'primary'
  }
];

const FilterDropDown = ({ isChangeColor = false, onChangeValue = () => null }) => {
  const [filterValue, setFilterValue] = useState({
    value: false,
    label: 'Chưa xử lý',
    variant: 'primary'
  });

  const { value, label, variant } = filterValue;

  const renderAllFilterItem = () => {
    return allFilter.map((item, index) => (
      <Dropdown.Item eventKey={item.value} key={index}>
        {item.label}
      </Dropdown.Item>
    ));
  };

  const onChangeFilter = e => {
    const result = allFilter.length ? allFilter.find(item => item.value.toString() === e) : [];
    if (result) {
      setFilterValue(result);
      onChangeValue(result);
    }
  };

  const basicDropdownButton = (
    <DropdownButton
      title={`${label || 'Lọc trạng thái '}`}
      variant={`${isChangeColor && variant}`}
      className="p-0 f-12"
      onSelect={onChangeFilter}
    >
      {renderAllFilterItem()}
    </DropdownButton>
  );

  return basicDropdownButton;
};
const User = () => {
  const getAllReportAction = useActions(getAllReport, null);

  const allReports = useSelector(store => store.report.allReports, shallowEqual);
  const totalReport = useSelector(store => store.report.total, shallowEqual);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });

  const [actionStatus, setActionStatus] = useState(false);

  const { page, limit } = pagination;
  const indexNumber = (page - 1) * limit;

  const onChangeValue = data => {
    setPagination({
      ...pagination,
      page: 1
    });
    getAllReportAction({
      page: 1,
      limit,
      status: data.value
    });

    setActionStatus(data.value);
  };

  const onPaginate = value => {
    const page = value.selected + 1;
    setPagination({
      ...pagination,
      page
    });
    getAllReportAction({ page, limit, status: actionStatus });
  };

  useEffect(() => {
    getAllReportAction({ page, limit });
  }, []);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Xem tất cả báo cáo vi phạm">
            <div className="d-flex align-items-center mb-5">
              <p className="mb-0 mr-4 font-weight-bold">Lựa chọn trạng thái : </p>
              <FilterDropDown isChangeColor onChangeValue={onChangeValue} />
            </div>
            <ListReport allReports={allReports} indexNumber={indexNumber} actionStatus={actionStatus} />
            <div className="d-flex justify-content-center mt-4">
              <Pagination total={totalReport} forcePage={page - 1} onPageChange={onPaginate} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default React.memo(User);
