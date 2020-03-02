import ImageWithFallback from 'components/ImageWithFallback';
import { getNestedObjectSafe } from 'utils/helper';
import SvgIcons from 'components/SvgIcons';
import React from 'react';
import { array, func, string } from 'prop-types';
import { NAVIGATE_URL } from 'constants/url';
import Link from 'next/link';

const LocationNearSchool = ({ item, handleClick, selectedItem, cancel, isSelect }) => {
  return (
    <div>
      <div className="icon-pin bounce " onClick={() => handleClick(item)}>
        <img src="/static/img/icon-location-near-school.png" />
      </div>
      {selectedItem && selectedItem._id === item._id && isSelect && (
        <div className="wrapper-item-card-place  d-flex p-2 shadow position-absolute" style={{ width: '350px' }}>
          <div className=" place-image  flex-shrink-0 ">
            <Link href={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(getNestedObjectSafe(item, ['_id']))}>
              <a>
                <ImageWithFallback
                  src={getNestedObjectSafe(selectedItem, ['avatar', 0, 'thumb'])}
                  alt="img-avatar"
                  className="place-image rounded-circle "
                />
              </a>
            </Link>
          </div>
          <div className="place-item col-8 ">
            <div>
              <Link href={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(getNestedObjectSafe(item, ['_id']))}>
                <a>
                  <div>
                    <h4 className="place-name font-weight-bold fz-14">{selectedItem.name}</h4>
                  </div>
                </a>
              </Link>
              <div>
                <Link href={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(getNestedObjectSafe(item, ['_id']))}>
                  <a>
                    <p className="small  text-secondary place-address  text-secondary fz-12">
                      Địa chỉ: {selectedItem.address}
                    </p>
                  </a>
                </Link>
              </div>
            </div>
            <div className="place-rank-star">
              <SvgIcons fileName="ic_rating_full" width={15} noHover height={15} />
              <p className="total-rating font-weight-bold">{selectedItem.rating}/5.0</p>
              <p className="total-user-rating ">{`( ${selectedItem.score || 0} )`}</p>
            </div>
            <div className="place-rank-star overviews">
              <SvgIcons fileName="ic_overview" width={15} noHover height={10} />
              <p className="graduate-result fz-12 font-weight-bold text-truncate">
                {selectedItem.school.length ? selectedItem.school.map(item => item && item.schoolCode).join('/') : ''}
              </p>
            </div>
          </div>
          <div className="position-relative float-right fz-18" onClick={() => cancel()}>
            <spans>X</spans>
          </div>
        </div>
      )}
    </div>
  );
};
LocationNearSchool.propTypes = {
  item: array,
  handleClick: func,
  selectedItem: array,
  cancel: func,
  isSelect: string
};

export default LocationNearSchool;
