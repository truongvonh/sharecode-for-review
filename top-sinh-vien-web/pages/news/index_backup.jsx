// import React from 'react';
// import Head from 'album-detail/common/head';
// import { NEW_FEED_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
// import { Button } from 'reactstrap';
// import NewFeedItem from 'album-detail/NewFeedItem';
// import PlaceHolder from 'album-detail/NewFeedItem/PlaceHolder';
// import InfiniteScroll from 'react-infinite-scroller';
// import { shallowEqual, useSelector } from 'react-redux';
// import i18n from 'locales/i18n';
// import SvgIcons from 'album-detail/SvgIcons';
// import './news.scss';
// import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
// import { toggleLoginModal } from 'redux/common/actions';
// import { useActions } from 'hooks/useActions';
// import newsHandler from 'pages/news/handler';
// import AffiliateCarouselPlaceHolder from 'pages/news/AffiliateCarousel/PlaceHolder';
// import AffiliateCarousel from 'pages/news/AffiliateCarousel';
// import AdsCarousel from 'pages/news/AdsCarousel';
//
// const MAX_LIMIT= 10;
// const FIRST_INDEX_ADS = 2;
// const INCREASE_NEXT_INDEX = 5;
//
// const News = () => {
//   const [newFeedData, setNewFeedData] = React.useState([]);
//   const [isLoadMore, setLoadMore] = React.useState(true);
//   const [last_index, setLastIndex] = React.useState('');
//   const [page, setPage] = React.useState(1);
//   const user = useSelector(store => store.auth.user, shallowEqual);
//   const toggleLoginMdAction = useActions(toggleLoginModal, null);
//   let tempIndexAds = 0;
//   const checkExistAdsArr = new Set([0]);
//
//   const {
//     affiliate,
//     affiliateLoading,
//
//     allAds,
//     adsLoading
//   } = newsHandler();
//
//   const listNewFeed = async ({ last_index = '', page = 1 }) => {
//     try {
//       const result = await NEW_FEED_ENDPOINT.LIST_NEW_FEED({ last_index, page });
//       setNewFeedData(prevData => [...prevData, ...result]);
//       const lastIndex = result.length - 1;
//       setLastIndex(result[lastIndex].last_id);
//       setPage(page + 1);
//       if (result.length < MAX_LIMIT) setLoadMore(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//
//   const fetchData = React.useCallback(async(nextPage) => {
//     // setTimeout(async () => {
//     if (isLoadMore) {
//       await listNewFeed({ last_index, page: nextPage });
//     }
//     // }, 500);
//   }, [last_index, newFeedData.length, isLoadMore, page]);
//
//   const onVoteDocument = async (type, document) => {
//     try {
//       if (!user) toggleLoginMdAction();
//       else {
//         const data = await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
//         if (data) {
//           const result = newFeedData.map(item => {
//             if (getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) === document) {
//               return { ...item, voted: !item.voted, totalVote: item.voted ? item.totalVote - 1 : item.totalVote + 1 };
//             }
//             return item;
//           });
//           setNewFeedData(result);
//         }
//       }
//     } catch (e) {
//       console.log('error', e);
//     }
//   };
//
//   // React.useEffect(() => {
//   //   alert(page);
//   // }, [page]);
//
//   const renderBannerAds = (indexAds) => {
//     // if (checkExistAdsArr[indexAds - 1])
//   };
//
//   return (
//     <>
//       <Head ogImage='/static/img/img_logo.png' title="Bảng tin"/>
//       { affiliateLoading && !affiliate.length ? (
//         <AffiliateCarouselPlaceHolder />
//       ) : <AffiliateCarousel items={affiliate} />
//       }
//       <div className="action-button d-flex align-items-center mb-4">
//         <Button className="text-uppercase text-white shadow fz-14 border-0 font-weight-bold bg-link py-3 w-50 border-0 mr-2 d-flex align-items-center justify-content-center">
//           <div className="mr-2">
//             <SvgIcons fileName="ic_pen" />
//           </div>
//           {i18n.t('new_post')}
//         </Button>
//         <Button className="text-uppercase text-white shadow fz-14 border-0 font-weight-bold bg-organe py-3 w-50 border-0 ml-2 d-flex align-items-center justify-content-center">
//           <div className="mr-2">
//             <SvgIcons fileName="ic_star_top" width={70} height={24} />
//           </div>
//           {i18n.t('new_review')}
//         </Button>
//       </div>
//       <InfiniteScroll pageStart={0}
//                       loadMore={fetchData}
//                       hasMore={isLoadMore}
//                       loader={ <PlaceHolder/> } >
//         { newFeedData.length > 0 && newFeedData.map((item, index) => {
//           const isDisplayAds =
//             index === FIRST_INDEX_ADS ||
//             (index > 0 && (index === ((tempIndexAds * INCREASE_NEXT_INDEX)+ FIRST_INDEX_ADS)));
//           if (isDisplayAds) {
//             tempIndexAds = tempIndexAds+1;
//           }
//
//           return (
//             <NewFeedItem newFeedItem={item}
//                          key={index}
//                          onVoteDocument={onVoteDocument}
//                          bannerAds={() => renderBannerAds(tempIndexAds)}
//                          user={user} />
//           );
//         }) }
//       </InfiniteScroll>
//     </>
//   );
// };
//
// export default News;
