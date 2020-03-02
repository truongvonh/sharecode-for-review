import React from 'react';
import dynamic from 'next/dynamic';

const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const PlaceHolderTeamRound32 = () => {
  return (
    <div className="col-12 mx-auto col-md-6 col-lg-3 mb-3 px-2 mb-3 align-items-lg-stretch">
      <div className="wrapper-item-card bg-white p-3 h-100 rounded shadow">
        <div className="image-thumb mb-3">
          <Skeleton height={120}
                    with="100%" />
        </div>
        <div className="content">
          <div className="mb-2">
            <Skeleton height={12}
                      with={30} />
          </div>
          <Skeleton count={3}
                    height={12}
                    with="100%" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlaceHolderTeamRound32);
