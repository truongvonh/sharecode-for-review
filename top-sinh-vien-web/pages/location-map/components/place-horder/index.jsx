import React from 'react';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroller';
const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const Index = () => {
  return (
    <div className="col-lg-12 mb-2 mx-auto mx-md-0 px-2">
      <div className="wrapper-item-card-place p-3 shadow">
        <div className="d-flex flex-row align-items-center">
          <div className="w-100" style={{ maxWidth: '100px' }}>
            <Skeleton circle={true} height={100} width={100} />
          </div>
          <div className="ml-3 w-100">
            <Skeleton circle={true} height={20} count={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Index);
