import React from 'react';
import { USER_ENDPOINT } from 'constants/endpoints';

const INIT_PAGINATION = {
  page: 0,
  limit: 10
};

const notificationHandler = (isInitLoad = false) => {

  const [notificationLoading, setNotificationLoading] = React.useState(true);
  const [allNotification, setAllNotification] = React.useState([]);
  const [notificationPagination, setNotificationPagination] = React.useState(INIT_PAGINATION);

  const getAllNotification = async ({ page = INIT_PAGINATION.page, limit = INIT_PAGINATION.limit }) => {
    if (!notificationLoading) setNotificationLoading(true);
    try {
      const newNotification = await USER_ENDPOINT.NOTIFICATIONS({ page, limit });
      setAllNotification([...allNotification, ...newNotification]);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setNotificationLoading(false);
      }, 800);
    }
  };

  const onGetAllNofitication = React.useCallback( async () => {
    await getAllNotification();
  }, [notificationPagination]);

  React.useEffect(() => {
    if (isInitLoad) {
      onGetAllNofitication();
    }
  });

  const onGetAllNotification = React.useCallback(() => {

  }, [notificationPagination]);

  return {
    notificationLoading,
    onGetAllNotification,
    allNotification
  };
};

export default notificationHandler;
