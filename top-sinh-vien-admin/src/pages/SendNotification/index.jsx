import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { useActions } from 'hooks/useActions';

import { sendAllNotification } from '../../store/notification/actions';
import { useSelector, shallowEqual } from 'react-redux';
import {
  SEND_NOTIFICATION_ALL_USER_SUCCESS
} from '../../store/notification/constant';

const SendNotification = () => {

  const sendAllNotificationAction = useActions(sendAllNotification, null);
  const notificationStatus = useSelector(store => store.notification.status, shallowEqual);

  const [formValue, setFormValue] = useState({
    title: '',
    content: ''
  });

  const { title, content } = formValue;

  const onChangeForm = (e) => {
    const { name } = e.target;
    setFormValue({
      ...formValue,
      [name]: e.target.value
    });
  };

  const onSubmit = () => {
    sendAllNotificationAction({ title, content });
  };

  const onClearForm = () => {
    setFormValue({
      title: '',
      content: ''
    });
  };

  useEffect(() => {
    if (notificationStatus === SEND_NOTIFICATION_ALL_USER_SUCCESS)
      onClearForm();
  }, [notificationStatus]);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Gửi thông báo đến toàn bộ người dùng">

            <Form className="d-flex flex-column mb-4">
              <Form.Label>Tiêu đề :</Form.Label>
              <Form.Control type="text"
                            className="mb-3"
                            value={title}
                            onChange={onChangeForm}
                            name="title"/>
              <Form.Label>Nội dung :</Form.Label>

              <Form.Control as="textarea"
                            rows="3"
                            value={content}
                            onChange={onChangeForm}
                            name="content"/>
            </Form>

            <div className="d-flex justify-content-start align-items-center">
              <Button className="border-0 theme-bg1 btn-theme"
                      disabled={!title || !content}
                      onClick={onSubmit}>
                <UcFirst text="Gửi thông báo"/>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default React.memo(SendNotification);