import React, { useEffect, useState } from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledPopover } from 'reactstrap';
import ImageWithFallback from 'components/ImageWithFallback';
import IonicIcons from 'components/IonicIcons';
import SvgIcons from 'components/SvgIcons';
import { HEADER, HEADER_MENU, PROFILE_USER_TYPE } from 'constants/common';
import AuthModal from 'components/AuthModal';
import './style.scss';
import { useSelector } from 'react-redux';
import { AUTH_ENDPOINT, SEARCH_ENDPOINT } from 'constants/endpoints';
import { useActions } from 'hooks/useActions';
import { logOut } from 'redux/auth/actions';
import { closeLoginModal, toggleLoginModal } from 'redux/common/actions';
import { COMMON_TYPES } from 'redux/common/constant';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import { Link } from 'routes/routesConfig';
import AsyncSearchBox from 'components/AsyncSearchBox';
import i18n from 'locales/i18n';
import { checkOptionsByType } from 'utils/helper';
import { NAVIGATE_URL } from 'constants/url';
import ListNotification from 'components/Header/ListNotification';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearhData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const user = useSelector(store => store.auth.user);
  const commonStore = useSelector(store => store.common);
  const { visibleLoginModal, status, allGroups } = commonStore;
  const displayUserName = React.useMemo(() => user && (user.email || (user.profile && user.profile.fullName)), [user]);
  const [
    logOutAction,
    toggleLoginModalAction,
    closeLoginModalAction
    // onSearchMainAction
  ] = useActions(
    [
      logOut,
      toggleLoginModal,
      closeLoginModal
      // onSearchMain
    ],
    null
  );

  const toggle = () => setIsOpen(!isOpen);

  const onLogOut = async e => {
    e.preventDefault();
    if (user) {
      try {
        await AUTH_ENDPOINT.LOGOUT();
        logOutAction();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (user && status === COMMON_TYPES.TOGGLE_LOGIN_MODAL) closeLoginModalAction();
  }, [user, status]);

  const [onSearchDebounce] = useDebouncedCallback(async (input) => {
    try {
      const searchResult = await SEARCH_ENDPOINT.LIST_SEARCH({ key_search: input });
      const result = [];
      Object.keys(searchResult).forEach(item => {
        if (searchResult[item].length)
          result.push({
            label: i18n.t(`search_label.${item}`),
            options: checkOptionsByType(item, searchResult[item])
          });
      });
      if (result.length) {
        result.push({ custom: true });
        setSearhData(searchResult);
      }
    } catch (e) {
      console.log(e);
    }
  }, 1000);

  const loginButton = () => (
    <div className="login-wrapper mb-2 mb-lg-0 ml-auto d-flex align-items-center justify-content-end">
      {user && <ListNotification />}

      {user ? (
        <>
          <Button
            color="primary"
            id="user-info-dropdown"
            className="bg-main text-white px-2 border-0 d-flex align-items-center fz-14"
          >
            <div className="user-main-avatar overflow-hidden rounded-circle mr-2">
              <ImageWithFallback
                src={user.profile && user.profile.avatar && user.profile.avatar.length && user.profile.avatar[0].thumb}
                alt={displayUserName}
              />
            </div>
            <p className="mb-0 d-inline-block text-truncate">{displayUserName}</p>
          </Button>
          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            className="shadow border-0"
            target="user-info-dropdown"
          >
            <ul className="p-0">
              <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(user._id, PROFILE_USER_TYPE.TIME_LINE)}>
                <a className="list-group-item border-0 mb-0">{HEADER_MENU.PROFILE_USER}</a>
              </Link>
              <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(user._id, PROFILE_USER_TYPE.EDIT_PROFILE)}>
                <a className="list-group-item border-0 mb-0 cursor-pointer">{HEADER_MENU.EDIT_PROFILE_USER}</a>
              </Link>
              <a href="#" onClick={onLogOut} className="list-group-item border-0 mb-0">
                {HEADER_MENU.LOG_OUT}
              </a>
            </ul>
          </UncontrolledPopover>
        </>
      ) : (
        <Button
          color="primary"
          onClick={toggleLoginModalAction}
          className="bg-main text-white px-2 border-0 d-flex align-items-center fz-14"
        >
          <IonicIcons name="ion ion-ios-contact pr-3 p-0 fz-40 mr-2 d-inline-block mr-2" />
          Đăng nhập
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-main header-nav">
        <Navbar expand="lg" className="py-0 justify-content-start">
          <Link route="/">
            <NavbarBrand className="cursor-pointer">
              <SvgIcons fileName="main_logo" width={65} height={65} />
            </NavbarBrand>
          </Link>
          <AsyncSearchBox />
          <IonicIcons name="ion ion-md-list ml-auto text-light fz-40 d-block d-lg-none px-3"
                      onClick={toggle} />
          <Collapse isOpen={isOpen} navbar >
            <Nav className="mr-auto" navbar>
              {HEADER.ALL_TEXT.map((item, index) => {
                const isDropDown = item === HEADER.ALL_TEXT[1];
                return (
                  <>
                    {isDropDown ? (
                      <>
                        <NavItem key={index}>
                          <NavLink
                            className="text-light px-xl-3 cursor-pointer font-weight-bold"
                            href="#"
                            id={'header-dropdown'}
                          >
                            {item}
                            <IonicIcons name="ion ion-ios-arrow-down fz-14 font-weight-bold ml-1 text-white" />
                          </NavLink>
                          <UncontrolledPopover
                            trigger="focus"
                            placement="bottom"
                            className="shadow border-0"
                            target="header-dropdown"
                          >
                            <ul className="p-0">
                              {allGroups.length > 0 &&
                                allGroups.map((item, index) => (
                                  <li key={index}>
                                    <Link route={NAVIGATE_URL.GROUP_DETAIL_PAGE.URL(item.type)}>
                                      <a className="list-group-item border-0 mb-0">{item.name}</a>
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </UncontrolledPopover>
                        </NavItem>
                      </>
                    ) : (
                      <NavItem key={index}>
                        <Link route={HEADER.ALL_LINK[index]} prefetch>
                          <NavLink className="text-light px-xl-3 cursor-pointer font-weight-bold">{item}</NavLink>
                        </Link>
                      </NavItem>
                    )}
                  </>
                );
              })}
            </Nav>
            {loginButton()}
          </Collapse>
        </Navbar>
      </div>
      <AuthModal isOpen={visibleLoginModal} toggle={toggleLoginModalAction} />
    </>
  );
};

export default Header;
