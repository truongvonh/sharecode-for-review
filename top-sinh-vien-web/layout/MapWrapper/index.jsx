import React  from 'react';
import Header from 'components/Header';
import { element } from 'prop-types';
import './style.scss';

const MapWrapper = ({ children }, ref) => (
  <>
    <Header />
    <body className="map-wrapper  overflow-hidden h-100 w-100">
      <div className="wrapper-map-item">{ children }</div>
    </body>
  </>
);

MapWrapper.propTypes = {
  children: element
};

export default React.forwardRef(MapWrapper);
