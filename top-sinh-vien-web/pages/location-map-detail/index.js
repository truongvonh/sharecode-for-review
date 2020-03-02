import React, { useEffect, useState } from 'react';
import Head from 'components/common/head';
import LocationCard from 'components/LocationMapDetail';
import { getNestedObjectSafe } from 'utils/helper';
import { LOCATION_ENDPOINT } from 'constants/endpoints';

import './style.scss';

const LocationDetail = () => {
  const [location, setLocation] = React.useState();
  const [idLocation, setIdLocation] = React.useState();

  const getLocationDetail = async ({ id = idLocation }) => {
    try {
      const data = await LOCATION_ENDPOINT.DETAIL_LOCATION({ id: id });
      setLocation(data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const url = window.location.href;
    const args = url.split('/');
    const id = args[args.length - 1];
    setIdLocation(id);
    getLocationDetail({ id: id });
  }, []);

  console.log('location', location);

  return (
    <div className="row">
      <Head title="Bản đồ" />
      <div className="wrapper-location-card w-100 height-100">
        <div className="wrapper-maps-item position-absolute">
          <LocationCard coordinate={getNestedObjectSafe(location, ['coordinate'])} /> }
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
