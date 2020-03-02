import React, { memo, useEffect } from 'react';
import { func, array, object, string } from 'prop-types';
import Aux from '../../hoc/_Aux';
import UcFirst from '../../App/components/UcFirst';
import { bindActionCreators } from 'redux';
import { 
  Button,
  Row, 
  Col
} from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import { connect } from 'react-redux';
import { toggleModal } from './../../store/school/actions';
import AddLocation from './Components/AddLocation/index';
import { getLocation, getAllLocation } from './../../store/location/actions';
import { useSelector } from 'react-redux';
import AllLocation from './Components/AllLocation';

const Location = ({ getAllLocation, toggleModal,  getLocation }) => {
  const allLocation = useSelector(store => store.location.allLocation);

  useEffect(() => {
    getAllLocation();
  }, []);

  const onAddLocation = (place_id) => {
    getLocation({ place_id });
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Location">
            <Button 
              onClick={toggleModal} 
              className="border-0 theme-bg1 btn-theme"
            >
              <UcFirst text="Add location"/>
            </Button>
          </Card>
          <Card title="All location">
            <AllLocation 
              allLocation={allLocation} 
            />
          </Card>
        </Col>
      </Row>
      <AddLocation onAddLocation={onAddLocation} onHide={toggleModal}/>
    </Aux>
  );
};

Location.propTypes = {
  getLocation: func,
  getAllLocation: func,
  toggleModal: func,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators(
    { 
      toggleModal,
      getLocation,
      getAllLocation
    },
    dispatch
  )
);

export default connect(null, mapDispatchToProps)(memo(Location));
