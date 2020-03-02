import ImageWithFallback from 'components/ImageWithFallback';
import React from 'react';
import { string } from 'prop-types';

const NoMessageData = ({ title = 'Chưa có bình luận nào cho trận đấu này' }) => (
  <div className="not-found-data d-flex flex-column py-0 align-items-center justify-content-center w-100">
    <ImageWithFallback src="/static/img/img_bubbles.png" alt="not found data" />
    <p className="my-5 fz-14 font-weight-bold text-center text-uppercase text-secondary">
      { title }
    </p>
  </div>
);

NoMessageData.propTypes = {
  title: string
};

export default React.memo(NoMessageData);
