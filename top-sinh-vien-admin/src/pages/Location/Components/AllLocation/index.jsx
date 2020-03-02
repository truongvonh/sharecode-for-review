import React, { useState, memo, useEffect } from 'react';
import { array, func, object, number } from 'prop-types';
import { Table, Button, Badge } from 'react-bootstrap';
import './style.scss';
import BaseModal from 'components/BaseModal';
import AddNearSchool from '../AddNearSchool';
import useModal from 'hooks/useModal';
import ConfirmModal from 'components/ConfirmModal';
import ImageWithFallback from 'components/ImageWithFallback';
import { useSelector, shallowEqual } from 'react-redux';
import {
  ADD_ADS_LOCATION_SUCCESS,
  ADD_NEAR_SCHOOL_SUCCESS,
  ADD_TYPE_IN_LOCATION_SUCCESS
} from 'store/location/constant';
import { DELETE_LOCATION_SUCCESS } from 'store/location/constant';
import { _renderTitle } from 'utils/helper';
import { rendeTableHeader } from 'utils/renderUltil';
import ToolTipCustom from 'components/ToolTipCustom';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import SelectSearchBox from 'components/SelectSearchBox';
import ModalActions from 'components/ModalActions';
import SearchAddLocation from './../SearchAddLocation';
import { useActions } from 'hooks/useActions';
import { addAdsLocation } from 'store/location/actions';

const AddLocationTypeModal = ({
  addTypeInLocation,
  options,
  onHide,
  pushData,
  onChange,
  locationItem,
  keyLabel,
  ...props
}) => {
  const [allTypesId, setAllTypesId] = useState([]);

  const addTypeInLocationStatus = useSelector(store => store.location.status, shallowEqual);

  useEffect(() => {
    if (locationItem.locationType && locationItem.locationType.length) {
      const data = locationItem.locationType.map(item => ({ value: item._id, label: item.name }));
      setAllTypesId(data);
    }
  }, [locationItem]);

  useEffect(() => {
    if (addTypeInLocationStatus === ADD_TYPE_IN_LOCATION_SUCCESS) {
      onHide();
      setAllTypesId([]);
    }
  }, [addTypeInLocationStatus]);

  const onAddLocationType = e => {
    const id_location = locationItem._id;
    const id_type_location = allTypesId.map(item => item.value);
    addTypeInLocation({ id_location, id_type_location });
  };

  return (
    <BaseModal
      {...props}
      borderNone={true}
      size="md"
      onHide={onHide}
      actions={
        <ModalActions
          onHide={onHide}
          disabledOk={allTypesId ? !allTypesId.length : []}
          onOk={e => onAddLocationType(e)}
        />
      }
    >
      <SelectSearchBox
        isMulti
        options={options}
        value={allTypesId}
        onChange={e => setAllTypesId(e)}
        keyLabel={keyLabel}
      />
    </BaseModal>
  );
};

const headerField = ['No.', 'Ảnh đại diện', 'Tên', 'Địa chỉ', 'Trường học', 'Loại địa điểm', 'Tình trạng', 'Thao tác'];
const LABEL_COLORS = ['secondary', 'info', 'danger', 'success', 'warning', 'primary'];

const AllLocation = ({
  allTypes,
  allLocation,
  addTypeInLocation,
  indexNumber,
  allSchool,
  schoolRemove,
  addNearSchool,
  deleteLocation
}) => {
  const [addNearSchoolModal, setAddNearSchoolModal] = useState(false);
  const [locationItem, setLocationItem] = useState({});
  const [photos, setPhotos] = useState([]);
  const addAdsLocationAction = useActions(addAdsLocation, null);
  const filterStatus = useSelector(store => store.location.status, shallowEqual);

  const [isShowRemove, toggleRemoveModal, closeRemove] = useModal(false);
  const [openPhotosModal, setOpenPhotosModal, closePhotoModal] = useModal(false);
  const [openDeleteLocation, setOpenDeleteLocation, closeRemoveLocation] = useModal(false);
  const [openLocatinType, toggleLocationType, closeLocationType] = useModal(false);
  const [addAdsLocationStatus, toggleAddAdsMd, closeAddAdsMd] = useModal(false);
  const [editLocationMd, toggleLocationMd, closeLocationMd] = useModal(false);

  const [removeItem, setRemoveItem] = useState(null);
  const [locationRemove, setLocationRemove] = useState(null);
  const [isRevert, setRevert] = useState(false);

  const openMdCb = (item, cb) => {
    setLocationItem(item);
    cb();
  };

  const closeMd = cb => {
    setLocationItem({});
    cb();
  };

  const onCloseModal = () => {
    closePhotoModal();
    setPhotos([]);
  };

  const viewAllPhotos = photos => {
    setOpenPhotosModal();
    setPhotos(photos);
  };

  const onAddToNearSchool = item => {
    setAddNearSchoolModal(!addNearSchoolModal);
    setLocationItem(item);
  };

  const onCloseAddNearSchoolModal = () => {
    setAddNearSchoolModal(false);
    setLocationItem({});
  };

  const handleRemove = location_id => {
    toggleRemoveModal();
    setRemoveItem(location_id);
  };

  const removeSchoolFromLocation = () => {
    const id_school = schoolRemove.value;
    const id_location = removeItem._id;
    addNearSchool({ id_location, id_school, flag: false });
  };

  const onRemoveLocation = (location_id, isRevert) => {
    setLocationRemove(location_id);
    setRevert(isRevert);
    setOpenDeleteLocation();
  };

  const onSetLocationType = location => {
    setLocationItem(location);
    toggleLocationType();
  };

  useEffect(() => {
    if (filterStatus === ADD_NEAR_SCHOOL_SUCCESS) closeRemove();
  }, [filterStatus]);

  useEffect(() => {
    if (filterStatus === DELETE_LOCATION_SUCCESS) closeRemoveLocation();
  }, [filterStatus]);

  useEffect(() => {
    if (filterStatus === ADD_ADS_LOCATION_SUCCESS) closeAddAdsMd();
  }, [filterStatus]);

  const checkLocationDisplay = item => {
    return item.id_type && item.id_type.length ? (
      item.id_type.map((el, index) => (
        <Badge
          className="d-block mb-1 mr-1"
          onClick={() => onSetLocationType(item)}
          key={index}
          variant={LABEL_COLORS[index]}
        >
          {el.name}
        </Badge>
      ))
    ) : (
      <ButtonWithToolTip
        content="Add type for this location"
        icons="icon-airplay"
        onClick={() => onSetLocationType(item)}
      />
    );
  };

  const schoolLocationDisplay = item => {
    return item.school && item.school.length
      ? item.school.map((el, index) => {
          return (
            <ToolTipCustom key={index} content={el.name}>
              <Badge className="d-block mb-1 mr-1" variant={LABEL_COLORS[index + 1]}>
                {el.schoolCode}
              </Badge>
            </ToolTipCustom>
          );
        })
      : null;
  };

  const actionBtn = item =>
    schoolRemove && schoolRemove.value ? (
      <ToolTipCustom content="Xoá trường khỏi địa điểm này">
        <Button
          disabled={item.delete}
          variant="danger"
          onClick={() => handleRemove(item)}
          className="rounded-circle p-2 ml-2 d-flex justify-content-center align-items-center m-0"
        >
          <i className="feather mr-0 icon-alert-triangle" />
        </Button>
      </ToolTipCustom>
    ) : (
      <ToolTipCustom content="Thêm trường vào địa điểm này">
        <Button
          disabled={item.delete}
          variant="warning"
          onClick={() => onAddToNearSchool(item)}
          className="rounded-circle p-2 ml-2 d-flex justify-content-center align-items-center m-0"
        >
          <i className="feather mr-0 icon-map-pin" />
        </Button>
      </ToolTipCustom>
    );

  const renderAllLocation = locations => {
    const result = locations.length
      ? locations.map((item, index) => {
          return (
            <tr key={index}>
              <td className="align-middle" scope="row">
                {indexNumber + index + 1}
              </td>
              <td className="align-middle">
                <ImageWithFallback
                  src={item.avatar && item.avatar.length && item.avatar[0].thumb}
                  className="rounded-circle circle-image-avatar"
                  alt={item.name}
                />
              </td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">{_renderTitle(item.address)}</td>
              <td>{schoolLocationDisplay(item)}</td>
              <td
                className={`
            ${item.id_type && item.id_type.length ? 'align-middle' : 'd-flex align-items-center'} `}
              >
                {checkLocationDisplay(item)}
              </td>
              <td className={`align-middle ${!item.delete && 'font-weight-bold'}`}>
                <span className={`badge ${item.delete ? 'badge-danger' : 'badge-primary'} `}>
                  {item.delete ? 'deleted' : 'active'}
                </span>
              </td>
              <td className="d-flex align-items-center">
                <ToolTipCustom content="Xem hình ảnh">
                  <Button
                    variant="success"
                    disabled={item.check}
                    onClick={() => viewAllPhotos(item.photos)}
                    className="rounded-circle p-2 d-flex justify-content-center align-items-center m-0"
                  >
                    <i className="feather mr-0 icon-image" />
                  </Button>
                </ToolTipCustom>
                <ToolTipCustom content="Chỉnh sửa địa điểm">
                  <Button
                    variant="secondary"
                    disabled={item.delete}
                    onClick={() => openMdCb(item, toggleLocationMd)}
                    className="rounded-circle p-2 d-flex justify-content-center align-items-center ml-2 mb-0"
                  >
                    <i className="feather mr-0 icon-edit-2" />
                  </Button>
                </ToolTipCustom>
                <ToolTipCustom content={`${item.ads ? 'Xoá quảng cáo địa điểm' : 'Đặt quảng cáo địa điểm'}`}>
                  <Button
                    disabled={item.delete}
                    onClick={() => openMdCb(item, toggleAddAdsMd)}
                    className={`${
                      item.ads ? 'btn-theme' : 'theme-bg2'
                    } rounded-circle p-2 d-flex justify-content-center align-items-center ml-2 mb-0 border-0`}
                  >
                    <i className={`${item.ads ? 'feather mr-0 icon-delete' : 'feather mr-0 icon-star'}`} />
                  </Button>
                </ToolTipCustom>
                {
                  <ToolTipCustom content={item.delete ? 'Khôi phục địa điểm' : 'Xoá điạ điểm'}>
                    <Button
                      variant={item.delete ? 'primary' : 'danger'}
                      onClick={() => onRemoveLocation(item._id, item.delete)}
                      className="rounded-circle p-2 ml-2 d-flex justify-content-center align-items-center m-0"
                    >
                      <i className={`feather mr-0 ${item.delete ? 'icon-repeat' : 'icon-trash-2'} `} />
                    </Button>
                  </ToolTipCustom>
                }
                {actionBtn(item)}
              </td>
            </tr>
          );
        })
      : null;

    return <tbody>{result}</tbody>;
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderAllLocation(allLocation)}
      </Table>
      <AddLocationTypeModal
        keyLabel="name"
        options={allTypes}
        show={openLocatinType}
        title="Add location type"
        onHide={closeLocationType}
        addTypeInLocation={addTypeInLocation}
        locationItem={locationItem}
      />

      <AddNearSchool
        show={addNearSchoolModal}
        allSchool={allSchool}
        locationItem={locationItem}
        onHide={onCloseAddNearSchoolModal}
      />

      <ConfirmModal
        content="Are you sure to remove this school from location"
        onSelect={removeSchoolFromLocation}
        show={isShowRemove}
        onHide={closeRemove}
      />
      <ConfirmModal
        content={`${
          locationItem.ads
            ? 'Bạn có muốn xoá quảng cáo địa điểm này không'
            : 'Bạn có muốn đặt quảng cáo địa điểm này không'
        }`}
        onSelect={() => addAdsLocationAction({ id_location: locationItem._id })}
        show={addAdsLocationStatus}
        onHide={closeAddAdsMd}
      />

      <ConfirmModal
        content={isRevert ? 'Are you sure to restore this location' : 'Are you sure to remove this location'}
        show={openDeleteLocation}
        onHide={closeRemoveLocation}
        onSelect={() => deleteLocation({ location_id: locationRemove })}
      />

      <SearchAddLocation show={editLocationMd} locationItem={locationItem} onHide={() => closeMd(closeLocationMd)} />

      <BaseModal title="All locations photos" show={openPhotosModal} onHide={onCloseModal} borderNone={true} size="lg">
        <div className="gallery">
          {photos.length
            ? photos.map((item, index) => {
                return (
                  <div key={index} className="gallery-item rounded overflow-hidden">
                    <ImageWithFallback className="gallery-image" src={item.thumb} />
                  </div>
                );
              })
            : null}
        </div>
      </BaseModal>
    </>
  );
};

AllLocation.propTypes = {
  allLocation: array,
  allTypes: array,
  deleteLocation: func,
  addTypeInLocation: func,
  addNearSchool: func,
  allSchool: array,
  schoolRemove: object,
  indexNumber: number
};

export default memo(AllLocation);
