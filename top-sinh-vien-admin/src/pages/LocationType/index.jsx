import React, { memo, useEffect, useState } from 'react';
import { func } from 'prop-types';
import Aux from '../../hoc/_Aux';
import UcFirst from '../../App/components/UcFirst';
import { bindActionCreators } from 'redux';
import { Button, Row, Col } from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import { connect } from 'react-redux';
import AddLocationType from './Components/AddLocationType/index';
import AllLocationType from './Components/AllLocationType/index';
import { getAllLocationType, postLocationType, deleteLocationType, editLocationType } from 'store/location/actions';
import { useSelector, shallowEqual } from 'react-redux';
import useModal from 'hooks/useModal';
import { EDIT_LOCATION_TYPE_SUCCESS } from 'store/location/constant';

const LocationType = ({ postLocationType, getAllLocationType, deleteLocationType, editLocationType }) => {
  const allTypes = useSelector(store => store.location.allTypes, shallowEqual);
  const locationTypeStatus = useSelector(store => store.location.status, shallowEqual);
  const [isLocationTypeModal, toggleLocationType, closeLocationType] = useModal(false);
  const [locationType, setLocationType] = useState({});

  useEffect(() => {
    getAllLocationType();
  }, []);

  useEffect(() => {
    if (locationTypeStatus === EDIT_LOCATION_TYPE_SUCCESS) {
      setLocationType({});
      closeLocationType();
    }
  }, [locationTypeStatus]);

  const onEditLocationType = locationType => {
    setLocationType(locationType);
    toggleLocationType();
  };

  const onHideModal = () => {
    closeLocationType();

    setLocationType({});
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Thêm thể loại địa điểm">
            <div className="d-flex justify-content-between">
              <Button onClick={toggleLocationType} className="border-0 theme-bg1 btn-theme">
                <UcFirst text="Thêm thể loại địa điểm" />
              </Button>
            </div>
          </Card>
          <Card title="Danh sách loại địa điểm">
            <AllLocationType
              allTypes={allTypes}
              onEditLocationType={onEditLocationType}
              deleteLocationType={deleteLocationType}
            />
          </Card>
        </Col>
      </Row>
      <AddLocationType
        show={isLocationTypeModal}
        onAddLocationType={postLocationType}
        editLocationType={editLocationType}
        locationType={locationType}
        onHide={onHideModal}
      />
    </Aux>
  );
};

LocationType.propTypes = {
  getLocation: func,
  getAllLocationType: func,
  postLocationType: func,
  deleteLocationType: func,
  editLocationType: func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllLocationType,
      postLocationType,
      deleteLocationType,
      editLocationType
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(memo(LocationType));
