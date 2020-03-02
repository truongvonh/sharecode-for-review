import React, { memo, useState, useEffect, useMemo } from 'react';
import { bool, func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Form, Spinner } from 'react-bootstrap';
import BaseModal from '../../../../components/BaseModal/index';
import { COMMON_ENDPOINT } from '../../../../api/constant';
import { toast } from 'react-toastify';
import UploadAvatar from '../UploadAvatar';
import ModalActions from '../../../../components/ModalActions';
import { connect } from 'react-redux';
import { editSchool } from '../../../../store/school/actions';
import './style.scss';
import { useSelector } from 'react-redux';
import { EDIT_SCHOOL_SUCCESS, EDIT_SCHOOL_PROGRESS } from '../../../../store/school/constant';

const formField = ['Name', 'Address', 'Club', 'Intro', 'Education programer', 'School code'];
const schoolAvatarPlaceHolder = 'https://cdn0.iconfinder.com/data/icons/driving-school-basic-lineal/512/20_Placeholder-512.png';
const schoolValue = ['name', 'address', 'club', 'intro', 'education_programer', 'school_code'];

const EditSchoolDialog = ({ isOpen, school, editSchool, onHide, ...props }) => {

  const schoolStatus = useSelector(store => store.school.status);
  const [schoolInfor, setSchoolInfor] = useState({});
  const [photosLoading, setPhotosLoading] = useState({
    photos: false,
    cover: false,
    avatar: false
  });

  useEffect(() => {
    if (schoolStatus === EDIT_SCHOOL_SUCCESS) onHide();
  }, [schoolStatus]);

  useEffect(() => {
    if (school) {
      const previewAvatar = (Array.isArray(school.avatar) && school.avatar.length) ? school.avatar[0].thumb : '';
      const school_code = school.school_code || school.schoolCode;
      const education_programer = school.education_programer || school.educationProgramer;
      setSchoolInfor({
        ...school,
        previewAvatar,
        education_programer,
        school_code,
        photos: school.photos || [],
        cover: school.cover || [],
        delete_photos: []
      });
    }
  }, [school]);

  const onChaneFormValue = e => {
    setSchoolInfor({
      ...schoolInfor,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  const onSelectImage = async (e, key) => {
    setPhotosLoading({ [key]: true });
    const checkKey = (key === 'photos') ? 'SCHOOL' : 'AVATAR';
    try {
      const photoAdded = await COMMON_ENDPOINT.UPLOAD_PHOTOS(Object.values(e.target.files), checkKey);
      setSchoolInfor({ 
        ...schoolInfor, 
        [key]: [...schoolInfor[key], ...photoAdded],
      });
      setPhotosLoading({ [key]: false });
    } catch (error) {
      toast.error(error, { position: toast.POSITION.TOP_RIGHT });
      setPhotosLoading({ [key]: false });
    }
  };

  const onUploadAvatar = async (file) => {
    setPhotosLoading({ avatar: true });
    try {
      const avatar = await COMMON_ENDPOINT.UPLOAD_PHOTOS([file], 'AVATAR');
      setSchoolInfor({ ...schoolInfor, avatar, previewAvatar: avatar[0].thumb });
      setPhotosLoading({ avatar: false });
    } catch (error) {
      setPhotosLoading({ avatar: false });
    }
  };

  const onRemovePhotos = (photo, key) => {
    const photos = schoolInfor[key].filter(item => item.thumb !== photo.thumb);
    const delete_photos = [...schoolInfor.delete_photos, photo];

    setSchoolInfor({
      ...schoolInfor,
      [key]: photos,
      delete_photos
    });
  };

  const onEditSchool = () => {
    const school_id = school._id;
    editSchool({ school_id, payload: schoolInfor });
  };

  const renderFormContent = () => {

    return (
      <Form>
        <>
          <Form.Group>
            <Form.Label className="text-center">School avatar</Form.Label>
            <UploadAvatar
              defaultAvatar={schoolInfor.previewAvatar || schoolAvatarPlaceHolder}
              onSelectImage={onUploadAvatar}
              isLoading={photosLoading.avatar}
              loadingComponent={<Spinner animation="border" variant="primary" size="xl" />}
            />
          </Form.Group>

          {
            schoolValue.map((item, index) => {
              if (index === 2 || index === 3 || index === 4) {
                return (
                  <Form.Group key={index}>
                    <Form.Label>{formField[index]}</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      name={item}
                      onChange={onChaneFormValue}
                      value={schoolInfor[item]} />
                  </Form.Group>
                );
              }
              return (
                <Form.Group key={index}>
                  <Form.Label>{formField[index]}</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={onChaneFormValue}
                    name={item}
                    value={schoolInfor[item]} />
                </Form.Group>
              );
            })
          }
          <Form.Group>
            <Form.Label>Upload school photos</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => onSelectImage(e, 'photos')}
              multiple
              accept="image/png, image/jpeg, image/jpg"
            />
          </Form.Group>
          <div className="preview row">
            {
              (schoolInfor.photos && schoolInfor.photos.length) ? schoolInfor.photos.map((item, index) => (
                <div className="preview-image col-6 p-2" key={index}>
                  <img className="w-100" src={item.thumb} />
                  <i onClick={() => onRemovePhotos(item, 'photos')} className="feather icon-trash light-color font-weight-bold" />
                </div>
              )) : null
            }
          </div>
          {
            photosLoading.photos && <div className="d-flex py-2 justify-content-center"><Spinner animation="border" variant="primary" size="xl" /></div>
          }
          <Form.Group>
            <Form.Label>Upload school cover</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => onSelectImage(e, 'cover')}
              multiple={false}
              accept="image/png, image/jpeg, image/jpg"
            />
          </Form.Group>
          <div className="preview row">
            {
              (schoolInfor.cover && schoolInfor.cover.length) ? schoolInfor.cover.map((item, index) => (
                <div className="preview-image col-12 p-2" key={index}>
                  <img className="w-100" src={item.thumb} />
                  <i onClick={() => onRemovePhotos(item, 'cover')} className="feather icon-trash light-color font-weight-bold" />
                </div>
              )) : null
            }
          </div>
          {
            photosLoading.cover && <div className="d-flex py-2 justify-content-center"><Spinner animation="border" variant="primary" size="xl" /></div>
          }
        </>
      </Form>
    );
  };

  const checkLoadingButton = useMemo(() => schoolStatus === EDIT_SCHOOL_PROGRESS, [schoolStatus]);

  return (
    <BaseModal
      show={isOpen}
      onHide={onHide}
      title="Edit school"
      actions={(
        <ModalActions
          onHide={onHide}
          onOk={onEditSchool}
          disabledOk={checkLoadingButton}
          isLoading={checkLoadingButton}
        />
      )}
      {...props}
    >
      {
        renderFormContent()
      }
    </BaseModal>
  );
};

EditSchoolDialog.propTypes = {
  isOpen: bool,
  onHide: func,
  editSchool: func,
  school: object,
  isLoading: bool,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators(
    {
      editSchool
    },
    dispatch
  )
);

export default connect(null, mapDispatchToProps)(memo(EditSchoolDialog));
