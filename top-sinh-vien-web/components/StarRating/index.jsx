import React, { memo } from 'react';
import { number } from 'prop-types';
import './style.scss';

const StarRating = ({ val }) => (
  <div className="rating" data-rating={Math.ceil(val)}>
    <div className="rating__item pr-2" />
    <div className="rating__item pr-2" />
    <div className="rating__item pr-2" />
    <div className="rating__item pr-2" />
    <div className="rating__item pr-2" />
  </div>
);
StarRating.propTypes = {
  val: number
};

export default memo(StarRating);
