import React from 'react';
import SkeletonLoading from 'components/Skeleton';

const PlaceHolderComment = () => (
  <div className="p-2 clearfix">
    <div className="avatar d-inline-block float-left">
      <SkeletonLoading isCircle width="50px" height="50px" />
    </div>
    <div className="content pl-3 float-right d-inline-block" style={{
      width: 'calc(100% - 60px)'
    }}>
      <div>
        <SkeletonLoading maxWidth="50%" width="500px" height="30px" />
      </div>
      <div className="mt-2">
        <SkeletonLoading maxWidth="90%" width="400px" height='30px' />
      </div>
    </div>
  </div>
);

export default React.memo(PlaceHolderComment);
