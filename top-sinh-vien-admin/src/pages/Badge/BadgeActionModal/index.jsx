import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useActions } from 'hooks/useActions';
import BaseModal from 'components/BaseModal';
import ModalActions from 'components/ModalActions';
import DropZoneFile from 'components/DropZoneFile';
import { checkUpload } from 'utils/helper';
import { COMMON_ENDPOINT } from 'api/constant';
import { func, object, string } from 'prop-types';
import { updateBadge } from 'store/badge/actions';
import { shallowEqual, useSelector } from 'react-redux';
import { EDIT_BADGE_SUCCESS } from 'store/badge/constant';
import { BADGE_TYPE } from 'constant';

const initValue = {
  name: '',
  point: 0,
  day_count: 0,
  comment_count: 0,
  badge_type: '',
  photos: []
};
const BadgeActionModal = ({ onHide, badgeItem, ...props }) => {
  const isEdit = badgeItem && Object.values(badgeItem).length;
  const [formValue, setFormValue] = useState(initValue);

  const {  name, point, day_count, comment_count, photos, badge_type } = formValue;
  
  const [delete_photos, setDeletePhotos] = useState([]);
  const badgeStatus = useSelector(store => store.badge.status, shallowEqual);
  const [loading, setLoading] = useState(false);
  
  const formField = [
    {
      label: 'Tên huy hiệu',
      name: 'name',
      value: name,
    },
    {
      label: 'Số ngày đạt huy ',
      name: 'day_count',
      value: day_count,
    },
    {
      label: 'Số điểm đạt huy hiệu',
      name: 'point',
      value: point,
    },
    {
      label: 'Số bình luận để đạt huy hiệu',
      name: 'comment_count',
      value: comment_count,
    },
    {
      label: 'Chọn hình ảnh ',
      name: 'photos',
      value: photos,
    },
  ];

  const [
    updateBadgeAction
  ] = useActions([updateBadge], null);

  const onClearForm = (cb) => {
    setFormValue(initValue);
    setDeletePhotos([]);
    cb();
  };

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: name === 'name' ? value : Number(value)
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
      let fileUpload = [];
      const deletedFileUpload = delete_photos.length ?
        delete_photos.map(item => {
          if (item.hasOwnProperty('preview')) delete item.preview;
          return item;
        }) :
        [];

      if (photos.length && !fileUpload.length)
        fileUpload = checkUpload(photos) ?
          await COMMON_ENDPOINT.UPLOAD_PHOTOS(photos,'BANNER') :
          photos;

      updateBadgeAction({
        ...formValue,
        id: badgeItem._id,
        photos: fileUpload,
        delete_photos: deletedFileUpload
      });

    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setLoading(false);
  };

  const onRemoveFile = (removeFile) => {
    setDeletePhotos([removeFile]);
  };

  useEffect(() => {
    if (
      badgeStatus === EDIT_BADGE_SUCCESS
    ) onClearForm(onHide);
  }, [badgeStatus]);

  useEffect(() => {
    if (badgeItem) {
      setFormValue({
        ...badgeItem,
        day_count: badgeItem.criteria && badgeItem.criteria.dayCount,
        comment_count: badgeItem.criteria && badgeItem.criteria.commentCount,
        photos: (badgeItem.photos && badgeItem.photos.length ) ?
          badgeItem.photos.map(item => ({ ...item, preview: item.origin })) : []
      });
    }
  }, [badgeItem]);
  
  const renderFormField = (formField) => {
    return (
      formField.map((item, index) => {
        const checkType = (item.name === 'name') ? 'text' : 'number';
        const checkTypeRaking = (badgeItem.badge_type === BADGE_TYPE.BEST_RANKING)
          && (
            item.name === 'comment_count' ||
            item.name === 'day_count'
          );

        const checkActive = (badgeItem.badge_type === BADGE_TYPE.ACTIVE) && (
          item.name === 'point' ||
          item.name === 'comment_count'
        );

        const checkComment = (badgeItem.badge_type === BADGE_TYPE.COMMENT_TOP) && (
          item.name === 'point'
        );

        return (
          <Form.Group key={index}>
            <Form.Label>{item.label}</Form.Label>
            { (index === formField.length - 1) ? (
              <DropZoneFile images={photos}
                            onRemoveFile={onRemoveFile}
                            onChangFile={(file) => onChangeFile(file, item.name)}/>
            ) : (
              <Form.Control name={item.name}
                            type={checkType}
                            disabled={checkTypeRaking || checkActive || checkComment}
                            onChange={onChangeForm}
                            value={item.value}/>
            ) }
          </Form.Group>
        );
      })
    );
  };

  return (
    <BaseModal onHide={onHide}
               title={`${isEdit ? 'Cập nhật huy hiệu' : 'Thêm mới huy hiệu'}`}
               borderNone
               {  ...props }
               actions={<ModalActions onHide={() => onClearForm(onHide)}
                                      isLoading={loading}
                                      disabledOk={!photos.length}
                                      onOk={onSubmit}/>}>
      {renderFormField(formField)}
    </BaseModal>

  );
};

BadgeActionModal.propTypes = {
  onHide: func,
  badgeItem: object,
  badgeStatus: string
};

export default React.memo(BadgeActionModal);
