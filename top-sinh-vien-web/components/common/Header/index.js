// @flow
import React from 'react';
import { InputGroup, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { array } from 'prop-types';

import './Header.scss'

const Header = ({ allLink }) => {
  const renderNavItem = data =>
    data.map(item => (
      // eslint-disable-next-line react/jsx-key
      <NavItem>
        <NavLink className="nav-link-icon" href="#pablo" onClick={e => e.preventDefault()}>
          <i className={`ni ${item.icon}`} />
          <span className="nav-link-inner--text">{item.text}</span>
        </NavLink>
      </NavItem>
    ));

  return (
    <div className='wrapper-header'>
      <div className='wrapper-navigation'>
        <img className='img-logo' src='/static/img/logo.svg' alt='logo'/>

        <div className='wrapper-input-search'>
          <input className='search-header' placeholder="Tìm kiếm …" />
          <img className='icon-search' src='/static/img/icon-search.svg' alt='icon-search'/>
        </div>

        <Nav className='tab-nav'>
          <NavItem className='link-nav'>
            <NavLink>Bảng tin</NavLink>
          </NavItem>
          <NavItem className='link-nav'>
            <NavLink>Cộng đồng <i className='down'></i></NavLink>
          </NavItem>
          <NavItem className='link-nav'>
            <NavLink>Thi đấu</NavLink>
          </NavItem>
          <NavItem className='link-nav'>
            <NavLink>Đại Học - Cao đẳng</NavLink>
          </NavItem>
        </Nav>
      </div>

      <div className='wrapper-status-user'>
        <div className='notification-user'>
          <img src='/static/img/notification.svg' alt='icon-notify'/>

          <div className='quatity-notify'>10</div>
        </div>
        <img className='img-user' src='/static/img/userAva.svg' alt='avatar-user'/>
        <p className='username'>Như Quỳnh</p>

        <img className='icon-menu' src='/static/img/ic_menu.svg' alt='icon-menu'/>
      </div>

    </div>
  );
};

Header.propTypes = {
  allLink: array
};

export default Header;
