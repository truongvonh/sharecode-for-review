import React from 'react';

import './style.scss';
import ImageWithFallback from 'components/ImageWithFallback';
import { array, func } from 'prop-types';

const AlbumGallery = ({ images = [], onImageSelect = () => null }) => {
  return (
    <div>
      <div className="row pt-2 px-1">
        {images.length > 0 &&
          images.map((item, index) => (
            <div
              className="col-4 p-0 px-1 py-1 cursor-pointer img-album-item"
              key={index}
              onClick={() => {
                onImageSelect('', item, index);
              }}
            >
              <ImageWithFallback alt="album-items" className="rounded img-album h-100 w-100" src={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

AlbumGallery.propTypes = {
  images: array,
  onImageSelect: func
};

export default AlbumGallery;
