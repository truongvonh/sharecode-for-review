import React, { memo, useState, useEffect } from 'react';
import { bool, func, string } from 'prop-types';
import { Button, Form, Spinner } from 'react-bootstrap';
import BaseModal from '../../../../components/BaseModal/index';
import LocationSearchInput from '../AutoCompletePlace';
import { connect } from 'react-redux';
import { COMMON_ENDPOINT } from '../../../../api/constant';
import { toast } from 'react-toastify';
import { ADD_SCHOOL_SUCCESS } from '../../../../store/school/constant';
import UploadAvatar from '../UploadAvatar';
import ImageWithFallback from '../../../../components/ImageWithFallback';

const formField = ['Name', 'Address', 'Club', 'Intro', 'Education_programer', 'School_code'];
const schoolAvatarPlaceHolder = 'https://cdn0.iconfinder.com/data/icons/driving-school-basic-lineal/512/20_Placeholder-512.png';

const AddSchoolDialog = ({ isOpen, isLoading, status, onHide, onAddSchool, ...props }) => {

  const [schoolInfor, setSchoolInfor] = useState({ photos: [] });
  // const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState({
    photos: false,
    cover: false,
    avatar: false
  });

  const handleAddSchool = () => {
    delete schoolInfor.placeId;
    onAddSchool(schoolInfor);
  };

  const renderAction = (
    <div className="d-flex justify-content-end">
      <Button onClick={onHide} variant="secondary mr-2">Cancel</Button>
      <Button
        onClick={handleAddSchool}
        variant="primary"
      >
        {isLoading &&
          <Spinner
            animation="border"
            size="sm"
          />
        }
        Add
      </Button>
    </div>
  );

  useEffect(() => {
    if (status === ADD_SCHOOL_SUCCESS) {
      setSchoolInfor({});
      onHide();
    }
  }, [status]);

  const onSelectPlace = (place) => {
    setSchoolInfor({ ...place });
  };

  const onChaneFormValue = e => {
    setSchoolInfor({
      ...schoolInfor,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const onUploadImage = async (e, key) => {
    setLoadingPhotos({ [key]: true });
    const checkKey = (key === 'photos') ? 'SCHOOL' : 'AVATAR';
    const file = (key === 'avatar') ? [e] : Object.values(e.target.files);
    try {
      const photos = await COMMON_ENDPOINT.UPLOAD_PHOTOS(file, checkKey);
      setSchoolInfor({ ...schoolInfor, [key]: photos });
      setLoadingPhotos({ [key]: false });
    } catch (error) {
      toast.error(error, { position: toast.POSITION.TOP_RIGHT });
      setLoadingPhotos({ [key]: false });
    }
  };

  const renderFormContent = () => {
    const schoolField = Object.keys(schoolInfor);

    return (
      <Form>
        <Form.Group>
          <Form.Label>Search location</Form.Label>
          <LocationSearchInput onSelectPlace={onSelectPlace} />
        </Form.Group>
        {
          schoolField.length > 1 ? (
            <>
              <Form.Group>
                <Form.Label className="text-center">School avatar</Form.Label>
                <UploadAvatar 
                  defaultAvatar={(schoolInfor.avatar && schoolInfor.avatar[0].thumb) || schoolAvatarPlaceHolder}  
                  isLoading={loadingPhotos.avatar}
                  loadingComponent={<Spinner animation="border" variant="primary" size="xl" />}
                  onSelectImage={(e) => onUploadImage(e, 'avatar')}
                />
              </Form.Group>
              {
                formField.map((item, index) => {
                  if (
                    item === 'Intro' || 
                    item === 'Education_programer' ||
                    item === 'Club'
                  ) {
                    return (
                      <Form.Group key={index}>
                        <Form.Label>{item}</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          onChange={onChaneFormValue}
                          name={item.toLocaleLowerCase()}
                          value={schoolInfor[item.toLocaleLowerCase()]} />
                      </Form.Group>
                    );
                  }
                  return (
                    <Form.Group key={index}>
                      <Form.Label>{item}</Form.Label>
                      <Form.Control
                        disabled={index === 1}
                        type="text"
                        onChange={onChaneFormValue}
                        name={item.toLocaleLowerCase()}
                        value={schoolInfor[item.toLocaleLowerCase()]} />
                    </Form.Group>
                  );
                })
              }
              <Form.Group>
                <Form.Label>Upload school photos</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => onUploadImage(e, 'photos')}
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                />
              </Form.Group>
              <div className="preview row">
                {
                  (schoolInfor.photos && schoolInfor.photos.length) ? schoolInfor.photos.map((uri, index) => (
                    <div className="preview-image col-6 p-2" key={index}>
                      <ImageWithFallback className="w-100" src={uri.thumb} />
                    </div>
                  )) : null
                }
              </div>
              {
                loadingPhotos.photos && <div className="d-flex justify-content-center py-3 w-100">
                  <Spinner animation="border" variant="primary" size="xl" />
                </div>
              }
              <Form.Group>
                <Form.Label>Upload school cover</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => onUploadImage(e, 'cover')}
                  multiple={false}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </Form.Group>
              <div className="preview row">
                {
                  (schoolInfor.cover && schoolInfor.cover.length) ? schoolInfor.cover.map((uri, index) => (
                    <div className="preview-image col-12 p-2" key={index}>
                      <ImageWithFallback className="w-100" src={uri.thumb} />
                    </div>
                  )) : null
                }
              </div>
              {
                loadingPhotos.cover && <div className="d-flex justify-content-center py-3 w-100">
                  <Spinner animation="border" variant="primary" size="xl" />
                </div>
              }
            </>
          ) : null
        }
      </Form>
    );
  };

  return (
    <BaseModal
      show={isOpen}
      onHide={onHide}
      title="Add new school"
      actions={renderAction}
      {...props}
    >
      {
        renderFormContent()
      }
    </BaseModal>
  );
};

AddSchoolDialog.propTypes = {
  isOpen: bool,
  onHide: func,
  onAddSchool: func,
  isLoading: bool,
  status: string,
};

const mapStateToProp = (store) => {
  return {
    isOpen: store.school.isOpen,
    isLoading: store.school.isLoading,
    status: store.school.status,
  };
};

export default connect(mapStateToProp, null)(memo(AddSchoolDialog));
