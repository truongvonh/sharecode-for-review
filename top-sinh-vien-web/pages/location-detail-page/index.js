import React, { useEffect, useState } from 'react';
import Head from 'components/common/head';
import { LOCATION_ENDPOINT } from 'constants/endpoints';
import BannerLocation from './components/banner/index';
import { getNestedObjectSafe } from 'utils/helper';

import './style.scss';
import LocationReview from 'pages/location-detail-page/components/LocationDetail/index';

const LocationDetail = ({ locationDetail, location_id }) => {
  const [location, setLocation] = React.useState();
  const [idLocation, setIdLocation] = React.useState();
  const [total, setTotal] = React.useState();
  const getLocationDetail = async ({ id = idLocation }) => {
    try {
      const data = await LOCATION_ENDPOINT.DETAIL_LOCATION({ id: id });
      setLocation(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getReview = async ({ id = idLocation, page, rating }) => {
    try {
      const result = await LOCATION_ENDPOINT.LOCATION_REVIEW({ id: id, page: page, rating: rating });
      setTotal(getNestedObjectSafe(result, ['total']));
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
    getReview({ id: id });
  }, []);

  return (
    <>
      <div className=" row h-100 detail-location">
        {locationDetail && <Head title={`Chi tiết địa điểm ${getNestedObjectSafe(locationDetail, ['name'])}`} />}
        <div className=" col-12 location-detail-page">
          <div>
            {locationDetail && (
              <BannerLocation
                item={getNestedObjectSafe(locationDetail, ['name'])}
                id={getNestedObjectSafe(locationDetail, ['_id'])}
                avatar={getNestedObjectSafe(locationDetail, ['avatar'])}
                photo={getNestedObjectSafe(locationDetail, ['photos'])}
                address={getNestedObjectSafe(locationDetail, ['address'])}
                locationType={getNestedObjectSafe(locationDetail, ['locationType'])}
                school={getNestedObjectSafe(locationDetail, ['school'])}
                score={getNestedObjectSafe(locationDetail, ['score'])}
                avgRating={getNestedObjectSafe(locationDetail, ['avgRating'])}
                total_review_location={getNestedObjectSafe(locationDetail, ['total_review_location'])}
                total={total}
              />
            )}
          </div>
          <div className="pt-3 ">
            {locationDetail && (
              <LocationReview
                coordinate={getNestedObjectSafe(locationDetail, ['coordinate'])}
                id={getNestedObjectSafe(locationDetail, ['_id'])}
                school={getNestedObjectSafe(locationDetail, ['school'])}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

LocationDetail.getInitialProps = async res => {
  const { location_id } = res.query;
  let locationDetail = {};
  try {
    locationDetail = await LOCATION_ENDPOINT.DETAIL_LOCATION({ id: location_id });
  } catch (e) {
    console.log('error location detail', e);
  }
  return {
    locationDetail,
    location_id
  };
};

export default LocationDetail;
