import React from 'react';

export default function useNavigateLogin() {
  const [loginBtn, setVisibleLoginBtn] = React.useState(true);
  const [emailLogin, setEmailLogin] = React.useState(false);
  const [phoneLogin, setPhoneLogin] = React.useState(false);
  const [confirmCode, setConfirmCode] = React.useState(false);
  const [emailConfirm, setEmailConfirm] = React.useState('');

  const [registerBtn, setRegisterBtn] = React.useState(false);
  const [registerPhone, setRegisterPhone] = React.useState(false);
  const [registerEmail, setRegisterEmail] = React.useState(false);
  const [resendCode, setResendCode] = React.useState(false);
  const [forgotPassword, setForgotPassword] = React.useState(false);
  const [resetPassword, setResetPassword] = React.useState(false);

  const navigateEmailLogin = () => {
    setVisibleLoginBtn(false);

    setEmailLogin(true);
    setResetPassword(false);
  };

  const navigateResendCode = () => {
    setResendCode(true);
    setRegisterEmail(false);
  };

  const navigateResetPassword = email => {
    setResetPassword(true);
    setForgotPassword(false);
    setEmailConfirm(email);
  };

  const navigateForgotPassword = () => {
    setForgotPassword(true);
    setEmailLogin(false);
    setPhoneLogin(false);
  };

  const navigateConfirmCode = email => {
    setRegisterEmail(false);
    setEmailConfirm(email);
    setConfirmCode(true);
    if (resendCode) setResendCode(false);
  };

  const navigateGroupLogin = () => {
    setVisibleLoginBtn(true);
    setEmailLogin(false);
    setPhoneLogin(false);
    setResendCode(false);
    setRegisterBtn(false);
    setRegisterPhone(false);
    setRegisterEmail(false);
    setConfirmCode(false);
    setForgotPassword(false);
    setResetPassword(false);
  };

  const navigateToPhoneLogin = () => {
    setPhoneLogin(true);
    setVisibleLoginBtn(false);
  };

  const navigateRegister = () => {
    setRegisterBtn(true);
    setVisibleLoginBtn(false);
  };

  const navigateEmailRegister = () => {
    setRegisterEmail(true);
    setRegisterBtn(false);
  };

  const navigatePhoneRegister = () => {
    setRegisterPhone(true);
    setRegisterBtn(false);
  };

  return {
    // all navigate function
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

    // all navigate status
    loginBtn,
    emailLogin,
    phoneLogin,
    registerBtn,
    registerPhone,
    registerEmail,
    confirmCode,
    emailConfirm,
    resendCode,
    forgotPassword,
    resetPassword
  };
}
