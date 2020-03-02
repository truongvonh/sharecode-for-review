import React, { memo, useEffect, useMemo, useState } from 'react';
import { bool, func, object, string } from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import BaseModal from '../../../../components/BaseModal/index';
import LocationSearchInput from './../../../School/Components/AutoCompletePlace';
import {  useSelector, shallowEqual } from 'react-redux';
import {
  ADD_LOCATION_SUCCESS,
  GET_LOCATION_PROGRESS,
  GET_LOCATION_SUCCESS,
  UPDATE_LOCATION_SUCCESS
} from '../../../../store/location/constant';
import GoogleMapWrapper from 'components/GoogleMapWrapper';
import DropZoneFile from 'components/DropZoneFile';
import ModalActions from 'components/ModalActions';
import { checkUpload } from 'utils/helper';
import { COMMON_ENDPOINT } from 'api/constant';
import { useActions } from 'hooks/useActions';
import { addLocation, updateLocation } from 'store/location/actions';
import { forEach } from 'react-bootstrap/utils/ElementChildren';

const defaultPositon = {
  lat: -34.397,
  lng: 150.644
};
const SearchAddLocation = ({  onHide, locationItem, onAddLocation, ...props }) => {

  const addLocationStatus = useSelector(store => store.location.status, shallowEqual);
  const checkProgress = useMemo(() => addLocationStatus === GET_LOCATION_PROGRESS,[addLocationStatus]);
  const [addLocationAction, updateLocationAction] = useActions([addLocation, updateLocation], null);
  const [position, setPosition] = useState(defaultPositon);
  const [defaultCenter, setDefaultCenter] = useState(defaultPositon);

  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    name: '',
    address: '',
    description: '',
    website: '',
    photos: [],
    avatar: []
  });
  const [deleteFile, setDeleteFile] = useState({
    delete_photos: [],
    delete_avatar: []
  });
  const { name, address, description, website, photos, avatar } = formValue;
  const { delete_photos, delete_avatar } = deleteFile;
  const isEdit = locationItem && Object.values(locationItem).length;
  const allFormField = [
    {
      label: 'Tên địa điểm',
      name: 'name',
      value: name
    },
    {
      label: 'Địa chỉ',
      name: 'address',
      value: address
    },
    {
      label: 'Mô tả',
      name: 'description',
      value: description
    },
    {
      label: 'Website',
      name: 'website',
      value: website
    },
    {
      label: 'Hình ảnh',
      name: 'photos',
      value: photos
    },
    {
      label: 'Ảnh đại diện',
      name: 'avatar',
      value: avatar,
    }
  ];

  const onSelectPlace = ({ coordinate }) => {
    const { latitude: lat, longitude: lng } = coordinate;
    const position = { lng, lat };
    setPosition(position);
    setDefaultCenter(position);
  };

  const onSelectPosition = (e) => {
    const lat = e.latLng.lat(),
      lng = e.latLng.lng();

    setPosition({
      lat,
      lng
    });
  };

  const onChangeForm = (e) => {
    const { name } = e.target;
    setFormValue({
      ...formValue,
      [name]: e.target.value
    });
  };

  const onSetFile = (file, name) => {
    const result = (name === 'photos') ? [...formValue[name], file].flat() : file;

    setFormValue({
      ...formValue,
      [name]: result
    });
  };

  const onSetRemoveFile = (file, name, removeIndex) => {
    setDeleteFile({
      ...deleteFile,
      [name]: name === 'delete_photos' ? [...deleteFile[name], file] : file
    });

    const formName = name === 'delete_photos' && 'photos';
    if (formName)
      setFormValue({
        ...formValue,
        [formName]: [...formValue[formName]].filter((_, index) => index !== removeIndex)
      });
  };

  const onSubmit = async () => {
    let avatarUrl = [];
    let photoUrl = [];
    setLoading(true);
    try {

      if (photos.length) {
        const photoNotUpload = [];
        const photoUpload = photos.filter(item => {
          if (!item.origin) photoNotUpload.push(item);
          return item.origin;
        });

        photoUrl = photoNotUpload.length ?
          [...photoUpload, await COMMON_ENDPOINT.UPLOAD_PHOTOS(photoNotUpload, 'LOCATION')].flat() :
          photoUpload;
      }

      if (avatar.length) 
        avatarUrl = checkUpload(avatar) ?
          await COMMON_ENDPOINT.UPLOAD_PHOTOS(avatar, 'AVATAR') :
          avatar;

      const payLoad = {
        name,
        address,
        description,
        website,
        photos: photoUrl,
        avatar: avatarUrl,
        coordinate: {
          latitude: position.lat,
          longitude: position.lng
        }
      };

      if (isEdit) {
        if (delete_photos.length)
          delete_photos.forEach(item => delete item.preview);

        if (Object.values(delete_avatar).length)
          delete delete_avatar.preview;

        updateLocationAction({
          ...payLoad,
          id: locationItem._id,
          delete_avatar: Array.isArray(delete_avatar) ? delete_avatar : [delete_avatar],
          delete_photos
        });
      }
      else
        addLocationAction(payLoad);

    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const onClearItem = (cb) => {
    setTimeout(() => {
      setDefaultCenter(defaultPositon);
      setPosition(defaultPositon);
      setFormValue({
        name: '',
        address: '',
        description: '',
        website: '',
        photos: [],
        avatar: [],
      });
      setDeleteFile({
        delete_photos: [],
        delete_avatar: []
      });
    }, 500);
    setDeleteFile({});
    cb();
  };

  useEffect(() => {
    if (
      addLocationStatus === ADD_LOCATION_SUCCESS ||
      addLocationStatus === UPDATE_LOCATION_SUCCESS
    ) onClearItem(onHide);
  }, [addLocationStatus]);

  useEffect(() => {
    if (locationItem) {
      const position = {
        lat: locationItem.coordinate && locationItem.coordinate.lat,
        lng: locationItem.coordinate && locationItem.coordinate.lon
      };
      setDefaultCenter(position);
      setPosition(position);
      setFormValue({
        ...formValue,
        name: locationItem.name,
        address: locationItem.address,
        website: locationItem.website,
        description: locationItem.description,
        photos: (locationItem.photos && locationItem.photos.length) ?
          locationItem.photos.map(item => ({ ...item, preview: item.origin })) :
          [],

        avatar: (locationItem.avatar && locationItem.avatar.length) ?
          locationItem.avatar.map(item => ({ ...item, preview: item.origin })) :
          [],
      });
    }
  }, [locationItem]);

  const renderFormContent = () => {
    return allFormField.map((item, index) => {
      const isAvatarIndex = index === allFormField.length - 1;
      const isPhotosIndex = index === allFormField.length - 2;

      const nameDelete = isAvatarIndex ?
        'delete_avatar' :
        (isPhotosIndex && 'delete_photos');

      return (
        <div key={index}
             className={`${index !== allFormField.length - 1 && 'mb-3'}`}>
          <Form.Label>{item.label}</Form.Label>
          {  (isAvatarIndex || isPhotosIndex) ?
            <DropZoneFile multiple={isPhotosIndex}
                          images={item.value}
                          onRemoveFile={(file, index) => onSetRemoveFile(file, nameDelete, index)}
                          onChangFile={(file) => onSetFile(file, item.name)}/> :
            <Form.Control type="text"
                          value={item.value}
                          onChange={onChangeForm}
                          name={item.name}/> }
        </div>
      );
    });
  };

  const renderFormPosition = () => {
    return (
      <Form>
        <Form.Group>
          <div className="mb-4">
            <Form.Label>Tìm kiếm địa điểm</Form.Label>
            <LocationSearchInput  disabled={checkProgress}
                                  isProgress={checkProgress}
                                  onSelectPlace={onSelectPlace} />
          </div>

          <GoogleMapWrapper onClick={onSelectPosition}
                            defaultCenter={defaultCenter}
                            position={position}/>
        </Form.Group>
      </Form>
    );
  };

  return (
    <BaseModal  onHide={() => onClearItem(onHide)}
                title={`${isEdit ? 'Chỉnh sửa địa điểm' : 'Tạo mới địa điểm'}`}
                size="xl"
                borderNone={true}
                actions={(
                  <ModalActions onHide={() => onClearItem(onHide)}
                                isLoading={loading}
                                onOk={onSubmit} />
                )}
                {...props} >
      <Row>
        <Col sm={12} lg={6}>
          { renderFormPosition() }
        </Col>
        <Col sm={12} lg={6}>
          { renderFormContent() }
        </Col>
      </Row>
    </BaseModal>
  );
};

SearchAddLocation.propTypes = {
  isOpen: bool,
  onHide: func,
  onAddLocation: func,
  getLocation: func,
  isLoading: bool,
  status: string,
  locationItem: object
};

export default (memo(SearchAddLocation));
