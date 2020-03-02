import React from 'react';
import { Link } from 'routes/routesConfig';
import { useRouter } from 'next/router';

import './header.scss';
import { string } from 'prop-types';
import { HEADER_NAVIGATE_RESULT } from 'constants/common';

const Header = ({ keyword = '' }) => {
  const router = useRouter();

  const removeKeyword = (index) => {
    const routerPath = router.asPath;
    const splitToArray = routerPath.split(!index ? '?' : '/');
    splitToArray.pop();
    return splitToArray.join(!index ? '' : '/');
  };

  const checkPathName = (index) =>
    index ?
      `${HEADER_NAVIGATE_RESULT.ALL_LINKS[index]}/${keyword}` :
      `${HEADER_NAVIGATE_RESULT.ALL_LINKS[index]}?keyword=${keyword}`;

  return (
    <div className="header ">
      <ul className="d-flex ">
        {HEADER_NAVIGATE_RESULT.ALL_LINKS.map((item, index) => (
          <li key={index}
              className={`header-item col-6 px-0 px-lg-3 d-flex col-lg-auto justify-content-center py-3 ${item === removeKeyword(index) ? 'active' : ''}`}>
            <Link prefetch route={checkPathName(index)} >
              <a className="col-6 px-0 col-lg-auto text-wrap">
                <span className="fz-16 font-weight-bold text-secondary">{HEADER_NAVIGATE_RESULT.ALL_TEXTS[index]}</span>
              </a>
            </Link>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

Header.propTypes = {
  keyword: string
};

export default Header;
