// import React, { memo } from 'react';
// import { bool, string } from 'prop-types';
// import { LazyImage } from 'react-lazy-images';
// import './style.scss'
//
// const ImageWithFallback = ({ src, loading, ...props }) => (
//   <LazyImage
//     { ...props }
//     src={src}
//     debounceDurationMs={500}
//     placeholder={({ ref }) => <div ref={ref} className="intrinsic-item" />}
//     error={() => (<img src='https://via.placeholder.com/369'/>)}
//     loading={() => loading ? (<div className="d-flex justify-content-center align-items-center w-100 h-100">
//       {/*<img src="/static/img/ic_loading.gif"  alt="loading"/>*/}
//     </div>) : null }
//     actual={({ imageProps }) => (
//       <img {...imageProps} className="intrinsic-item animated fadeIn img-fluid" />
//     )}
//   />
// );
//
// ImageWithFallback.propTypes = {
//   loading: bool,
//   src: string
// };
//
// export default ImageWithFallback;

import React, { memo } from 'react';
import { string, number, bool } from 'prop-types';
import { LazyImage } from 'react-lazy-images';
import './style.scss';
import { FALLBACK_IMAGE_TYPE } from 'constants/common';

const ImageWithFallback = ({ src, className, loading = false, alt, fallbackType = FALLBACK_IMAGE_TYPE.AVATAR }) => (
  <LazyImage
    src={src || true}
    alt={alt}
    debounceDurationMs={loading && 500}
    placeholder={({ ref }) => <div ref={ref} className="intrinsic-item h-100" />}
    error={() =>
      fallbackType === FALLBACK_IMAGE_TYPE.AVATAR ? (
        <img alt={alt} className={className} src="/static/img/place-holder-avatar.jpg" />
      ) : fallbackType === FALLBACK_IMAGE_TYPE.COVER ? (
        <img alt={alt} className={className} src="https://via.placeholder.com/369" />
      ) : fallbackType === FALLBACK_IMAGE_TYPE.SCHOOL ? (
        <img alt={alt} className={className} src="/static/img/university_holder.png" />
      ) : fallbackType === FALLBACK_IMAGE_TYPE.REVIEW ? (
        <img alt={alt} className={className} src="/static/img/more-review.png" />
      ) : (
        ''
      )
    }
    loading={() =>
      loading ? (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <img src="/static/img/avatar-university.png" alt="loading" />
        </div>
      ) : null
    }
    actual={({ imageProps }) => (
      <img alt={alt} {...imageProps} className={`intrinsic-item animated fadeIn img-fluid ${className}`} />
    )}
  />
);

// ImageWithFallback
ImageWithFallback.propTypes = {
  src: string,
  alt: string,
  loading: bool,
  className: string,
  fallbackType: string,
  debounceDurationMs: number
};

export default memo(ImageWithFallback);
