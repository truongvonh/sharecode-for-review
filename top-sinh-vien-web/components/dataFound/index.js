import React from 'react';
import SvgIcons from 'components/SvgIcons';

import './style.scss';

const DataFound = () => {
  return (
    <>
      <div className="d-flex pt-5 w-100 justify-content-center">
        <SvgIcons fileName="not-found" width="80" height="80" />
      </div>
      <p className="d-flex w-100 justify-content-center font-weight-bold fz-18 pt-3">Không có dữ liệu để hiển thị!</p>
    </>
  );
};

export default DataFound;
