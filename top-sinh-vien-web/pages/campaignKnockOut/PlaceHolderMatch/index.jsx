import React from 'react';
import dynamic from 'next/dynamic';
const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const PlaceHolderMatch = () => {
  return (
    <div className="row bg-white py-2 justify-content-center mb-3">
      <div className="col-12 row align-items-center mb-3 mb-xl-0 col-xl-5">
        <div className="col-6 mr-auto">
          <Skeleton width="100%" height={30}/>
        </div>
        <div className="mr-2">
          <Skeleton circle={true} height={50} width={50} />
        </div>
        <div className="">
          <Skeleton width={30} height={50}/>
        </div>
      </div>
      <div className="col-12 col-xl-2">
        <div className="d-block mx-auto">
          <Skeleton width="100%" height={100}/>
        </div>
      </div>
      <div className="col-12 flex-row-reverse row mt-3 mt-xl-0 align-items-center col-xl-5">
        <div className="col-6 ml-auto">
          <Skeleton width="100%" height={30}/>
        </div>
        <div className="ml-2">
          <Skeleton circle={true} height={50} width={50} />
        </div>
        <div className="">
          <Skeleton width={30} height={50}/>
        </div>
      </div>
    </div>
  );
};

PlaceHolderMatch.propTypes = {

};

export default React.memo(PlaceHolderMatch);
