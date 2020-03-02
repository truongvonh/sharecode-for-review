import React, { memo } from 'react';
import Img from 'react-image';
import { string } from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

const ImageWithFallback = ({ src, ...props }) => (
  <VisibilitySensor>
    <Img {...props} src={[src, 'https://via.placeholder.com/369']} />
  </VisibilitySensor>
);

ImageWithFallback.propTypes = {
  src: string
};

export default memo(ImageWithFallback);
