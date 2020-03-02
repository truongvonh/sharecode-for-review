import React from 'react';
import { Button, Form } from 'reactstrap';
import { func } from 'prop-types';
import { AUTH_ENDPOINT } from 'constants/endpoints';
import ReactCodeInput from 'react-verification-code-input';

import './style.scss';
import { useActions } from 'hooks/useActions';
import { getUserInfo, onAuthError } from 'redux/auth/actions';
import { closeLoginModal } from 'redux/common/actions';
import i18n from 'locales/i18n';

const ConfirmCode = ({ emailConfirm, onFinishConfirm }) => {
  const [code, setCode] = React.useState(0);
  const [err, setErr] = React.useState();
  const [getUserInfoAction, onAuthErrorAction, closeLoginModalAction] = useActions(
    [getUserInfo, onAuthError, closeLoginModal],
    null
  );

  const confirmCode = async ({ verify_code, username }) => {
    try {
      await AUTH_ENDPOINT.CONFIRM_CODE({ verify_code, username });
      const user = await AUTH_ENDPOINT.GET_USER_INFO();
      if (user) {
        getUserInfoAction(user);
        closeLoginModalAction();
        onFinishConfirm();
      }
    } catch (errorMessage) {
      setErr(errorMessage);
      onAuthErrorAction(errorMessage);
    }
  };

  const resendCode = async ({ username }) => {
    try {
      await AUTH_ENDPOINT.RE_SEND_CODE({ username });
    } catch (errorMessage) {
      setErr(errorMessage);
    }
  };

  const onClickResendCode = () => {
    resendCode({ username: emailConfirm });
  };

  const onChange = e => {
    setCode(e);
  };

  const confirmFunc = async e => {
    e.preventDefault();
    await confirmCode({ verify_code: code, username: emailConfirm });
  };

  return (
    <div>
      <Form className="form-auth" onSubmit={confirmFunc}>
        <ReactCodeInput className="form-confirm-code" onChange={onChange} />
        <p className="py-3 mb-0 text-center">
          Bạn chưa nhận được mã xác thực?
          <a href="#" onClick={() => onClickResendCode()}>
            {' '}
            Gửi lại
          </a>
        </p>
        <Button className="bg-main w-100 border-0 fz-16 py-2" disabled={code.length < 6}>
          OK
        </Button>
      </Form>
      {err && (
        <div className="error-area py-3">
          <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
        </div>
      )}
    </div>
  );
};

ConfirmCode.propTypes = {
  toggle: func,
  emailConfirm: func,
  onFinishConfirm: func
};

export default React.memo(ConfirmCode);
