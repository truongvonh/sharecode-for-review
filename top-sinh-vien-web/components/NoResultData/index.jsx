import ImageWithFallback from 'components/ImageWithFallback';
import React from 'react';

const NoResultData = () => (
  <div className="not-found-data d-flex flex-column py-5 align-items-center justify-content-center w-100">
    <ImageWithFallback src="/static/img/laughing.png" className="w-50" alt="not found data" />
    <p className="my-5 fz-18 font-weight-bold text-center text-uppercase color-main">
      Không tìm thấy nội dung yêu cầu <br/> vui lòng quay lại sau.
    </p>
  </div>
);

export default React.memo(NoResultData);
