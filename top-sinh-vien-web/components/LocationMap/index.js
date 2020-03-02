import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.scss';
import './../LocationMap/styles.scss';
import { getNestedObjectSafe } from 'utils/helper';
import LocationNearSchool from './locationNearSchool';

const LocationSchool = () => (
  <div>
    <div className="icon-pin-item bounce">
      <img src="/static/img/icon-location.png" />
    </div>
    <div className="pulse"></div>
  </div>
);

const LocationCard = ({ coordinate, locationNearSchool = '', zoom = 16 }) => {
  const [selected, setSelected] = useState(null);
  const [isSelect, setIsSelect] = useState(false);

  const handleClick = item => {
    setSelected(item);
    setIsSelect(true);
    return item;
  };

  const cancel = () => {
    setIsSelect(false);
  };

  const center = {
    lat: coordinate && coordinate.latitude,
    lng: coordinate && coordinate.longitude
  };
  return (
    <>
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
                item={item}
                cancel={cancel}
                handleClick={handleClick}
                selectedItem={selected}
                isSelect={isSelect}
                lat={getNestedObjectSafe(item, ['coordinate', 'lat'])}
                lng={getNestedObjectSafe(item, ['coordinate', 'lon'])}
              />
            ))}
        </GoogleMapReact>
      )}
    </>
  );
};

export default LocationCard;
