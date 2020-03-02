import React from 'react';
import ImageWithFallback from 'components/ImageWithFallback';
import { array, func } from 'prop-types';

import './style.scss';

const AlbumLocation = ({ images = [], onImageSelect = () => null }) => {
  return (
    <div className="" >
      <div className="d-flex flex-wrap w-100 wrapper-album-school px-1 py-1">
        {images.length > 0 &&
        images.map((item, index) => (
          <div
            className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0 px-1 py-1 cursor-pointer wrapper-image"
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

AlbumLocation.propTypes = {
  images: array,
  onImageSelect: func
};

export default AlbumLocation;
