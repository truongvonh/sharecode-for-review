import React from 'react';
import SkeletonLoading from 'components/Skeleton';

const PlaceHolder = () => {
  return (
    <div className="bg-white rounded p-3 mb-5">
      <div className="border-bottom pb-3">
        <SkeletonLoading maxWidth="60%" height="35px" width="200px"/>
      </div>
      <div className="py-3">
        <div className="clearfix">
          <div className="float-left w-20" style={{ maxWidth: '70px' }}>
            <SkeletonLoading isCircle width="50px" height="50px" />
          </div>
          <div className="float-left w-50">
            <SkeletonLoading height="10px" width="500px" count={2} />
          </div>
          <div className="float-right w-10" style={{ maxWidth: '30px' }}>
            <SkeletonLoading height="15px" width="30x" />
          </div>
        </div>
        <div className="py-3">
          <SkeletonLoading height="15px" count={5} width="500px" />
        </div>
      </div>
      <div className="border-top pt-3  clearfix">
        <div className="float-left w-20" style={{ maxWidth: '70px' }}>
          <SkeletonLoading isCircle height="50px" width="50px" />
        </div>
        <div className="float-left w-70 overflow-hidden">
          <SkeletonLoading height="45px" width="500px" />
        </div>
        <div className="float-right w-10" >
          <SkeletonLoading isCircle height="50px" width="50px" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlaceHolder);
