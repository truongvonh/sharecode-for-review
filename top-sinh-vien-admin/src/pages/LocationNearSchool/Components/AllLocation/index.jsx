import React, { useState, memo } from 'react';
import { array } from 'prop-types';
import { 
  Table,
  Button
} from 'react-bootstrap';
import './style.scss';
import BaseModal from '../../../../components/BaseModal';

const headerField = ['No.', 'Avatar', 'Name', 'Address', 'Photos'];

const rendeTableHeader = headerField => {
  
  const result = headerField.length ? headerField.map((item, index) => (
    <th key={index} className="border-top-0">{item}</th>
  )) : null;
  
  return (
    <thead>
      <tr>{result}</tr>
    </thead>
  );
};

const AllLocation = ({ allLocation }) => {
  const [openPhotosModal, setOpenPhotosModal] = useState(false);
  const [photos, setPhotos] = useState([]);

  const onCloseModal = () => {
    setOpenPhotosModal(false);
    setPhotos([]);
  };

  const viewAllPhotos =(photos) => {
    setOpenPhotosModal(!openPhotosModal);
    setPhotos(photos);
  };

  const renderAllLocation = locations => {
    const result = locations.length ? locations.map((item, index) =>  (
      <tr key={index}>
        <td className="align-middle" scope="row">{index+1}</td>
        <td className="align-middle"><img src={item.avatar.length && item.avatar[0].thumb} className="rounded-circle circle-image-avatar" alt={item.name}/></td>
        <td className="align-middle">{item.name}</td>
        <td className="align-middle">{item.address}</td>
        <td className="d-flex align-items-center" >
          <Button 
            className="rounded-circle p-2 d-flex justify-content-center align-items-center m-0" 
            variant="success"
            disabled={item.check}
            onClick={() => viewAllPhotos(item.photos)}
          >
            <i className="feather mr-0 icon-image" />
          </Button>
        </td>
      </tr>
      )) : null;

    return (
      <tbody>
        {result}
      </tbody>
    );
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderAllLocation(allLocation)}
      </Table>
      <BaseModal 
        title="All locations photos" 
        show={openPhotosModal} 
        onHide={onCloseModal}
        borderNone={true}
        size="md"
      >
        <div className="gallery">
          {
          photos.length ? photos.map((item, index) => (
            <div key={index} className="gallery-item">
              <img className="gallery-image" src={item.thumb}/>
            </div>
          )) : null
        }
        </div>
      </BaseModal>
    </>
  );
};

AllLocation.propTypes = {
  allLocation: array,
};

export default memo(AllLocation);
