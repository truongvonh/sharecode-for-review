import React, { useMemo, useState } from 'react';
import Head from 'components/common/head';
import { GALLERY_TYPE } from 'constants/common';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { ALBUM_PHOTOS_ENDPOINT } from 'constants/endpoints';
import InfiniteScroll from 'react-infinite-scroller';
import usePrevious from 'hooks/usePrevious';
import DataFound from 'components/dataFound';
import { ConsumerProfiler } from 'layout/ProfileUserWrapper';
import { getNestedObjectSafe } from 'utils/helper';

import './style.scss';

const initPagination = {
  page: 1,
  limit: 10
};

const AlbumUser = ({ user_id, profileInfo }) => {
  const DEFAULT_LIMIT = 10;
  const [albumSchool, setAlbumSchool] = React.useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [albumData, setAlbumData] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState(initPagination);
  const { page, limit } = pagination;
  const previousPage = usePrevious(page);

  const checkLoadMore = data => {
    if (!data.length) setLoadMore(false);
    else {
      const totalSchool = data.filter(item => item.id_school).length,
        totalLocation = data.filter(item => item.location).length,
        totalGroup = data.filter(item => item.group).length;
      if (totalSchool < limit && totalLocation < limit && totalGroup < limit) setLoadMore(false);
    }
  };

  const getAlbumPhotos = React.useCallback(
    async ({ user_id, page, onScrollLoad = false }) => {
      setIsLoading(true);
      try {
        const data = await ALBUM_PHOTOS_ENDPOINT.ALBUM_PHOTOS({ user_id, page });
        checkLoadMore(data);
        setAlbumData(prevData => [...prevData, ...data]);
        if (data.length)
          if (onScrollLoad) {
            if (data.length) setPagination(prevPagination => ({ ...prevPagination, page }));
          } else setAlbumData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [page, loadMore]
  );

  React.useEffect(() => {
    if (user_id && !albumData.length) getAlbumPhotos({ user_id: user_id, page });
  }, [user_id]);

  const loadFunc = React.useCallback(
    async nextPage => {
      if (nextPage !== initPagination.page && loadMore && user_id) {
        setTimeout(async () => {
          await getAlbumPhotos({
            user_id: user_id,
            page: nextPage,
            onScrollLoad: true
          });
        }, 300);
      }
    },
    [loadMore, page, albumData.length, user_id, previousPage]
  );

  const photoFlat = useMemo(() => {
    return albumData.length
      ? albumData.map(item => (item.photos.length ? item.photos.map(photo => photo.thumb) : [])).flat()
      : [];
  }, [albumData]);

  return (
    <>
      {profileInfo && profileInfo.profile && profileInfo.profile.fullName && (
        <Head
          ogImage="/static/img/img_logo.png"
          title={`Album của ${getNestedObjectSafe(profileInfo, ['profile', 'fullName'])}`}
        />
      )}
      <div className="album-user pt-3">
        <div className="d-flex justify-content-between bg-white mb-3 align-items-center p-3">
          <p className="m-0 font-weight-bold fz-16">Album ảnh</p>
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={loadMore}
          threshold={10}
          // loader={<PlaceHolder />}
          // loader="loading"
        >
          {albumData.length > 0 && <ImagesWithLightBox images={photoFlat} typeGallery={GALLERY_TYPE.ALBUM_SCHOOL} />}
        </InfiniteScroll>
        {isLoading === false && albumData && albumData.length === 0 && <DataFound />}
      </div>
    </>
  );
};

const WrapperAlbumUser = () => {
  return (
    <ConsumerProfiler>
      {context => (
        <React.Fragment>
          <AlbumUser
            user_id={context.user_id}
            profileInfo={context.profileInfo}
            onClickStatus={context.onClickStatus}
          />
        </React.Fragment>
      )}
    </ConsumerProfiler>
  );
};

export default WrapperAlbumUser;
