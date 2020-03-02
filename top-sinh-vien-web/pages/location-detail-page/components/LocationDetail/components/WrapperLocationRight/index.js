import React from 'react';
import { Link } from 'routes/routesConfig';
import LocationCard from 'components/LocationCard';
import { GALLERY_TYPE, NO_DATA_PROFILE, OVERVIEW_SCHOOL_STATUS } from 'constants/common';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { ALBUM_PHOTOS_ENDPOINT } from 'constants/endpoints';
import { getNestedObjectSafe } from 'utils/helper';
import DataFound from 'components/dataFound';
import { Animated } from 'react-animated-css';
import { NAVIGATE_URL } from 'constants/url';

const WrapperLocation = (item) => {
  const id_location = getNestedObjectSafe(item, ['item', 'id']);
  const id_school =
    item.item && item.item.school && item.item.school.length ? item.item.school.map(item => item && item._id) : '';

  const [albumLocation, setAlbumLocation] = React.useState([]);
  const getAlbumLocation = async ({ id = id_location }) => {
    const arrAlbum = [];
    try {
      const data = await ALBUM_PHOTOS_ENDPOINT.ALBUM_LOCATION({ id:id  });
      data.map(
        item =>
          (getNestedObjectSafe(item, ['photos']) || []).length > 0 &&
          getNestedObjectSafe(item, ['photos']).map(image => arrAlbum.push(image))
      );
      setAlbumLocation(arrAlbum);
      // console.log('arrAlbum: ', arrAlbum);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getAlbumLocation({ id: id_location });
  }, [id_location]);

  return (
    <Animated
      animationIn="bounceInUp"
      animationOut="zoomOutDown"
      isVisible={true}
      className="col-3 location-map-detail d-none d-lg-block"
    >
      <div className="">
        <div className=" bg-white p-3 ">
          <div className="d-flex justify-content-between align-items-center border-bottom ">
            <p className="font-weight-bold fz-16 color-font">Khám phá trên bản đồ</p>
            <Link href={NAVIGATE_URL.LOCATION_MAP_PAGE.URL(getNestedObjectSafe(id_school ,[]))}>
              <a>
                <p className="fz-14 color-content-light cursor-pointer">Xem thêm</p>
              </a>
            </Link>
          </div>
          <div className=" pt-3">
            <Link>
              <a>
                <LocationCard
                  coordinate={item && item.item && item.item.coordinate }
                  // locationNearSchool={locationNearSchool}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className=" bg-white p-3 mt-4 ">
          <div className="d-flex justify-content-between border-bottom">
            <p className="font-weight-bold fz-16 color-font">
              Hình ảnh
              {/*({getNestedObjectSafe(schoolAbout, ['total_image'])})*/}
            </p>
            <Link href={NAVIGATE_URL.ALBUM_LOCATION_PAGE.URL(getNestedObjectSafe(id_location ,[]))}>
              <a>
                <p className="fz-14 color-content-light cursor-pointer">
                  Xem tất cả
                </p>
              </a>
            </Link>
          </div>
          <div className="pt-2">
            <div className="h-100">
              {(albumLocation && albumLocation.length === 0 && (
                <div className="d-flex justify-content-center align-items-center flex-column pt-2">
                  <ion-icon name="image" size="large"></ion-icon>
                  <p className="font-weight-bold fz-16 pt-2">{NO_DATA_PROFILE.PHOTO}!</p>
                </div>
              ))}
              <ImagesWithLightBox
                images={albumLocation && albumLocation.length > 0 && albumLocation.slice(0, 9)}
                typeGallery={GALLERY_TYPE.ALBUM}
              />
            </div>
          </div>
        </div>
      </div>
    </Animated>
  );
};

export default WrapperLocation;
