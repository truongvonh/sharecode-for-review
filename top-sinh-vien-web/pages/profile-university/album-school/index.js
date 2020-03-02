import React from 'react';
import Head from 'components/common/head';
import { ConsumerProfileSchool } from 'layout/ProfileUniversityWrapper';
import { GALLERY_TYPE } from 'constants/common';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import { ALBUM_PHOTOS_ENDPOINT } from 'constants/endpoints';
import { getNestedObjectSafe } from 'utils/helper';
import InfiniteScroll from 'react-infinite-scroller';
import usePrevious from 'hooks/usePrevious';
import DataFound from 'components/dataFound';

const AlbumSchool = ({ university_id }) => {
  const [albumSchool, setAlbumSchool] = React.useState([]);
  const [isLoadMore, setLoadMore] = React.useState(true);
  const MAX_LIMIT = 15;
  const [page, setPage] = React.useState(1);
  const previousPage = usePrevious(page);
  const [isLoading, setIsLoading] = React.useState(true);

  const getAlbumSchool = async ({ id_school: university_id, page = 1 }) => {
    const arrAlbum = [];
    try {
      const data = await ALBUM_PHOTOS_ENDPOINT.ALBUM_SCHOOL({ id_school: university_id, page: page });
      data.map(
        item =>
          (getNestedObjectSafe(item, ['photos']) || []).length > 0 &&
          getNestedObjectSafe(item, ['photos']).map(image => arrAlbum.push(image))
      );
      setAlbumSchool(prevData => [...prevData, ...arrAlbum]);
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
            await getAlbumSchool({ page: page, id_school: university_id });
          },
          page === 1 ? 800 : 100
        );
      }
    },
    [university_id, isLoadMore, page, previousPage]
  );

  return (
    <>
      <Head ogImage="/static/img/img_logo.png" title="Hình ảnh trường học" />
      <div className="">
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
          {albumSchool && albumSchool.length > 0 && albumSchool && (
            <ImagesWithLightBox
              images={albumSchool && albumSchool.length > 0 && albumSchool}
              typeGallery={GALLERY_TYPE.ALBUM_SCHOOL}
            />
          )}
        </InfiniteScroll>
        {isLoading === false && albumSchool && albumSchool.length === 0 && <DataFound />}
      </div>
    </>
  );
};

const WrapperAlbumSchool = () => {
  return (
    <ConsumerProfileSchool>
      {context => (
        <React.Fragment>
          <AlbumSchool
            university_id={context.university_id}
            schoolAbout={context.schoolAbout}
            albumSchool={context.albumSchool}
          />
        </React.Fragment>
      )}
    </ConsumerProfileSchool>
  );
};

export default WrapperAlbumSchool;
