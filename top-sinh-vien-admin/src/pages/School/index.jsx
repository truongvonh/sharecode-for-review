import React, { memo, useEffect, useState } from 'react';
import { func, array, object, string } from 'prop-types';
import Aux from '../../hoc/_Aux';
import UcFirst from '../../App/components/UcFirst';
import { bindActionCreators } from 'redux';
import { Button, Row, Col } from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import AllSchools from './Components/AllSchools/index';
import { connect, shallowEqual } from 'react-redux';
import { toggleModal, getAllSchool, addSchool, removeSchool, addTeam } from '../../store/school/actions';
import AddSchoolDialog from './Components/AddSchoolDialog/index';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';

const School = ({
  getAllSchool,
  toggleModal,
  addSchool,
  // isAuthenticated,
  addTeam,
  removeSchool
}) => {
  const schools = useSelector(store => store.school.schools, shallowEqual);
  const totalSchools = useSelector(store => store.school.total, shallowEqual);
  const isAuthenticated = useSelector(store => store.auth.user, shallowEqual);
  const status = useSelector(store => store.school.status, shallowEqual);
  // const isLoading = useSelector(store => store.school.isLoading, shallowEqual);

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  const [key, setKey] = useState('');
  const { page, limit } = paginate;
  const indexNumber = (page - 1) * limit;

  useEffect(() => {
    getAllSchool({ page, limit, key });
  }, [isAuthenticated]);

  useEffect(() => {
    getAllSchool({ page, limit, key });
  }, [page]);

  const onAddSchool = data => {
    addSchool(data);
  };

  const onPaginate = e => {
    const page = e.selected + 1;
    setPaginate(prev => ({ ...prev, page }));
    if (key) getAllSchool({ page, limit, key });
  };

  const onChangeSearchValue = e => {
    if (e.target.value) setKey(e.target.value);
    else getAllSchool({ page: 1, limit });
  };

  const onSubmitSearch = e => {
    setPaginate(prev => ({ ...prev, page: 1 }));
    if (e.key === 'Enter') getAllSchool({ page: 1, limit, key });
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Thêm trường học">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <Button onClick={toggleModal} className="border-0 theme-bg1 btn-theme mb-3 mb-md-0">
                <UcFirst text="Thêm trường học" />
              </Button>
              <div className="form group col-12 col-md-6 d-flex align-items-center">
                <input
                  className="form-control w-100 py-2"
                  placeholder="Tìm kiếm theo tên trường, mã trường"
                  onChange={onChangeSearchValue}
                  onKeyPress={onSubmitSearch}
                />
                <button
                  onClick={() => getAllSchool({ page: 1, limit, key })}
                  className="p-2 m-0 btn btn-primary rounded-0 px-3"
                >
                  <i className="feather mr-0 icon-search" />
                </button>
              </div>
            </div>
          </Card>
          <Card title="Danh sách các trường học">
            <AllSchools
              addTeam={school_id => addTeam({ school_id })}
              removeSchool={school_id => removeSchool({ school_id })}
              schools={schools}
              indexNumber={indexNumber}
              status={status}
            />
            <div className="d-flex justify-content-center mt-5">
              <Pagination forcePage={page - 1} onPageChange={onPaginate} total={totalSchools} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
      <AddSchoolDialog onAddSchool={onAddSchool} onHide={toggleModal} />
    </Aux>
  );
};

School.propTypes = {
  toggleModal: func,
  addSchool: func,
  addTeam: func,
  getAllSchool: func,
  removeSchool: func,
  schools: array,
  isAuthenticated: object,
  status: string
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal,
      getAllSchool,
      addSchool,
      addTeam,
      removeSchool
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(memo(School));
