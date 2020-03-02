import React from 'react';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroller';
const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const Index = () => {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-3 pl-0">
      <div className="bg-white rounded p-3 mb-5">
        <div className="d-flex flex-row align-items-center">
          <div className="w-20" style={{ maxWidth: '70px' }}>
            <Skeleton circle={true} height={50} width={50} />
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
