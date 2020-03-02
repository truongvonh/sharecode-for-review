import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore, { getOrCreateStore } from 'redux/withStore';
import withAuth from 'redux/auth/withAuth';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'locales/i18n';
import MainLayoutWrapper from 'layout/MainLayoutWrapper';
import { withRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'scss/style.scss';
import 'emoji-mart/css/emoji-mart.css';

import ProfileUniversityWrapper from 'layout/ProfileUniversityWrapper';
import dynamic from 'next/dynamic';
import NewsFeedWrapper from 'layout/NewsFeedWrapper';
import { closeLoading, openLoading } from 'redux/common/actions';
import ResultWrapper from 'layout/ResultWrapper';
import CampaignRoundWrapper from 'layout/CampaignRoundWrapper';
import ProfileUserWrapper from 'layout/ProfileUserWrapper';

import DetailSchoolWrapper from 'layout/DetailSchoolWrapper';
import MapWrapper from 'layout/MapWrapper';
import FirebaseHandler from 'utils/firebase';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';
import LoginForm from 'features/login/login_form';
import { checkIsDetailLocationPage, checkIsDetailSchoolPage } from 'utils/helper';
import DetailLocationWrapper from 'layout/DetailLocationWrapper';

const GlobalLoadingWrapper = dynamic(() => import('layout/GlobalLoadingWrapper'), { ssr: false });

const startChangeRouter = () => {
  const reduxStore = getOrCreateStore();
  reduxStore.dispatch(openLoading());
};
const endChangeRouter = () =>
  setTimeout(() => {
    const reduxStore = getOrCreateStore();
    reduxStore.dispatch(closeLoading());
  }, 1000);

// Router.events.on('routeChangeStart', startChangeRouter);
// Router.events.on('routeChangeComplete', endChangeRouter);

const TOASTIFY_OPTIONS = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true
};

class MyApp extends App {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  componentDidMount(): void {
    if (process.env.NODE_ENV === 'production') {
      FirebaseHandler.initialApp();
    }
  }

  render() {
    //   const { Component, pageProps, reduxStore, router = { pathname: '/profile-user' } } = this.props;
    const { Component, pageProps, reduxStore, router } = this.props;
    const isLandingPage = router.pathname === '/landing-page';
    const isNewFeedPage = router.pathname === '/news' || router.asPath.includes('news-detail');
    const isUserProfile = router.asPath.includes('profile-user');
    const isAlbumSchool = router.asPath.includes('album-school');
    const isStudentFollow = router.asPath.includes('student-follow');
    const isReviewDetail = router.asPath.includes('review-detail');
    const isUniversityProfile = router.asPath.includes('profile-university');
    const isGroup = router.asPath.includes('group');
    const isCampaignRound =
      router.asPath.includes('camapaign/kick-start') || router.asPath.includes('camapaign/knock-out');

    const isCampaignMatch = router.asPath.includes('camapaign/match');
    const isMapPage = router.pathname.includes('location-map');
    const isMapDetailPage = router.pathname.includes('location-map-detail');

    const isResultPage = router.asPath.includes('result');
    const { keyword, type } = router.query;
    const userIdQuery = isUserProfile ? router.query.user_id : '';
    const universityIdQuery = isUniversityProfile ? router.query.university_id : '';
    const reviewIdQuery = isReviewDetail ? router.query.review_id : '';
    const schoolIdQuery = isReviewDetail ? router.query.university_id : '';
    const groupType = isGroup ? router.query.type : '';
    const isDetailSchool = checkIsDetailSchoolPage(type);
    const isDetailLocation = checkIsDetailLocationPage(type);
    const idDetailSchoolQuery = isDetailSchool ? router.query.id : '';
    const idDetailLocationQuery = isDetailLocation ? router.query.id : '';

    return (
      <Container>
        <I18nextProvider i18n={i18n}>
          <Provider store={reduxStore}>
            {!isLandingPage ? (
              <>
                <GlobalLoadingWrapper />
                <ToastContainer {...TOASTIFY_OPTIONS} />
                {isMapPage || isMapDetailPage ? (
                  <MapWrapper>
                    <Component {...pageProps} />
                  </MapWrapper>
                ) : (
                  <MainLayoutWrapper ref={this.wrapperRef}>
                    {(isNewFeedPage || isGroup) && !isDetailSchool ? (
                      <NewsFeedWrapper isNewFeedPage={isNewFeedPage} isGroup={isGroup} groupType={groupType}>
                        <Component wrapperRef={this.wrapperRef} {...pageProps} />
                      </NewsFeedWrapper>
                    ) : isDetailSchool ? (
                      <DetailSchoolWrapper
                        isNewFeedPage={isNewFeedPage}
                        isGroup={isGroup}
                        groupType={groupType}
                        id_review={idDetailSchoolQuery}
                      >
                        <Component wrapperRef={this.wrapperRef} {...pageProps} />
                      </DetailSchoolWrapper>
                    ) : isDetailLocation ? (
                      <DetailLocationWrapper isNewFeedPage={isNewFeedPage} isGroup={isGroup} groupType={groupType} id_review={idDetailLocationQuery}>
                        <Component wrapperRef={this.wrapperRef} {...pageProps} />
                      </DetailLocationWrapper>
                    ) : isResultPage ? (
                      <ResultWrapper keyword={keyword}>
                        <Component wrapperRef={this.wrapperRef} {...pageProps} />
                      </ResultWrapper>
                    ) : isUserProfile ? (
                      <ProfileUserWrapper user_id={userIdQuery}>
                        <Component {...pageProps} />
                      </ProfileUserWrapper>
                    ) : isUniversityProfile || isReviewDetail ? (
                      <ProfileUniversityWrapper
                        university_id={universityIdQuery}
                        isAlbumSchool={isAlbumSchool}
                        isStudentFollow={isStudentFollow}
                        review_id={reviewIdQuery}
                        isReviewDetail={isReviewDetail}
                      >
                        <Component {...pageProps} />
                      </ProfileUniversityWrapper>
                    ) : isCampaignRound ? (
                      <CampaignRoundWrapper router={router}>
                        <Component wrapperRef={this.wrapperRef} {...pageProps} />
                      </CampaignRoundWrapper>
                    ) : (
                      <Component wrapperRef={this.wrapperRef} {...pageProps} />
                    )}
                  </MainLayoutWrapper>
                )}
              </>
            ) : (
              <Component {...pageProps} />
            )}
          </Provider>
        </I18nextProvider>
      </Container>
    );
  }
}

export default compose(withReduxStore, withAuth, withRouter)(MyApp);
