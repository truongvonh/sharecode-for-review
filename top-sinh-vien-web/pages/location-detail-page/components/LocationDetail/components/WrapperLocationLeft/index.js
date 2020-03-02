import React from 'react';
import i18n from 'locales/i18n';
import { Link } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import LocationItem from 'components/LocationItem';
import { LOCATION_ENDPOINT, SCHOOL_V2_ENDPOINT } from 'constants/endpoints';
import { Animated } from 'react-animated-css';

const LocationWrapper = item => {
  const id_school =
    item.item && item.item.school && item.item.school.length ? item.item.school.map(item => item && item._id) : '';
  const [locations, setLocations] = React.useState([]);
  const [similarLocation, setSimilarLocation] = React.useState([]);
  const MAX_COUNT_LIMIT = 4;
  const getAllLocation = async () => {
    try {
      const data = await LOCATION_ENDPOINT.LIST_LOCATION({ limit: MAX_COUNT_LIMIT });
      setLocations(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getLocationNearBySchool = async ({ id = id_school, page, key = '' }) => {
    try {
      const data = await SCHOOL_V2_ENDPOINT.LOCATION_NEAR_SCHOOL({ id: id, page, limit: MAX_COUNT_LIMIT, key });
      setSimilarLocation(data);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getAllLocation();
    getLocationNearBySchool({ id: id_school });
  }, []);

  return (
    <Animated
      animationIn="bounceInUp"
      animationOut="zoomOutDown"
      isVisible={true}
      className="col-3 location-map-detail d-none d-lg-block"
    >
      <div className="">
        <div className=" bg-white rounded p-3 ">
          <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
            {i18n.t('Similar_location')}
          </h3>
          <ul className="pl-0 m-0">
            {similarLocation.map((item, index) => (
              <li key={index}>
                <Link route={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(item._id)}>
                  <a>
                    <LocationItem location={item} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className=" bg-white rounded p-3 mt-3 ">
          <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
            {i18n.t('suggest_location')}
          </h3>
          <ul className="pl-0 m-0">
            {locations.map((item, index) => (
              <li key={index}>
                <Link route={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(item._id)}>
                  <a>
                    <LocationItem location={item} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Animated>
  );
};

export default LocationWrapper;
