import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { func } from 'prop-types';
import IonicIcons from 'components/IonicIcons';
import { useFormik } from 'formik';
import { AUTH_ENDPOINT } from 'constants/endpoints';
import i18n from 'locales/i18n';
import ReactCodeInput from 'react-verification-code-input';
import { useActions } from 'hooks/useActions';
import { getUserInfo, onAuthError } from 'redux/auth/actions';
import { closeLoginModal } from 'redux/common/actions';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = i18n.t('form_validate.required_password');
  } else if (values.password.length < 6 || values.password.length > 30) {
    errors.password = i18n.t('form_validate.invalid_password');
  }

  if (!values.rePassword) {
    errors.rePassword = i18n.t('form_validate.required_rePassword');
  } else if (values.password != values.rePassword) {
    errors.rePassword = i18n.t('form_validate.invalid_rePassword');
  }

  return errors;
};

const EmailRegister = ({ emailConfirm, gotoEmailLogin }) => {
  const [err, setErr] = React.useState();
  const [code, setCode] = React.useState();
  const [getUserInfoAction, onAuthErrorAction, closeLoginModalAction] = useActions(
    [getUserInfo, onAuthError, closeLoginModal],
    null
  );

  const forgotPassWordConfirm = async ({ verify_code, username, new_password, confirm_password }) => {
    try {
      const data = await AUTH_ENDPOINT.FORGOT_PASSWORD_CONFIRM({
        verify_code,
        username,
        new_password,
        confirm_password
      });
      // const user = await AUTH_ENDPOINT.GET_USER_INFO();
      if (data) {
        gotoEmailLogin();
      }
    } catch (errorMessage) {
      setErr(errorMessage);
      onAuthErrorAction(errorMessage);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      rePassword: ''
    },
    validate,
    onSubmit: async values => {
      // alert(JSON.stringify(values, null, 2));
      await forgotPassWordConfirm({
        verify_code: code,
        username: emailConfirm,
        new_password: values.password,
        confirm_password: values.rePassword
      });
    }
  });

  const onChange = e => {
    setCode(e);
    // console.log(e);
  };

  return (
    <div>
      <Form className="form-auth" onSubmit={formik.handleSubmit}>
        <ReactCodeInput className="form-confirm-code" onChange={onChange} />
        <FormGroup className="position-relative mb-4 mt-4">
          <IonicIcons name="icon ion-ios-lock fz-30 text-primary" />
          <Input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            className="text-center fz-16"
            bsSize="lg"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </FormGroup>
        {formik.touched.password && formik.errors.password ? (
          <p className="color-error text-center">{formik.errors.password}</p>
        ) : null}
        <FormGroup className="position-relative mb-4">
          <IonicIcons name="icon ion-ios-lock fz-30 text-primary" />
          <Input
            type="password"
            name="rePassword"
            placeholder="Nhập lại mật khẩu"
            className="text-center fz-16"
            bsSize="lg"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
          />
        </FormGroup>
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <p className="color-error text-center">{formik.errors.rePassword}</p>
        ) : null}
        <Button className="w-100 bg-main border-0 fz-16 py-2">OK</Button>
      </Form>
      {err && (
        <div className="error-area py-3">
          <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
        </div>
      )}
    </div>
  );
};

EmailRegister.propTypes = {
  toggle: func,
  gotoConfirmCode: func,
  gotoResendCode: func
};

export default React.memo(EmailRegister);
