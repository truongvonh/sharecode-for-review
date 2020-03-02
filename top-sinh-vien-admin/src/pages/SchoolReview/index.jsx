import React, { memo, useEffect, useState } from 'react';
import Aux from '../../hoc/_Aux';
import { Button, Row, Col } from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import { useSelector, shallowEqual } from 'react-redux';
import { getAllSchoolReview } from 'store/schoolReview/actions';
import { getAllSchool } from '../../store/school/actions';
import { useActions } from 'hooks/useActions';
import ListSchoolReview from './ListReview/index';
import Pagination from 'components/Pagination';
import SelectSearchBox from 'components/SelectSearchBox';

const SchoolReview = () => {
  const [getAllSchoolReviewAction, getAllSchoolAction] = useActions([getAllSchoolReview, getAllSchool], null);

  const allSchoolReview = useSelector(store => store.schoolReview.schoolsReview, shallowEqual);
  const allSchool = useSelector(store => store.school.schools, shallowEqual);
  const schoolReviewStatus = useSelector(store => store.schoolReview.status, shallowEqual);
  const totalSchoolReview = useSelector(store => store.schoolReview.total, shallowEqual);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [school, setSchool] = useState('');
  const { page, limit } = pagination;
  const indexNumber = (page - 1) * limit;

  const schoolOptions = React.useMemo(
    () =>
      allSchool.length
        ? allSchool.map(item => ({
            ...item,
            fullName: `${item.name} - (${item.schoolCode})`,
            value: item._id,
            label: `${item.name} - (${item.schoolCode})`
          }))
        : [],
    [allSchool.length]
  );
  useEffect(() => {
    getAllSchoolReviewAction({ limit: 10 });
    getAllSchoolAction({});
  }, []);

  const onGetSchool = data => {
    setSchool(data ? data.value : '');
  };

  const onSubmitSearch = () => {
    getAllSchoolReviewAction({ id_school: school });
  };

  const onPaginate = value => {
    const { selected } = value;
    const page = selected + 1;

    setPagination({
      ...pagination,
      page
    });

    getAllSchoolReviewAction({ page, limit: 10 });
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Danh sách đánh giá trường học">
            <div className="row mb-4">
              <div className="col-12 col-xl-3">
                <SelectSearchBox
                  isMulti={false}
                  options={schoolOptions}
                  placeholder="Tìm kiếm trường"
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
            <ListSchoolReview
              allSchoolReview={allSchoolReview}
              schoolReviewStatus={schoolReviewStatus}
              indexNumber={indexNumber}
            />
            <div className="d-flex justify-content-center">
              <Pagination total={totalSchoolReview} forcePage={page - 1} onPageChange={onPaginate} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default React.memo(SchoolReview);
