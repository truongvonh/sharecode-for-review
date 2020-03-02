import React from 'react';
import './style.scss';
import WrapperLocaton from '../LocationDetail/components/WrapperLocationLeft';
import Location from './components/WrapperLocationCenter';
import LocationMap from './../LocationDetail/components/WrapperLocationRight';

const LocationReview = coordinate => {
  return (
    <div className="d-flex">
      <WrapperLocaton item={coordinate} />
      <Location item={coordinate} />
      <LocationMap item={coordinate} />
    </div>
  );
};

export default LocationReview;
