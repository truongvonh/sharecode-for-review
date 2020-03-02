import React from 'react';
import GoogleMapReact from 'google-map-react';

import './style.scss';
import { getNestedObjectSafe } from 'utils/helper';

const LocationSchool = () => (
  <div className="icon-pin">
    <img src="/static/img/icon-location.png" />
  </div>
);

const LocationNearSchool = () => (
  <div className="icon-pin">
    <img src="/static/img/icon-location-near-school.png" />
  </div>
);

const LocationCard = ({ coordinate, locationNearSchool = '', zoom = 15 }) => {
  const center = {
    lat: coordinate && coordinate.latitude,
    lng: coordinate && coordinate.longitude
  };
  return (
    <>
      <div className="wrapper-maps">
        {coordinate && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyChKnYae52fQqtS2QCwr-vfh791sdB3bSo' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <LocationSchool lat={center.lat} lng={center.lng} />
            {locationNearSchool &&
              locationNearSchool.map((item, index) => (
                <LocationNearSchool
                  key={index}
                  lat={getNestedObjectSafe(item, ['coordinate', 'lat'])}
                  lng={getNestedObjectSafe(item, ['coordinate', 'lon'])}
                />
              ))}
          </GoogleMapReact>
        )}
      </div>
    </>
  );
};

export default LocationCard;
