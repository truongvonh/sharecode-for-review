import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavLeft from './NavLeft';
import NavRight from './NavRight';
import Aux from '../../../../hoc/_Aux';
import DEMO from '../../../../store/common/constant';
import * as actionTypes from '../../../../store/common/actions';

class NavBar extends Component {
  render() {
    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
    if (this.props.headerFixedLayout) {
      headerClass = [...headerClass, 'headerpos-fixed'];
    }

    let toggleClass = ['mobile-menu'];
    if (this.props.collapseMenu) {
      toggleClass = [...toggleClass, 'on'];
    }

    return (
      <Aux>
        <header className={headerClass.join(' ')}>
          <div className="m-header">
            <a className={toggleClass.join(' ')} id="mobile-collapse1" href={DEMO.BLANK_LINK} onClick={this.props.onToggleNavigation}><span /></a>
            <a href={DEMO.BLANK_LINK} className="b-brand">
              <img src="../favicon.ico" className={'rounded-circle'} style={{ width: 40 }} />
              <span className="b-title">Top Sinh Vien</span>
            </a>
          </div>
          <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}><i className="feather icon-more-horizontal" /></a>
          <div className="collapse navbar-collapse">
            <NavLeft />
            <NavRight rtlLayout={this.props.rtlLayout} />
          </div>
        </header>
      </Aux>
    );
  }
}

const mapStateToProps = store => {
  return {
    rtlLayout: store.common.rtlLayout,
    headerBackColor: store.common.headerBackColor,
    headerFixedLayout: store.common.headerFixedLayout,
    collapseMenu: store.common.collapseMenu
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
