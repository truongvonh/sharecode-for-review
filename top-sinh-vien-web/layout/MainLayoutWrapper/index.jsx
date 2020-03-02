import React, { useMemo, useState, useRef } from 'react';
import Header from 'components/Header';
import { element } from 'prop-types';
import MainSidebar from 'components/MainSidebar';
import 'layout/MainLayoutWrapper/style.scss';

const MainLayoutWrapper = ({ children }, ref) => (
  <>
    <Header />
    <MainSidebar />
    <main ref={ref} className="main-wrapper bg-main-content pb-5">
      <div className="wrapper-content">{children}</div>
    </main>
  </>
);

MainLayoutWrapper.propTypes = {
  children: element
};

export default React.forwardRef(MainLayoutWrapper);
