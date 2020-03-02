/* eslint-disable react/jsx-key */
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { UPLOAD_IMAGE_ENDPOINT } from 'constants/endpoints';

import './style.scss';
import { FALLBACK_IMAGE_TYPE, TEXT_IMAGE_TYPE } from 'constants/common';
import { compressImageBeforeUpload } from 'utils/helper';
import { toast } from 'react-toastify';
import i18n from 'locales/i18n';

const ModalUploadMulti = ({
  buttonLabel,
  className,
  isMuti = true,
  toggle,
  isOpen,
  type,
  uploadImage,
  typeImage,
  textImage = TEXT_IMAGE_TYPE.AVATAR,
  onUploadFile = () => null,
  clearImage = false,
  ...props
}) => {
  const [file, setFile] = React.useState([]);
  const [fileUpload, setfileUpload] = React.useState([]);
  
  React.useEffect(() => {
    if (clearImage) setFile([]);
  }, [clearImage]);

  const uploadMultipleFiles = e => {
    const listFiles = Object.values(e.target.files);
    const result = listFiles.map((item, index) => ({ file: item, url: URL.createObjectURL(item) }));
    setFile(prevFile => (isMuti ? [...(prevFile || []), ...result] : result));
    setfileUpload(prevFile => (isMuti ? [...(prevFile || []), ...listFiles] : listFiles));
  };

  const delImage = index => {
    const newFile = [...file];
    newFile.splice(index, 1);
    setFile(newFile);
  };

  const uploadFiles = async ({ file, type }) => {
    try {
      const compressFile = await compressImageBeforeUpload({ image: file[0].file });
      const fileUploaded = await UPLOAD_IMAGE_ENDPOINT.UPLOAD_FILE({
        files: [compressFile],
        type: type
      });
      onUploadFile(fileUploaded);
    } catch (errorMessage) {
      toast.error(i18n.t(`error.${errorMessage}`));
    }
  };

  const onClickUpload = () => {
    uploadFiles({ file: file, type: type });
  };

  return (
    <div>
      <Modal {...props} isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} className="border-0">
          {textImage}
        </ModalHeader>
        <ModalBody>
          <div className="wrapper-multi-upload-img">
            <div className="form-group pb-2">
              <input
                id="multi"
                type="file"
                className="form-control border-0 d-none"
                onChange={uploadMultipleFiles}
                multiple={isMuti}
                accept="image/x-png,image/gif,image/jpeg"
              />
              <label htmlFor="multi">
                <ion-icon name="add"></ion-icon>
                <span className="font-weight-bold fz-16 text-upload">Chọn ảnh</span>
              </label>
            </div>

            <div className="form-group multi-preview d-flex flex-wrap">
              {(file || []).map((item, index) => (
                <div
                  className={`wrapper-img-upload ${
                    typeImage === FALLBACK_IMAGE_TYPE.AVATAR ? 'wrapper-img-upload-avatar' : 'wrapper-img-upload-cover'
                  }`}
                >
                  <img src={item.url} alt="img-preview" className="img-preview pl-2 pb-2 w-100 h-100" />
                  <lable
                    className="ic-delete font-weight-bold fz-24"
                    onClick={() => {
                      delImage(index);
                    }}
                  >
                    <ion-icon name="close-circle"></ion-icon>
                  </lable>
                </div>
              ))}
            </div>

            <button type="button" className="btn btn-danger btn-block" onClick={onClickUpload}>
              Upload
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalUploadMulti;
