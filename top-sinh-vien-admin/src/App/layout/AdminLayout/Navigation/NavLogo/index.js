import React from 'react';
import DEMO from '../../../../../store/common/constant';
import Aux from '../../../../../hoc/_Aux';

const navLogo = props => {
  let toggleClass = ['mobile-menu'];
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href={DEMO.BLANK_LINK} className="b-brand">
          <img src="../favicon.ico" className={'rounded-circle'} style={{ width: 40 }} />
          <span className="b-title">Top Sinh Vien</span>
        </a>
        <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
      </div>
    </Aux>
  );
};

export default navLogo;
