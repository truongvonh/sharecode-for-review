import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import ChatList from './ChatList';
import Aux from 'hoc/_Aux';
import { Route, Redirect } from 'react-router';

import Avatar1 from 'assets/images/user/avatar-1.jpg';
import { USER_ENDPOINT } from 'api/constant';
import Badge from 'react-bootstrap/Badge';
import './style.scss';
import { useActions } from 'hooks/useActions';
import { getAllNotification, readNotification } from 'store/notification/actions';
import { shallowEqual, useSelector } from 'react-redux';
import ImageWithFallback from 'components/ImageWithFallback';
import DEMO from 'store/common/constant';
import { GET_ALL_NOTIFICATIONS_PROGRESS } from 'store/notification/constant';
import Spinner from 'react-bootstrap/Spinner';
import usePrevious from 'hooks/usePrevious';
import { history } from 'store';

const NavRight = ({ rtlLayout }) =>  {

  const [
    getAllNotificationAction,
    readNotificationAction
  ] = useActions([
    getAllNotification,
    readNotification
  ], null);
  const allNotification = useSelector(store => store.notification.allNotification, shallowEqual);
  const totalNotRead = useSelector(store => store.notification.notRead, shallowEqual);
  const notificationStatus = useSelector(store => store.notification.status, shallowEqual);
  const checkLoading = notificationStatus === GET_ALL_NOTIFICATIONS_PROGRESS;

  const [state, setState] = useState({
    listOpen: false,
    isLogOut: false,
    page: 1,
    limit: 10,
  });

  const { isLogOut, listOpen, page, limit } = state;

  const onLogOut = async () => {
    const result = await USER_ENDPOINT.LOGOUT();
    if (result) setState({ ...state, isLogOut: true });
  };

  const onReadNotification = item => {
    const { _id } = item;
    const documentId = item.document._id;
    readNotificationAction({ id: _id });
    history.replace(`/report/${documentId}`);
  };

  const onLoadMoreNotification = () => {
    setState({
      ...state,
      page: state.page + 1
    });

    getAllNotificationAction({ limit, page: page + 1 });

  };

  useEffect(() => {
    getAllNotificationAction({ page, limit });
  }, []);

  const renderListNotification = (allNotification) => {
    const result = allNotification.length ? allNotification.map((item, index) => (
      <li className={`${!item.read && 'not-read'} notification`}
          onClick={() => onReadNotification(item)}
          key={index}>
        <div className="media d-flex align-item-center">
          <ImageWithFallback  className="img-radius flex-shrink-0"
                              src={item.sender && item.sender.avatar}
                              alt={item.sender && item.sender.fullName} />
          <div className="media-body">
            <p><strong className="font-weight-bold">{item.sender.fullName}</strong></p>
            <p className="type-report pr-3">{item.typeReport}</p>
            <p className="text-muted">
              {item.createdAt}
            </p>
          </div>
        </div>
      </li>
    )) : (
      <div className="d-flex align-items-center justify-content-center py-5">
        <i className="feather icon-bell-off icon-without-notification"/>
        <p className="text-primary">Hiện tại không có thông báo</p>
      </div>
    );

    return result;
  };

  if (isLogOut) return (
    <Redirect to={{
      pathname: '/auth/signin',
      state: { from: 'signout' }
    }}
    />
  );

    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Dropdown alignRight={!rtlLayout}>
              <Dropdown.Toggle variant={'link'}
                               bsPrefix="notification-wrapper posititon-relative dropdown-toggle"
                               id="dropdown-basic">
                <i className="icon feather icon-bell" />
                { Number(totalNotRead) > 0 && (
                  <>
                    <Badge variant="danger"
                           pill
                           bsPrefix="position-absolute icon-notification badge badge-pill badge-primary">
                      {totalNotRead}
                    </Badge>
                  </>
                ) }
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="notification">
                <div className="noti-head">
                  <h6 className="d-inline-block m-b-0">Thông báo</h6>
                  <div className="float-right">
                    <a href={DEMO.BLANK_LINK} className="m-r-10">Đánh dấu tất cả là đã đọc</a>
                  </div>
                </div>
                <ul className="noti-body">
                  {renderListNotification(allNotification)}
                </ul>
                <div className="noti-footer d-flex justify-content-center">
                  <a href={DEMO.BLANK_LINK} onClick={onLoadMoreNotification}>Xem tất cả</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className={rtlLayout ? 'm-r-15' : 'm-l-15'}>
            <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => { setState({ ...state, listOpen: true }); }}><i className="icon feather icon-mail" /></a>
          </li>
          <li>
            <Dropdown alignRight={!rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img src={Avatar1} className="img-radius" alt="User Profile" />
                  <span>John Doe</span>
                  <a className="dud-logout" title="Logout">
                    <i className="feather icon-log-out" onClick={onLogOut}/>
                  </a>
                </div>
                <ul className="pro-body">
                  <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-settings" /> Settings</a></li>
                  <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-user" /> Profile</a></li>
                  <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-mail" /> My Messages</a></li>
                  <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock" /> Lock Screen</a></li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <ChatList listOpen={listOpen} closed={() => { setState({ ...state, listOpen: false }); }} />
      </Aux>
    );
  };

export default NavRight;
