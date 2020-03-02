import IonicIcons from 'components/IonicIcons';
import { UncontrolledPopover } from 'reactstrap';
import React from 'react';
import notificationHandler from 'components/Header/ListNotification/NotificationHandler';

const ListNotification = ({  }) => {

  const {
    notificationLoading,
    allNotification,
    onGetAllNotification
  } = notificationHandler();

  return (
    <>
      <IonicIcons name="ion cursor-pointer ion-ios-notifications-outline text-white fz-30 mx-2 font-weight-bold"
                  id="notification-dropdown"
                  onClick={onGetAllNotification}
                  href="#"/>
      <UncontrolledPopover trigger="legacy"
                           placement="bottom"
                           className="shadow border-0 list-notification"
                           target="notification-dropdown">
        <ul className="p-0">

        </ul>
      </UncontrolledPopover>
    </>
  );

};

export default React.memo(ListNotification);
