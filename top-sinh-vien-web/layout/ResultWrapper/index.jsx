import React  from 'react';
import Header from 'layout/ResultWrapper/header';
// import './result.scss';
import { element, string } from 'prop-types';

const ResultWrapper = ({ children, keyword }) =>  {

  return (
    <>
      <div className="pt-4">
        <Header keyword={keyword} />
      </div>

      <div >
        { children }
      </div>
    </>
  );
};

ResultWrapper.propTypes = {
  children: element,
  keyword: string
};

export default (ResultWrapper);
