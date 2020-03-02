import React, { memo, createRef } from 'react';
import { func, array, string, bool, element } from 'prop-types';
import './style.scss';
import { toast } from 'react-toastify';

const onChangeFile = onSelectImage => event => {
  try {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      onSelectImage(file, reader.result);
    };
    reader.readAsDataURL(file);
  } catch (e) {
    return toast.error('Oops! something error.');
  }
};

const UploadAvatar = ({ defaultAvatar, isLoading, loadingComponent, onSelectImage, disableEdit }) => {
  const inputRef = createRef();

  const onSelectFile = () => {
    inputRef.current.click();
    document.getElementById('file-input').addEventListener('change', onChangeFile(onSelectImage));
  };

  return (
    <div className="upload-avatar text-center">
      <img src={defaultAvatar} />
      { isLoading && loadingComponent }
      <span
        className={`cursor-pointer upload-btn ${(disableEdit || isLoading) && 'd-none'} `}
        onClick={onSelectFile}
      >
        <i className="feather icon-edit-2" />
      </span>
      <input ref={inputRef} multiple={false} accept="image/png, image/jpeg, image/jpg" type="file" id="file-input" />
    </div>
  );
};

UploadAvatar.propTypes = {
  mimes: array,
  onSelectImage: func,
  defaultAvatar: string,
  disableEdit: bool,
  isLoading: bool,
  loadingComponent: element,
};

UploadAvatar.defaultProps = {};

export default memo(UploadAvatar);
