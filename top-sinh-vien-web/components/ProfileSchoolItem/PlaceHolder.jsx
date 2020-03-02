import React from 'react';
import dynamic from 'next/dynamic';
const Skeleton = dynamic(() => import('react-loading-skeleton'), { ssr: false });

const PlaceHolder = () => {
  return (
    <div className="bg-white rounded p-3 mb-5">
      <div className="border-bottom pb-3">
        <Skeleton height={35} width={'60%'} />
      </div>
      <div className="py-3">
        <div className="clearfix">
          <div className="float-left w-20" style={{ maxWidth: '70px' }}>
            <Skeleton circle={true} height={50} width={50} />
          </div>
          <div className="float-left w-50">
            <Skeleton height={10} count={2} />
          </div>
          <div className="float-right w-10" style={{ maxWidth: '30px' }}>
            <Skeleton height={15} width={40} />
          </div>
        </div>
        <div className="py-3">
          <Skeleton height={15} count={5} />
        </div>
      </div>
      <div className="border-top pt-3  clearfix">
        <div className="float-left w-20" style={{ maxWidth: '70px' }}>
          <Skeleton circle={true} height={50} width={50} />
        </div>
        <div className="float-left w-70 overflow-hidden">
          <Skeleton circle={true} height={45} />
        </div>
        <div className="float-right w-10" >
          <Skeleton height={50} circle={true}  width={50} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PlaceHolder);
