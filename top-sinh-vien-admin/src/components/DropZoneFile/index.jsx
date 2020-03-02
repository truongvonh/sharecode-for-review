import React, { memo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Spinner } from 'react-bootstrap';
import ImgFolder from './../../assets/images/folder.png';
import ImgRemove from './../../assets/images/ic_remove.png';
import ImageWithFallback from '../ImageWithFallback';
import { array, bool, func } from 'prop-types';
import './style.scss';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 'auto',
  padding: 4,
  boxSizing: 'border-box',
  overFlow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  height: 'auto',
  objectFit: 'cover'
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const DropZoneFile = ({
  mimeType = 'image/*',
  images = {},
  multiple = false,
  onChangFile,
  onRemoveFile = () => null,
  isLoading }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (Object.values(images).length) {
      setFiles(images);
    } else {
      setFiles([]);
    }
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: mimeType,
    multiple,
    onDrop: async acceptedFiles => {
      const allPreviews = await Promise.all(acceptedFiles.map(file => {
        return toBase64(file);
      }));

      acceptedFiles.forEach((item, index) => {
        Object.assign(item, {
          preview: allPreviews[index]
        });
      });

      setFiles(acceptedFiles);
      onChangFile(acceptedFiles);
    }
  });

  const removeImage = index => {
    const result = files.filter((item, indexRemove) => indexRemove !== index);
    setFiles(result);
    onRemoveFile(files[index], index);
  };

  const thumbs = files.map((file, index) => {
    const checkPreviewFile = (Array.isArray(file.preview) && !file.preview.length) ? ImgFolder : file.preview;
    return (
      <div className="image-item position-relative"
           style={thumb}
           key={file.name}>
        <div onClick={() => removeImage(index)}
             className="remove-item d-flex align-items-center justify-content-center">
          <ImageWithFallback src={ImgRemove} />
        </div>
        <img src={checkPreviewFile} style={img} />
      </div>
    );
  });

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section
      className="dropzone-wrapper container py-4 bg-light rounded d-flex flex-column justify-content-center align-items-center"
      style={{ cursor: 'pointer' }}
    >
      <aside style={thumbsContainer}>{thumbs}</aside>
      <div {...getRootProps({ className: 'dropzone mt-4' })}>
        <input {...getInputProps()} />
        {(!files.length || multiple) && (
          <div className={`w-50 m-auto position-relative ${isLoading ? 'loading' : ''}`}>
            <ImageWithFallback src={ImgFolder} className="w-100" />
          </div>
        )}
      </div>
    </section>
  );
};

DropZoneFile.propTypes = {
  mimeType: array,
  multiple: bool,
  isLoading: bool,
  onChangFile: func,
  onRemoveFile: func,
  images: array
};

export default memo(DropZoneFile);
