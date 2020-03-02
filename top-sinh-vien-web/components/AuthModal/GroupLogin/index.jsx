import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { bool, func } from 'prop-types';
import IonicIcons from 'components/IonicIcons';
import { Animated } from 'react-animated-css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { getUserInfo } from 'redux/auth/actions';
import { useActions } from 'hooks/useActions';
import { AUTH_ENDPOINT } from 'constants/endpoints';
import AnimateWrapper from 'components/AuthModal/AnimateWrapper';
import { closeLoading, openLoading } from 'redux/common/actions';

const GroupLogin = ({ onNavigateEmail, onNavigatePhone, ...props }) => {
  const [
    getUserInfoAction,
    openLoadingAction,
    closeLoadingAction
  ] = useActions([
    getUserInfo,
    openLoading,
    closeLoading
  ], null);

  const responseGoogle = async response => {
    const { accessToken: access_token } = response;

    if (access_token) {
      openLoadingAction();
      try {
        await AUTH_ENDPOINT.GOOGLE_AUTH({ access_token });
        const user = await AUTH_ENDPOINT.GET_USER_INFO();
        getUserInfoAction(user);
      } catch (e) {
        console.log(e);
      }
      finally {
        setTimeout(() => {
          closeLoadingAction();
        }, 800);
      }
    }
  };

  const responseFacebook = async (responseFacebook) => {
    const { accessToken: access_token } = responseFacebook;
    if (access_token) {
      openLoadingAction();
      try {
        await AUTH_ENDPOINT.FACEBOOK_AUTH({ access_token });
        const user  = await AUTH_ENDPOINT.GET_USER_INFO();
        getUserInfoAction(user);
      } catch (e) {
        console.log();
      } finally {
        setTimeout(() => {
          closeLoadingAction();
        }, 800);
      }
    }
  };

  return (
    <AnimateWrapper animateDirection {...props}>
      <GoogleLogin
        clientId={process.env.GG_ID}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={prop => (
          <Button
            className="bg-btn-google border-0 d-flex align-items-center justify-content-center rounded-lg mb-4"
            onClick={prop.onClick}
          >
            <IonicIcons name="icon ion-logo-googleplus text-white d-inline-block fz-24 mr-3" />
            Đăng nhập bằng Google
          </Button>
        )}
      />

      <FacebookLogin
        appId={process.env.FB_ID}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
          <Button className="bg-btn-facebook border-0 d-flex align-items-center justify-content-center rounded-lg mb-4"
                  onClick={renderProps.onClick}>
            <IonicIcons name="icon ion-logo-facebook text-white d-inline-block fz-24 mr-3" />
            Đăng nhập bằng Facebook
          </Button>
        )}
      />

      <Button
        outline
        color="primary"
        className="d-flex align-items-center justify-content-center rounded-lg mb-4"
        onClick={onNavigateEmail}
      >
        <IonicIcons name="icon ion-md-mail text-primary d-inline-block fz-24 mr-3" />
        Đăng nhập bằng email
      </Button>

      <Button
        outline
        color="primary"
        className="d-flex align-items-center justify-content-center rounded-lg"
        onClick={onNavigatePhone}
      >
        <IonicIcons name="icon ion-ios-phone-portrait text-primary d-inline-block fz-24 mr-3" />
        Đăng nhập bằng SĐT
      </Button>
    </AnimateWrapper>
  );
};

GroupLogin.propTypes = {
  loginBtn: bool,
  onNavigateEmail: func,
  onNavigatePhone: func
};

export default React.memo(GroupLogin);
