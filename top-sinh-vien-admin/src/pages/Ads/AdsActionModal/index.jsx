import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useActions } from 'hooks/useActions';

import BaseModal from 'components/BaseModal';
import ModalActions from 'components/ModalActions';
import DropZoneFile from 'components/DropZoneFile';
import { checkUpload } from 'utils/helper';
import { COMMON_ENDPOINT } from 'api/constant';
import { func, object, string, array } from 'prop-types';
import DatePicker from 'react-datepicker';
import SelectSearchBox from 'components/SelectSearchBox';
import { BANNER_CONSTANT } from 'constant';
import { addBannerAds, updateBannerAds } from 'store/ads/actions';
import { ADD_BANNER_ADS_SUCCESS, UPDATE_BANNER_ADS_SUCCESS } from 'store/ads/constant';

const initFormValue = {
  title: '',
  position: BANNER_CONSTANT.POSITION[0],
  screen: BANNER_CONSTANT.SCREEN[0],
  time_start: '',
  time_end: '',
  photos: [],
  link: ''
};

const datePickerProps = {
  timeIntervals: 15,
  timeCaption: 'Time',
  dateFormat: 'd/MM/yyyy h:mm aa'
};

const AdsActionModal = ({ allBannerType, onHide, adsItem, adsStatus, ...props }) => {
  const isEdit = adsItem && Object.values(adsItem).length;
  const [formValue, setFormValue] = useState(initFormValue);
  const [typeBanner, setTypeBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [delete_photo, setDeletePhotos] = useState(false);

  const [addBannerAdsAction, updateBannerAdsAction] = useActions([addBannerAds, updateBannerAds], null);
  const { title, photos, position, screen, id_type, link, time_start, time_end } = formValue;
  const allBannerTypeOption =
    allBannerType &&
    allBannerType.map(element => {
      return {
        ...element,
        label: element.name,
        value: element._id
      };
    });
  const formField = [
    {
      value: title,
      name: 'title',
      label: 'Tên quảng cáo'
    },
    {
      value: position,
      name: 'position',
      label: 'Vị trí'
    },
    {
      value: screen,
      name: 'screen',
      label: 'Màn hình'
    },
    {
      value: id_type,
      name: 'id_type',
      label: 'Thể loại banner'
    },
    {
      value: link,
      name: 'link',
      label: 'Liên kết'
    },
    {
      value: time_start,
      name: 'time_start',
      label: 'Ngày bắt đầu',
      showTime: true
    },
    {
      value: time_end,
      name: 'time_end',
      label: 'Ngày kết thúc',
      showTime: true
    }
  ];

  const onClearForm = cb => {
    setFormValue(initFormValue);
    setDeletePhotos(false);
    cb();
  };

  const onChangeForm = e => {
    const { name } = e.target;
    setFormValue({
      ...formValue,
      [name]: e.target.value
    });
  };

  const onChangeFile = (file, name) => {
    setFormValue({
      ...formValue,
      [name]: file
    });
  };
  const onSubmit = async () => {
    setLoading(true);
    try {
      let fileUpload = photos;
      if (photos.length) {
        if (checkUpload(photos)) fileUpload = await COMMON_ENDPOINT.UPLOAD_PHOTOS(photos, 'BANNER');
        else if (delete_photo) fileUpload = [];
        else {
          delete fileUpload[0].preview;
        }
      }
      const payload = {
        title,
        position: position.value,
        screen: screen.value,
        time_start,
        time_end,
        link,
        photos: fileUpload,
        id_type: typeBanner._id
      };
      if (!isEdit) addBannerAdsAction(payload);
      else
        updateBannerAdsAction({
          ...payload,
          id: adsItem._id
        });
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);
  };

  const onRemoveFile = () => {
    setDeletePhotos(true);
  };

  const onChangeData = (value, name) => {
    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const onChangeBannerType = value => {
    setTypeBanner(value);
  };

  useEffect(() => {
    if (adsStatus === ADD_BANNER_ADS_SUCCESS || adsStatus === UPDATE_BANNER_ADS_SUCCESS) onClearForm(onHide);
  }, [adsStatus]);

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        ...adsItem,
        time_start: new Date(adsItem.timeStart),
        time_end: new Date(adsItem.timeEnd),
        position: BANNER_CONSTANT.POSITION.find(item => item.value === adsItem.position),
        screen: BANNER_CONSTANT.SCREEN.find(item => item.value === adsItem.screen),
        photos:
          adsItem.photos && adsItem.photos.length && adsItem.photos.map(item => ({ ...item, preview: item.origin }))
      });
      setTypeBanner({
        _id: adsItem.idTypeBanner._id,
        label: adsItem.idTypeBanner.name,
        value: adsItem.idTypeBanner.name
      });
    }
  }, [adsItem]);

  const renderForm = () => {
    return (
      <Form>
        {formField.map((item, index) => {
          const typeText = item.name === 'link' || item.name === 'title';
          const datePicker = item.name === 'time_start' || item.name === 'time_end';
          const isSelectScreen = item.name === 'screen';
          const isSelectPosition = item.name === 'position';
          const isSelectTypeBanner = item.name === 'id_type';
          const formOption = isSelectPosition ? BANNER_CONSTANT.POSITION : BANNER_CONSTANT.SCREEN;
          return (
            <Form.Group className="d-flex flex-column" key={index}>
              <Form.Label>{item.label}</Form.Label>
              {typeText && (
                <Form.Control
                  type="text"
                  value={item.value}
                  name={item.name}
                  className="mb-3"
                  onChange={onChangeForm}
                />
              )}
              {datePicker && (
                <DatePicker
                  selected={item.value}
                  showTimeSelect={item.showTime}
                  {...datePickerProps}
                  className="form-control mb-3 w-100 d-block"
                  onChange={date => onChangeData(date, item.name)}
                />
              )}
              {(isSelectScreen || isSelectPosition) && (
                <SelectSearchBox
                  isMulti={false}
                  classes={'mb-3'}
                  keyValue="value"
                  onChange={data => onChangeData(data, item.name)}
                  value={formValue[item.name]}
                  options={formOption}
                />
              )}
              {isSelectTypeBanner && (
                <SelectSearchBox
                  isMulti={false}
                  classes={'mb-3'}
                  keyValue="value1"
                  onChange={data => onChangeBannerType(data)}
                  value={typeBanner}
                  options={allBannerTypeOption}
                />
              )}
            </Form.Group>
          );
        })}
        <Form.Label>Hình ảnh</Form.Label>
        <DropZoneFile images={photos} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'photos')} />
      </Form>
    );
  };

  return (
    <BaseModal
      onHide={onHide}
      title={`${isEdit ? 'Cập nhật quảng cáo' : 'Thêm mới đối tượng quảng cáo'}`}
      borderNone
      {...props}
      actions={
        <ModalActions
          onHide={() => onClearForm(onHide)}
          isLoading={loading}
          disabledOk={!photos.length || !typeBanner || !position || !screen}
          onOk={onSubmit}
        />
      }
    >
      {renderForm()}
    </BaseModal>
  );
};

AdsActionModal.propTypes = {
  onHide: func,
  adsItem: object,
  adsStatus: string,
  allBannerType: array
};

export default React.memo(AdsActionModal);
