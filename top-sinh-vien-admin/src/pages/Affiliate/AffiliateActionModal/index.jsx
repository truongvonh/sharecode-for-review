import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useActions } from 'hooks/useActions';

import { addAffiliate, updateAffiliate } from 'store/affiliate/actions';
import BaseModal from 'components/BaseModal';
import ModalActions from 'components/ModalActions';
import DropZoneFile from 'components/DropZoneFile';
import { checkUpload } from 'utils/helper';
import { COMMON_ENDPOINT } from 'api/constant';
import { func, object } from 'prop-types';

const ActionAffiliateModal = ({ onHide, affiliateItem, ...props }) => {
  const isEdit = affiliateItem && Object.values(affiliateItem).length;
  const [formValue, setFormValue] = useState({
    name: '',
    photos: [],
    link: ''
  });
  const [loading, setLoading] = useState(false);
  const [delete_photos, setDeletePhotos] = useState(false);

  const [addAffiliateAction, updateAffiliateAction] = useActions([addAffiliate, updateAffiliate], null);

  const { name, photos, link } = formValue;
  const formField = [
    {
      value: name,
      name: 'name',
      label: 'Tên đối tác'
    },
    {
      value: link,
      name: 'link',
      label: 'Liên kết đối tác'
    }
  ];

  const onClearForm = cb => {
    setFormValue({
      name: '',
      photos: [],
      link: ''
    })
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
        if (checkUpload(photos)) fileUpload = await COMMON_ENDPOINT.UPLOAD_PHOTOS(photos, 'AFFILIATE');
        else if (delete_photos) fileUpload = [];
        else {
          delete fileUpload[0].preview
        }
      }

      const payload = {
        name,
        link,
        photos: fileUpload
      };

      if (!isEdit) addAffiliateAction(payload);
      else
        updateAffiliateAction({
          ...payload,
          id: affiliateItem._id,
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setLoading(false);

    onClearForm(onHide)
  };

  const onRemoveFile = removeFile => {
    setDeletePhotos(true);
  };

  useEffect(() => {
    if (affiliateItem) {
      setFormValue({
        ...formValue,
        name: affiliateItem.name,
        link: affiliateItem.link,
        photos:
          affiliateItem.photos && affiliateItem.photos.length
            ? affiliateItem.photos.map(item => ({ ...item, preview: item.origin }))
            : []
      });
    }
  }, [affiliateItem]);

  const renderForm = () => {
    return (
      <Form>
        {formField.map(item => (
          <>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control type="text" value={item.value} name={item.name} className="mb-4" onChange={onChangeForm} />
          </>
        ))}
        <Form.Label>Hình ảnh</Form.Label>
        <DropZoneFile images={photos} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'photos')} />
      </Form>
    );
  };

  return (
    <BaseModal
      onHide={onHide}
      title={`${isEdit ? 'Cập nhật dịch vụ liên kết' : 'Thêm mới dịch vụ liên kết'}`}
      borderNone
      {...props}
      actions={
        <ModalActions
          onHide={() => onClearForm(onHide)}
          isLoading={loading}
          disabledOk={!name || !link}
          onOk={onSubmit}
        />
      }
    >
      {renderForm()}
    </BaseModal>
  );
};

ActionAffiliateModal.propTypes = {
  onHide: func,
  affiliateItem: object
};

export default React.memo(ActionAffiliateModal);
