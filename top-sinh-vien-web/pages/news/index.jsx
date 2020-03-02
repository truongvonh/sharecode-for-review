import React, { useMemo } from 'react';
import Head from 'components/common/head';
import { NEW_FEED_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import { Button } from 'reactstrap';
import NewFeedItem from 'components/NewFeedItem';
import PlaceHolder from 'components/NewFeedItem/PlaceHolder';
import InfiniteScroll from 'react-infinite-scroller';
import { shallowEqual, useSelector } from 'react-redux';
import i18n from 'locales/i18n';
import SvgIcons from 'components/SvgIcons';
import './news.scss';
import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
import { toggleLoginModal } from 'redux/common/actions';
import { useActions } from 'hooks/useActions';
import newsHandler from 'pages/news/handler';
import AffiliateCarouselPlaceHolder from 'pages/news/AffiliateCarousel/PlaceHolder';
import AffiliateCarousel from 'pages/news/AffiliateCarousel';
import { Link } from 'routes/routesConfig';
import usePrevious from 'hooks/usePrevious';
import ImageWithFallback from 'components/ImageWithFallback';
import useModal from 'hooks/useModal';
import PopupModalDownload from 'components/PopupModalDownload';

const MAX_LIMIT = 10;
const FIRST_INDEX_ADS = 2;
const INCREASE_NEXT_INDEX = 5;

const News = () => {
  const [newFeedData, setNewFeedData] = React.useState([]);
  const [isLoadMore, setLoadMore] = React.useState(true);
  const [last_id, setLastIndex] = React.useState('');
  const [page, setPage] = React.useState(1);
  const user = useSelector(store => store.auth.user, shallowEqual);
  const toggleLoginMdAction = useActions(toggleLoginModal, null);
  let tempIndexAds = 0;
  const [isShowingDownload, toggleDownload, closeDonwload] = useModal(false);
  const previousPage = usePrevious(page);

  const {
    affiliate,
    affiliateLoading,

    allAds,
  } = newsHandler();

  const listNewFeed = async ({ last_id = '', page = 1 }) => {
    try {
      const result = await NEW_FEED_ENDPOINT.LIST_NEW_FEED_V2({ last_id, page });
      setNewFeedData(prevData => [...prevData, ...result]);
      const lastIndex = result.length - 1;
      setLastIndex(result[lastIndex].last_id);
      setPage(page + 1);
      if (result.length < MAX_LIMIT) setLoadMore(false);
    } catch (e) {
      if (e === 'TOKEN_INVALID') {
        const result = await NEW_FEED_ENDPOINT.LIST_NEW_FEED_V2({ last_id, page, customHeader: {} });
        setNewFeedData(prevData => [...prevData, ...result]);
        const lastIndex = result.length - 1;
        setLastIndex(result[lastIndex].last_id);
        setPage(page + 1);
      }
    }
  };

  const fetchData = React.useCallback(async (_) => {
    if (page !== previousPage) {
      setTimeout(async() => {
        await listNewFeed({ last_id, page });
      }, page === 1 ? 800 : 100);
    }
  }, [last_id, newFeedData.length, isLoadMore, page, previousPage, user]);

  const onVoteDocument = async (type, document) => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const result = newFeedData.map(item => {
          if (getNestedObjectSafe(item, ['impactObj', 'linkDetailPost']) === document) {
            return { ...item, voted: !item.voted, totalVote: item.voted ? item.totalVote - 1 : item.totalVote + 1 };
          }
          return item;
        });
        setNewFeedData(result);
        await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <>
      <Head ogImage='/static/img/img_logo.png' title="Bảng tin"/>
      <PopupModalDownload isOpen={isShowingDownload} toggle={toggleDownload} close={closeDonwload} />
      {affiliateLoading && !affiliate.length ? (
        <AffiliateCarouselPlaceHolder/>
      ) : <AffiliateCarousel items={affiliate}/>
      }
      <div className="action-button d-flex align-items-center mb-4">
        <Button
          className="text-uppercase text-white shadow fz-14 border-0 font-weight-bold bg-link py-3 w-50 border-0 mr-2 d-flex align-items-center justify-content-center" onClick={() => toggleDownload()}>
          <div className="mr-2">
            <SvgIcons fileName="ic_pen"/>
          </div>
          {i18n.t('new_post')}
        </Button>
        <Button className="text-uppercase text-white shadow fz-14 border-0 font-weight-bold bg-organe py-3 w-50 border-0 ml-2 d-flex align-items-center justify-content-center" onClick={() => toggleDownload()}>
          <div className="mr-2">
            <SvgIcons fileName="ic_star_top"
                      width={70}
                      height={24}/>
          </div>
          {i18n.t('new_review')}
        </Button>
      </div>
      <InfiniteScroll pageStart={0}
                      loadMore={fetchData}
                      threshold={400}
                      hasMore={isLoadMore}
                      initialLoad
                      loader={<PlaceHolder/>}>
        {newFeedData.length > 0 && newFeedData.map((item, index) => {
          const isDisplayAds =
            index === FIRST_INDEX_ADS ||
            (index > 0 && (index === ((tempIndexAds * INCREASE_NEXT_INDEX) + FIRST_INDEX_ADS)));
          let adsIndex = 0;
          if (isDisplayAds) {
            adsIndex = tempIndexAds;
            tempIndexAds += 1;
          }

          const bannerAds = (isDisplayAds && allAds[adsIndex]) ? (
            <Link route={allAds[adsIndex][0].link} target="_blank">
              <a className="d-block mb-4 overflow-hidden text-center"
                 style={{
                   background: '#eee',
                   minHeight: '100px',
                 }}>
                <ImageWithFallback alt={allAds[adsIndex][0].title}
                                   src={getNestedObjectSafe(allAds[adsIndex][0], ['photos', 0, 'origin'])} />
              </a>
            </Link>
          ) : null;

          return (
            <NewFeedItem newFeedItem={item}
                         key={index}
                         onVoteDocument={onVoteDocument}
                         bannerAds={bannerAds}
                         user={user}/>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default News;
