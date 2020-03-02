import React from 'react';
import { SCHOOL_ENDPOINT, SCHOOL_V2_ENDPOINT } from '../../constants/endpoints';
import Location from './LocationDetail';
import Head from 'components/common/head';
import LocationCard from 'components/LocationMap';
import { getNestedObjectSafe } from 'utils/helper';
import useInfinityScroll from 'hooks/useInfinityScroll';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';

import './style.scss';
import NoResultData from 'components/NoResultData';
import PlaceHolder from './components/place-horder';
import DataFound from 'components/dataFound';

const initPagination = {
  page: 1,
  limit: 10
};

const LocationCards = (id) => {
  const [locationNearSchool, setLocationNearSchool] = React.useState([]);
  const [schoolAbout, setSchoolAbout] = React.useState([]);
  const [idSchool, setIdSchool] = React.useState();
  const [pagination, setPagination] = React.useState(initPagination);
  const { page, limit } = pagination;
  const [loadMore, setLoadMore] = React.useState(true);
  const scrollParentRef = React.useRef({});
  const [isLoading,setIsLoading] = React.useState(true);

  const {
    isBottom
  } = useInfinityScroll(scrollParentRef, 300);

  const getSchoolAbout = async ({ university_id: university_id }) => {
    try {
      const data = await SCHOOL_ENDPOINT.SCHOOL_INFO({ university_id: university_id });
      setSchoolAbout(data);
    } catch (e) {
      console.log(e);
    }
  };


  const getLocationNearSchool = async ({ id = idSchool, page, limit, onScrollLoad = false, key = '' }) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await SCHOOL_V2_ENDPOINT.LOCATION_NEAR_SCHOOL({ id: id, page, limit, key });
      if (onScrollLoad) {
        setLocationNearSchool(prevData => [...prevData, ...data]);
        setPagination({ ...pagination, page });
        if (data.length < pagination.limit) setLoadMore(false);
        if (data.length > 0) setIsLoading(false);
      } else setLocationNearSchool(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isBottom && loadMore) {
      getLocationNearSchool({ page: pagination.page + 1, onScrollLoad: true });
    }
  }, [isBottom, loadMore]);

  React.useEffect(async () => {
    const url = window.location.href;
    const args = url.split('/');
    const id = args[args.length - 1];
    setIdSchool(id);
    await getSchoolAbout({ university_id: id });
    await getLocationNearSchool({ id: id, page: 1, limit: 10 });
  }, []);

  const [search] = useDebouncedCallback(async text => {
    setPagination({ ...pagination, page });
    if (text && text !== '') {
      setLoadMore(false);
      await getLocationNearSchool({
        id_school: id,
        key: text ? text : '' ,
        page : pagination.page
      });
    } else {
      setLoadMore(true);
      await getLocationNearSchool({ id_school: id , page : pagination.page , });
    }
  }, 1000);

  return (
    <div className="row">
      <Head title="Bản đồ"/>
      <div className="wrapper-location-card w-100 height-100 position-relative">
        <div className="wrapper-maps-item position-absolute">
          <LocationCard
            coordinate={getNestedObjectSafe(schoolAbout, ['school', 'coordinate'])}
            locationNearSchool={locationNearSchool}
          />
        </div>
        <div className="position-absolute col-4 px-0 ml-2 row">
          <div className="col-12 p-0 h-100 ">
            <div className="wrapper-card-location container p-4 ">
              <div className="wrapper-input-search-map pb-4 w-100 position-relative">
                <input
                  className="input-search fz-12 pr-4 py-3 form-control"
                  onChange={e => search(e.target.value)}
                  placeholder="Tìm kiếm..."
                />
                <img className="ic-search cursor-pointer position-absolute" src="/static/icons/ic_tim_kiem.svg" />
              </div>

              <div className="wrapper-card-location-detail w-100">
                <div className="p-3 location-map-wrapper" id="style-2"
                     style={{ height: 'calc(100vh - 180px)', overflowY: 'scroll' , margin : ' 0 -1.5em' }}
                     ref={scrollParentRef}>
                  <div
                     style={{ height: 'calc(100vh - 180px)' }}
                     ref={scrollParentRef}>
                    { (locationNearSchool.length) ?
                      locationNearSchool.map((item, index) =>
                        <Location
                            key={index}
                            avatar={item.avatar}
                            name={item.name}
                            address={item.address}
                            rating={item.rating}
                            school={item.school}
                            score={item.score}
                            index={index}
                            id={item._id}
                          />
                          ) :
                      !isLoading && <NoResultData />
                    }
                    { isLoading && <PlaceHolder/> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LocationCards;
