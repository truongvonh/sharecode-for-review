import React from 'react';
import { LOCATION_ENDPOINT, SCHOOL_ENDPOINT } from 'constants/endpoints';
import { shallowEqual, useSelector } from 'react-redux';
import i18n from 'locales/i18n';
import { Link } from 'routes/routesConfig';
import { Animated } from 'react-animated-css';
import dynamic from 'next/dynamic';
import 'layout/NewsFeedWrapper/style.scss';
import ImageWithFallback from 'components/ImageWithFallback';
import SchoolItem from 'components/SchoolItem';
import LocationItem from 'components/LocationItem';
import { element } from 'prop-types';
import { NAVIGATE_URL } from 'constants/url';
import { useActions } from 'hooks/useActions';
import { closeLoading, openLoading } from 'redux/common/actions';

const GlobalLoadingWrapper = dynamic(() => import('layout/GlobalLoadingWrapper'), { ssr: false });

export const { Provider: GroupProvider, Consumer: GroupConsumer } = React.createContext();

const MAX_COUNT_LIMIT = 4;

const NewsFeedWrapper = ({ children, isNewFeedPage, isGroup, groupType }) => {
  const [schools, setSchools] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const allGroups = useSelector(store => store.common.allGroups, shallowEqual);
  const [openLoadingAction, closeLoadingAction] = useActions([openLoading, closeLoading], null);

  const getAllSideBarInfor = async () => {
    try {
      const [schools, locations] = await Promise.all([
        SCHOOL_ENDPOINT.LIST_SCHOOL({ limit: MAX_COUNT_LIMIT }),
        LOCATION_ENDPOINT.LIST_LOCATION({ limit: MAX_COUNT_LIMIT })
      ]);

      if (schools.length) setSchools(schools);
      if (locations.length) setLocations(locations);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getAllSideBarInfor();
  }, []);

  const loadFunc = () => {
    openLoadingAction();
    setTimeout(() => {
      closeLoadingAction();
    }, 800);
  };
  return (
    <>
      <div className="container">
        <GlobalLoadingWrapper />
        <div className="row news-page">
          {allGroups.length > 0 && locations.length > 0 && (
            <aside className="position-fixed side-content col-lg-3 d-none d-lg-block pb-3">
              <Animated animationIn="bounceInUp" animationOut="zoomOutDown" isVisible={allGroups.length > 0}>
                <div className="main-group-wrapper bg-white rounded p-3 mb-3">
                  <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
                    {i18n.t('group')}
                  </h3>
                  <ul className="pl-0 m-0">
                    {allGroups.map((item, index) => (
                      <li key={index}>
                        <Link route={NAVIGATE_URL.GROUP_DETAIL_PAGE.URL(item.type)}>
                          <a className="d-flex py-2 align-items-center" onClick={() => loadFunc()}>
                            <div className="icon-group mr-2 flex-shrink-0">
                              <ImageWithFallback src={item.icon} alt={item.name} />
                            </div>
                            <p className="mb-0 fz-14 color-font text-wrap">{item.name}</p>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {isNewFeedPage && (
                  <div className="main-group-wrapper bg-white rounded p-3">
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
                )}
              </Animated>
            </aside>
          )}
          {isNewFeedPage && <div className="new-feed-wrapper col-12 pb-5 pb-lg-0 px-0 px-lg-2">{children}</div>}
          {isGroup && (
            <GroupProvider
              value={{
                groupType: groupType
              }}
            >
              <div className="new-feed-wrapper col-12 pb-5 pb-lg-0 px-0 px-lg-2">{children}</div>
            </GroupProvider>
          )}

          <aside className="position-fixed side-content col-lg-3 d-none d-lg-block right-position">
            <Animated
              animationIn="bounceInUp"
              animationOut="zoomOutDown"
              // isVisible={schools.length > 0}
            >
              {/*{isGroup && schools.length > 0 && (*/}
              {/*  <div className="main-group-wrapper bg-white rounded p-3 mb-3">*/}
              {/*    <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">*/}
              {/*      {i18n.t('suggest_friend')}*/}
              {/*    </h3>*/}
              {/*    <ul className="pl-0 m-0">*/}
              {/*      {schools.map((item, index) => (*/}
              {/*        <li key={index}>*/}
              {/*          <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(item._id)}>*/}
              {/*            <a>*/}
              {/*              <SchoolItem schoolData={item} />*/}
              {/*            </a>*/}
              {/*          </Link>*/}
              {/*        </li>*/}
              {/*      ))}*/}
              {/*    </ul>*/}
              {/*  </div>*/}
              {/*)}*/}

              {schools.length > 0 && (
                <div className="main-group-wrapper bg-white rounded p-3 mb-3">
                  <h3 className="fz-14 font-weight-bold color-font pb-3 mb-1 border-bottom text-uppercase">
                    {i18n.t('school')}
                  </h3>
                  <ul className="pl-0 m-0">
                    {schools.map((item, index) => (
                      <li key={index}>
                        <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(item._id)}>
                          <a>
                            <SchoolItem schoolData={item} />
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Animated>
          </aside>
        </div>
      </div>
    </>
  );
};

NewsFeedWrapper.propTypes = {
  children: element
};

export default NewsFeedWrapper;
