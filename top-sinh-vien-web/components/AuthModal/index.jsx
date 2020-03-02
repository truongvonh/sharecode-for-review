import React from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';
import { func } from 'prop-types';
import './style.scss';
import IonicIcons from 'components/IonicIcons';
import GroupLogin from 'components/AuthModal/GroupLogin';
import AnimateWrapper from 'components/AuthModal/AnimateWrapper';
import useNavigateLogin from 'hooks/useNavigateLogin';
import EmailLogin from 'components/AuthModal/EmailLogin';
import PhoneLogin from 'components/AuthModal/PhoneLogin';
import EmailRegister from 'components/AuthModal/EmailRegister';
import PhoneRegister from 'components/AuthModal/PhoneRegister';
import ConfirmCode from 'components/AuthModal/ConfirmCode';
import ResendCode from 'components/AuthModal/ResendCode';
import ResetPassword from 'components/AuthModal/ResetPassword';

import { shallowEqual, useSelector } from 'react-redux';
import ForgotPassword from 'components/AuthModal/ForgotPassword';
import { useActions } from 'hooks/useActions';
import { clearErrorMessage } from 'redux/auth/actions';

const AuthModal = ({ toggle, ...props }) => {
  const {
    navigateEmailLogin,
    navigateGroupLogin,
    navigateToPhoneLogin,
    navigateRegister,
    navigateEmailRegister,
    navigatePhoneRegister,
    navigateConfirmCode,
    navigateResendCode,
    navigateForgotPassword,
    navigateResetPassword,

    loginBtn,
    emailLogin,
    phoneLogin,
    registerBtn,
    registerPhone,
    registerEmail,
    confirmCode,
    resendCode,
    forgotPassword,
    resetPassword,

    emailConfirm
  } = useNavigateLogin();

  const authError = useSelector(store => store.auth.authError, shallowEqual);
  const clearErrorMessageAction = useActions(clearErrorMessage, null);

  const renderCheckText = loginBtn ? (
    <p className="mb-0 text-center color-font">
      Bạn chưa có tài khoản?
      <u className="ml-2 text-primary cursor-pointer" onClick={navigateRegister}>
        Đăng ký ngay
      </u>
    </p>
  ) : (
    <p className="mb-0 text-center color-font">
      Bạn đã có tài khoản?
      <u className="ml-2 text-primary cursor-pointer" onClick={navigateGroupLogin}>
        Đăng nhập ngay
      </u>
    </p>
  );

  const renderRegister = () => (
    <AnimateWrapper isVisible={registerBtn}>
      <Button
        outline
        color="primary"
        className="d-flex align-items-center justify-content-center rounded-lg mb-4"
        onClick={navigateEmailRegister}
      >
        <IonicIcons name="icon ion-md-mail text-primary d-inline-block fz-24 mr-3" />
        Đăng ký bằng email
      </Button>

      <Button
        outline
        color="primary"
        className="d-flex align-items-center justify-content-center rounded-lg"
        onClick={navigatePhoneRegister}
      >
        <IonicIcons name="icon ion-ios-phone-portrait text-primary d-inline-block fz-24 mr-3" />
        Đăng ký bằng SĐT
      </Button>
    </AnimateWrapper>
  );

  React.useEffect(() => {
    if (authError)
      setTimeout(() => {
        clearErrorMessageAction();
      }, 500);
  }, [authError]);

  return (
    <Modal className="auth-modal" {...props}>
      <ModalHeader toggle={toggle} />
      <div
        className={`bg-white animated  rounded shadow-lg overflow-hidden ${authError ? 'shake' : ''}`}
        style={{
          animationDelay: '0ms',
          animationDuration: '1000ms'
        }}
      >
        <h3 className="text-center fz-30 font-weight-bold pt-3 mb-0f color-font" onClick={navigateGroupLogin}>
          {!forgotPassword &&
            !resetPassword &&
            !confirmCode &&
            !resendCode &&
            (registerBtn || registerEmail || registerPhone ? 'Đăng ký' : 'Đăng nhập')}
          {confirmCode ? 'Nhập mã xác thực' : ''}
          {resendCode ? 'Xác thực email' : ''}
          {forgotPassword ? 'Khôi phục mật khẩu' : ''}
          {resetPassword ? 'Đặt lại mật khẩu' : ''}
        </h3>
        <div className="btn-auth-wrapper mx-auto py-4">
          {loginBtn && (
            <GroupLogin
              visible={loginBtn}
              onNavigateEmail={navigateEmailLogin}
              onNavigatePhone={navigateToPhoneLogin}
            />
          )}
          {emailLogin && (
            <AnimateWrapper isVisible={emailLogin}>
              <EmailLogin onFinishConfirm={navigateGroupLogin} gotoForgotPassword={navigateForgotPassword} />
            </AnimateWrapper>
          )}
          {phoneLogin && (
            <AnimateWrapper isVisible={phoneLogin}>
              <PhoneLogin gotoForgotPassword={navigateForgotPassword} />
            </AnimateWrapper>
          )}
          {registerBtn && renderRegister()}
          {registerEmail && (
            <AnimateWrapper isVisible={registerEmail}>
              <EmailRegister gotoConfirmCode={navigateConfirmCode} gotoResendCode={navigateResendCode} />
            </AnimateWrapper>
          )}
          {registerPhone && (
            <AnimateWrapper isVisible={registerPhone}>
              <PhoneRegister />
            </AnimateWrapper>
          )}
          {confirmCode && (
            <AnimateWrapper isVisible={confirmCode}>
              <ConfirmCode emailConfirm={emailConfirm} onFinishConfirm={navigateGroupLogin} />
            </AnimateWrapper>
          )}
          {resendCode && (
            <AnimateWrapper isVisible={resendCode}>
              <ResendCode gotoConfirmCode={navigateConfirmCode} />
            </AnimateWrapper>
          )}
          {forgotPassword && (
            <AnimateWrapper isVisible={forgotPassword}>
              <ForgotPassword gotoResetPassword={navigateResetPassword} />
            </AnimateWrapper>
          )}
          {resetPassword && (
            <AnimateWrapper isVisible={resetPassword}>
              <ResetPassword emailConfirm={emailConfirm} gotoEmailLogin={navigateEmailLogin} />
            </AnimateWrapper>
          )}
          <div className="pt-4">{!(phoneLogin || emailLogin || registerEmail || registerPhone) && renderCheckText}</div>
        </div>
      </div>
    </Modal>
  );
};

AuthModal.propTypes = {
  toggle: func
};

export default AuthModal;
