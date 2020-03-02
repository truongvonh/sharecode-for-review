import React from 'react';
import ImageWithFallback from 'components/ImageWithFallback';
import { object } from 'prop-types';
import { getNestedObjectSafe } from 'utils/helper';
import SvgIcons from 'components/SvgIcons';
import './style.scss';

const LocationItem = ({ location }) => {
  return (
    <div className="py-3 d-flex align-items-center overflow-hidden border-bottom border-light location-item">
      <div className="avatar flex-shrink-0">
        <ImageWithFallback src={getNestedObjectSafe(location, ['avatar', 0, 'thumb'])} alt={location.name} />
      </div>
      <div className="ml-2">
        <h3 className="fz-14 color-font text-wrap">{location.name}</h3>
        <p className="mb-0 text-secondary fz-12">{location.address}</p>
        <div className="d-flex align-items-center">
          <div className="icon">
            <SvgIcons fileName="ic_rating_full" width={15} height={15} />
          </div>
          <div className="point fz-14 font-weight-bold color-orange mt-1">
            <span className="pl-1">{location.rating}/5.0</span>
            <span className="text-secondary font-weight-normal fz-12 pl-2">{`( ${location.score || 0} )`}</span>
          </div>
        </div>
        <div className="is-near-school d-flex">
          <div>
            <SvgIcons fileName="ic_overview" width={15} height={10} />
          </div>
          {location.school.length > 0 && (
            <ul className="all-school-code pl-0 mb-0 d-flex align-items-center">
              {location.school.map((item, index) => (
                <span className="d-inline-block mx-1 color-main font-weight-bold" key={index}>
                  {item && item.schoolCode}
                  {item && index !== item.schoolCode.length - 1 && ','}
                </span>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

LocationItem.propTypes = {
  location: object
};

export default React.memo(LocationItem);
