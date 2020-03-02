import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

// AlbumHoder
import NavbarSearch from './navbarSearch';

// styles
import './Search.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const location = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11
};

const Search = props => {
  return (
    <>
      <NavbarSearch />
      <div className="wrapper-search-page">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCMWzy-qoy65Q7wkZBfnobX0iQ4JQkUNgQ' }}
          defaultCenter={location.center}
          defaultZoom={location.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default connect(state => state)(Search);
