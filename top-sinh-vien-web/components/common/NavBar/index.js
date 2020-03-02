import React, { memo } from 'react'
import PropTypes from 'prop-types';

// styles
import './NavBar.scss'

const NavBar = ({isUser}) => {
  return (
    <div className={`wrapper-navbar ${isUser ? 'user-avatar' : ''}`}>
      <div className='wraper-icon-nav'>
        <img className='icon-menu' src='/static/img/ic_menu.svg' alt='icon-menu'/>
        <img className='icon-menu' src='/static/img/ava-user-nav.svg' alt='icon-menu'/>
        <img className='icon-menu' src='/static/img/icon-news.svg' alt='icon-menu'/>
        <img className='icon-menu' src='/static/img/icon-range.svg' alt='icon-menu'/>
        <img className='icon-menu' src='/static/img/icon-setting.svg' alt='icon-menu'/>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  isUser: PropTypes.bool,
};

NavBar.defaultProps = {
  isUser: false,
};

export default memo(NavBar)
