import React from 'react';
import { LOCATION_ENDPOINT } from 'constants/endpoints';
import { getNestedObjectSafe } from 'utils/helper';
import Head from 'components/common/head';
import BannerLocation from 'pages/location-detail-page/components/banner';
import AlbumDetail from 'pages/album-location/album-detail/index';

import './style.scss';

const albumLocation = () => {
    const [location,setLocation] = React.useState();
    const [idLocation,setIdLocation] = React.useState();
    const [total , setTotal] = React.useState();
    const getLocationDetail = async ({ id = idLocation }) => {
      try {
        const data = await LOCATION_ENDPOINT.DETAIL_LOCATION({ id:id });
        setLocation(data);
      } catch (e) {
        console.log(e);
      }
    };

    const getReview = async ({ id = idLocation , page , rating }) => {
      try {
        const result = await LOCATION_ENDPOINT.LOCATION_REVIEW({ id: id, page: page, rating: rating });
        setTotal(getNestedObjectSafe(result, ['total']));
      } catch (e) {
        console.log(e);
      }
    } ;

    React.useEffect(()=>{
      const url = window.location.href;
      const args = url.split('/');
      const id = args[args.length - 1];
      setIdLocation(id);
      getLocationDetail({ id:id });
      getReview({ id : id });
    },[]);

  return (
    <>
      <div className=" row h-100 location-album">
        { location && <Head title={`Album ảnh review ${getNestedObjectSafe(location,['name'])}`}/>}
        <div className=" col-12 pr-0 pl-0" >
          <div >
            { location &&  < BannerLocation item = { getNestedObjectSafe(location,['name'])}
                                            id={getNestedObjectSafe(location,['_id'])}
                                            avatar = {getNestedObjectSafe(location,['avatar'])}
                                            photo = {getNestedObjectSafe(location,['photos'])}
                                            address ={ getNestedObjectSafe(location,['address'])}
                                            locationType = { getNestedObjectSafe(location,['locationType'])}
                                            school = { getNestedObjectSafe(location,['school'])}
                                            score = {getNestedObjectSafe(location,['score'])}
                                            avgRating = {getNestedObjectSafe(location,['avgRating'])}
                                            total_review_location = {getNestedObjectSafe(location,['total_review_location'])}
                                            total = {total}

          />
          }
          </div>
          <div className="pt-3 ">
            { location && <AlbumDetail id = {getNestedObjectSafe(location,['_id'])}/> }
          </div>
        </div>
      </div>
    </>
  );
};

export default albumLocation;
