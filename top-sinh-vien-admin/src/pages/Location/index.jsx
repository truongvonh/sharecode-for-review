import React, { memo, useEffect, useState, useMemo } from 'react';
import { func } from 'prop-types';
import Aux from '../../hoc/_Aux';
import UcFirst from '../../App/components/UcFirst';
import { bindActionCreators } from 'redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import { connect } from 'react-redux';
import { toggleModal, getAllSchool } from './../../store/school/actions';
import AddLocation from './Components/AddLocation/index';
import SearchAddLocation from './Components/SearchAddLocation/index';
import {
  getLocation,
  getAllLocation,
  filterLocationNearSchool,
  addNearSchool,
  deleteLocation,
  userGetAllLocationType,
  addTypeInLocation
} from './../../store/location/actions';
import { useSelector, shallowEqual } from 'react-redux';
import AllLocation from './Components/AllLocation';
import SelectSearchBox from '../../components/SelectSearchBox';
import { ADD_NEAR_SCHOOL_SUCCESS } from '../../store/location/constant';
import ToolTipCustom from '../../components/ToolTipCustom';
import Pagination from '../../components/Pagination';
import useModal from 'hooks/useModal';

const ALL_LOCATION_ID = '5da928a535d17c651197e382';

const Location = ({
  getAllLocation,
  toggleModal,
  getAllSchool,
  getLocation,
  addNearSchool,
  deleteLocation,
  filterLocationNearSchool,
  addTypeInLocation,
  userGetAllLocationType
}) => {
  const allLocation = useSelector(store => store.location.allLocation, shallowEqual);
  const allSchool = useSelector(store => store.school.schools, shallowEqual);
  const filterStatus = useSelector(store => store.location.status, shallowEqual);
  const totalLocation = useSelector(store => store.location.total, shallowEqual);
  const allTypes = useSelector(store => store.location.allTypes, shallowEqual);

  const [addLocationMd, toggleAddlocationMd, closeAddLocationMd] = useModal(false);

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  const [locationType, setLocationType] = useState([]);
  const { page, limit } = paginate;
  const [school, setSchool] = useState();
  const [key, setKey] = useState('');

  const getIdType = locationType => locationType && locationType.length && locationType.map(item => item.value);

  const getAllLocationTypes = ALL_LOCATION_ID =>
    allTypes.length
      ? allTypes.filter(item => item.id !== ALL_LOCATION_ID).map(item => ({ label: item.name, value: item._id }))
      : [];

  const checkLocationType = locationType => {
    const isSelectAll =
      locationType && locationType.length && locationType.some(item => item.value === ALL_LOCATION_ID);
    return isSelectAll ? getIdType(getAllLocationTypes(ALL_LOCATION_ID)) : getIdType(locationType);
  };

  useEffect(() => {
    getAllSchool({});
    getAllLocation({});
    userGetAllLocationType();
  }, []);

  useEffect(() => {
    if (filterStatus === ADD_NEAR_SCHOOL_SUCCESS) {
      // setSchool({});
      // getAllLocation({ page, limit });
      if (school && school.value)
        getAllLocation({ id_school: school.value, page, limit, key, id_type: checkLocationType(locationType) });
      else getAllLocation({ page, limit, key, id_type: checkLocationType(locationType) });
    }
  }, [filterStatus]);

  useEffect(() => {
    if (!key && !school && !locationType) getAllLocation({ page, limit });
  }, [key, school, locationType]);

  const onAddLocation = place_id => {
    getLocation({ place_id });
  };

  const onChangeSchool = school => {
    setSchool(school);
    setPaginate(prev => ({ ...prev, page: 1 }));
    // setKey('');
    // setLocationType([]);
    if (school)
      getAllLocation({ id_school: school.value, page: 1, limit, key, id_type: checkLocationType(locationType) });
    else getAllLocation({ page: 1, limit, key, id_type: checkLocationType(locationType) });
  };

  const onPaginate = value => {
    const page = value.selected + 1;
    setPaginate(prev => ({ ...prev, page }));
    if (school && school.value)
      getAllLocation({ id_school: school.value, page, limit, key, id_type: checkLocationType(locationType) });
    else getAllLocation({ page, limit, key, id_type: checkLocationType(locationType) });
  };

  //eslint-disable-next-line
  const indexNumber = school && school.hasOwnProperty('value') ? 0 : (paginate.page - 1) * paginate.limit;

  const onSubmitSearchLocation = e => {
    setPaginate(prev => ({ ...prev, page: 1 }));
    // setSchool({});
    getAllLocation({
      page: 1,
      limit,
      key,
      id_type: checkLocationType(locationType),
      id_school: school ? school.value : ''
    });
  };

  const onFilterByLocationType = locationType => {
    const isSelectAll = locationType && locationType.some(item => item.value === ALL_LOCATION_ID);
    // setSchool({});
    setLocationType(isSelectAll ? getAllLocationTypes(ALL_LOCATION_ID) : locationType);
    getAllLocation({
      page: page !== 1 && 1,
      limit,
      id_type: checkLocationType(locationType),
      key,
      id_school: school ? school.value : ''
    });
  };

  const allSchoolOption = useMemo(() => {
    return allSchool.length
      ? allSchool.map(item => {
          return {
            ...item,
            name: `${item.name} ${item.schoolCode}`,
            label: `${item.schoolCode} ${item.name}`,
            value: item._id
          };
        })
      : [];
  }, [allSchool.length]);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Thêm địa điểm">
            <div className="d-flex flex-column flex-md-row">
              <Button onClick={toggleModal} className="border-0 theme-bg1 mr-4 btn-theme">
                <UcFirst text="Thêm địa điểm từ google" />
              </Button>

              <Button onClick={toggleAddlocationMd} className="border-0 theme-bg2">
                <UcFirst text="Tự tạo địa điểm" />
              </Button>
            </div>
            <Row className="w-100 pt-4 align-items-center">
              <Col sm={12} md={6}>
                <SelectSearchBox
                  onChange={onChangeSchool}
                  options={allSchoolOption}
                  value={school}
                  isMulti={false}
                  keyLabel="name"
                  className="mb-3 mb-md-0"
                  placeholder="Lọc các địa điểm theo trường"
                />
              </Col>
              <Col sm={12} md={6}>
                <Row className="d-flex align-items-center">
                  <Col sm={12} xl={6} className="mb-3 mb-xl-0">
                    <Form.Group className="d-flex align-items-center mb-0">
                      <Form.Control
                        className="py-2 rounded-left bg-white"
                        type="text"
                        value={key}
                        placeholder="Tìm kiếm tên hoặc địa chỉ"
                        onChange={e => setKey(e && e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && onSubmitSearchLocation()}
                      />
                      <ToolTipCustom content="Search location">
                        <Button variant="primary" onClick={onSubmitSearchLocation} className="p-2 m-0 rounded-0 px-3">
                          <i className="feather mr-0 icon-search" />
                        </Button>
                      </ToolTipCustom>
                    </Form.Group>
                  </Col>
                  <Col sm={12} xl={6}>
                    <SelectSearchBox
                      isMulti
                      options={allTypes}
                      value={locationType}
                      onChange={onFilterByLocationType}
                      keyLabel="name"
                      placeholder="Lọc theo thể loại"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <Card title="Tất cả các địa điểm">
            <AllLocation
              allLocation={allLocation}
              allSchool={allSchoolOption}
              schoolRemove={school}
              indexNumber={indexNumber}
              addNearSchool={addNearSchool}
              deleteLocation={deleteLocation}
              addTypeInLocation={addTypeInLocation}
              allTypes={allTypes}
            />
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                forcePage={paginate.page - 1}
                onPageChange={onPaginate}
                total={totalLocation}
                perpage={paginate.limit}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <AddLocation onAddLocation={onAddLocation} onHide={toggleModal} />

      <SearchAddLocation show={addLocationMd} onHide={closeAddLocationMd} />
    </Aux>
  );
};

Location.propTypes = {
  getLocation: func,
  getAllLocation: func,
  toggleModal: func,
  getAllSchool: func,
  deleteLocation: func,
  userGetAllLocationType: func,
  filterLocationNearSchool: func,
  addTypeInLocation: func,
  addNearSchool: func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleModal,
      getAllSchool,
      getLocation,
      getAllLocation,
      filterLocationNearSchool,
      addTypeInLocation,
      addNearSchool,
      userGetAllLocationType,
      deleteLocation
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(memo(Location));
