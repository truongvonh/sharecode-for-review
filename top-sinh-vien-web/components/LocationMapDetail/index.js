import React from 'react';
import GoogleMapReact from 'google-map-react';

import './style.scss';

const LocationDetail = () => (
  <div>
    <div className="icon-pin-item bounce">
      <img src="/static/img/icon-location.png" />
    </div>
    <div className="pulse"></div>
  </div>
);

const LocationCard = ({ coordinate, zoom = 20 }) => {
  const center = {
    lat: coordinate && coordinate.latitude,
    lng: coordinate && coordinate.longitude
  };
  return (
    <>
      <div className="wrapper-maps-detail">
        {coordinate && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyChKnYae52fQqtS2QCwr-vfh791sdB3bSo' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <LocationDetail lat={center.lat} lng={center.lng} />
          </GoogleMapReact>
        )}
      </div>
    </>
  );
};

export default LocationCard;
