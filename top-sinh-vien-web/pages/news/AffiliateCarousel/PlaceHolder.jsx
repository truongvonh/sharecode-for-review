import React from 'react';
import SkeletonLoading from 'components/Skeleton';

// const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const AffiliateCarouselPlaceHolder = () => {
  return (
    <div className="row w-100 bg-white py-3 mx-auto mb-3" >
      { Array.from(Array(4).keys()).map((_, index) => (
        <div className="col-3 text-center " key={index}>
          <div className="d-flex justify-content-center">
            <SkeletonLoading isCircle
                           width="80px"
                           height="80px" />
          </div>
          <div className="mt-2 d-flex justify-content-center">
            <SkeletonLoading width="50px"
                             height="20px" />
          </div>
        </div>
        )) }
    </div>
  );
};

export default React.memo(AffiliateCarouselPlaceHolder);
