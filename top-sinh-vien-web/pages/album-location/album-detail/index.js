import React from 'react';
import usePrevious from 'hooks/usePrevious';
import { ALBUM_PHOTOS_ENDPOINT } from 'constants/endpoints';
import { getNestedObjectSafe } from 'utils/helper';
import InfiniteScroll from 'react-infinite-scroller';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { GALLERY_TYPE } from 'constants/common';
import DataFound from 'components/dataFound';

const AlbumDetail = id => {
  const id_location = getNestedObjectSafe(id, ['id']);
  const [albumLocation, setAlbumLocation] = React.useState([]);
  const [isLoadMore, setLoadMore] = React.useState(true);
  const MAX_LIMIT = 15;
  const [page, setPage] = React.useState(1);
  const previousPage = usePrevious(page);
  const [isLoading, setIsLoading] = React.useState(true);

  const getAlbumLocation = async ({ id = id_location, page = 1 }) => {
    const arrAlbum = [];
    try {
      const data = await ALBUM_PHOTOS_ENDPOINT.ALBUM_LOCATION({ id: id, page: page });
      data.map(
        item =>
          (getNestedObjectSafe(item, ['photos']) || []).length > 0 &&
          getNestedObjectSafe(item, ['photos']).map(image => arrAlbum.push(image))
      );
      setAlbumLocation(prevData => [...prevData, ...arrAlbum]);
      setPage(page + 1);
      if (arrAlbum.length < MAX_LIMIT) setLoadMore(false);
      if (data) setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = React.useCallback(
    async _ => {
      if (page !== previousPage) {
        setTimeout(
          async () => {
            await getAlbumLocation({ page: page, id: id_location });
          },
          page === 1 ? 800 : 100
        );
      }
    },
    [id_location, isLoadMore, page, previousPage]
  );

  return (
    <>
      <div className="col-12 album-location-detail pr-0 pl-0">
        <div className="d-flex justify-content-between bg-white mb-3 align-items-center p-3">
          <p className="m-0 font-weight-bold fz-16">Album ảnh</p>
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchData}
          hasMore={isLoadMore}
          initialLoad={true}
          // loader={<PlaceHolder />}
          // loader="loading"
        >
          {albumLocation && albumLocation.length > 0 && albumLocation && (
            <ImagesWithLightBox
              images={albumLocation && albumLocation.length > 0 && albumLocation}
              typeGallery={GALLERY_TYPE.ALBUM_LOCATION}
            />
          )}
        </InfiniteScroll>
        {isLoading === false && albumLocation && albumLocation.length === 0 && <DataFound />}
      </div>
    </>
  );
};

export default AlbumDetail;
