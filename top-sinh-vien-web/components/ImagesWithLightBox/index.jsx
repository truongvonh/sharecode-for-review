import React from 'react';
import dynamic from 'next/dynamic';
import Lightbox from 'react-image-lightbox';
import { array, string } from 'prop-types';
import { GALLERY_TYPE } from 'constants/common';
import AlbumGallery from 'components/AlbumGallery';
import AlbumSchool from 'components/AlbumSchool';
import AlbumLocation from 'components/AlbumLocation';
import GridGallery from 'components/GridGallery';

const ImagesWithLightBox = ({ images, typeGallery = GALLERY_TYPE.FACEBOOK }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const onSelectImage = (_, src, index) => {
    if (!isOpen) setOpen(!isOpen);
    setPhotoIndex(index);
  };

  const allImages =
    images && images.length > 0 && images.map(item => (item.hasOwnProperty('origin') ? item.origin : item));

  return (
    <>
      <div className={`gallery-wrapper bg-white ${typeGallery === GALLERY_TYPE.FACEBOOK ? 'bd-silver rounded overflow-hidden' : '' }`}>
        {typeGallery === GALLERY_TYPE.FACEBOOK ? (
          <GridGallery onImageSelect={onSelectImage} height={340} images={allImages} />
        ) : typeGallery === GALLERY_TYPE.ALBUM ? (
          <AlbumGallery onImageSelect={onSelectImage} images={allImages} />
        ) : typeGallery === GALLERY_TYPE.ALBUM_SCHOOL ? (
          <AlbumSchool onImageSelect={onSelectImage} images={allImages} />
        )  : typeGallery === GALLERY_TYPE.ALBUM_LOCATION ? (
          <AlbumLocation onImageSelect={onSelectImage} images={allImages} />
        ) : (
          <AlbumGallery onImageSelect={onSelectImage} images={allImages} />
        )}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={allImages[photoIndex]}
          nextSrc={allImages[(photoIndex + 1) % allImages.length]}
          prevSrc={allImages[(photoIndex + allImages.length - 1) % allImages.length]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % allImages.length)}
        />
      )}
    </>
  );
};

ImagesWithLightBox.propTypes = {
  images: array,
  typeGallery: string
};

export default React.memo(ImagesWithLightBox);
