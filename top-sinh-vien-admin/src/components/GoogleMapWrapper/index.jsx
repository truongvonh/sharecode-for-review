import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const googleMapKey = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`;
const disableDefaultControl = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
};

const defaultCenterDefault = { lat: -34.397, lng: 150.644 };
const positionDefault = defaultCenterDefault;

const MapWithAMarker = withScriptjs(withGoogleMap(({
  defaultCenter = defaultCenterDefault,
  position = positionDefault,
  ...props
}) => {

  return (
    <GoogleMap defaultZoom={8}
      center={defaultCenter}
      defaultOptions={disableDefaultControl}
      options={function (maps) { return { mapTypeId: "satellite" } }}
      {...props} >
      <Marker position={position} />
    </GoogleMap>
  );
}
));

const GoogleMapWrapper = ({ ...props }) => <MapWithAMarker
  googleMapURL={googleMapKey}
  loadingElement={<div style={{ height: '100%' }} />}
  containerElement={<div style={{ height: '400px' }} />}
  mapElement={<div style={{ height: '100%' }} />}
  {...props}
/>;

export default React.memo(GoogleMapWrapper);