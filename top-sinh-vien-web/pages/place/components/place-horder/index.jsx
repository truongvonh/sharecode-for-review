import React from 'react';
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroller';
const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const Index = () => {
  return (
    <div className="col-md-6 col-xl-3 mb-3 px-2 mx-md-0  ">
      <div className="bg-white rounded p-3 mb-5">
        <div className="d-flex flex-row align-items-center">
          <div className="w-50" style={{ maxWidth: '100px' }}>
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
