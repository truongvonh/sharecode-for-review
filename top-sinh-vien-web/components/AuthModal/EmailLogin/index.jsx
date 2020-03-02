import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { func } from 'prop-types';
import IonicIcons from 'components/IonicIcons';
import { useFormik } from 'formik';
import { AUTH_ENDPOINT } from 'constants/endpoints';
import { useActions } from 'hooks/useActions';
import { getUserInfo, onAuthError } from 'redux/auth/actions';
import { closeLoginModal } from 'redux/common/actions';
import i18n from 'locales/i18n';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = i18n.t('form_validate.required_email');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18n.t('form_validate.invalid_email');
  }

  if (!values.password) {
    errors.password = i18n.t('form_validate.required_password');
  } else if (values.password.length < 6 || values.password.length > 30) {
    errors.password = i18n.t('form_validate.invalid_password');
  }

  return errors;
};

const EmailLogin = ({ onFinishConfirm, gotoForgotPassword }) => {
  const [getUserInfoAction, onAuthErrorAction, closeLoginModalAction] = useActions(
    [getUserInfo, onAuthError, closeLoginModal],
    null
  );
  const [err, setErr] = React.useState();
  const emailLogin = async ({ username, password }) => {
    try {
      await AUTH_ENDPOINT.LOGIN({ username, password });
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async values => {
      await emailLogin({ username: values.email, password: values.password });
    }
  });

  return (
    <div>
      <Form className="form-auth" onSubmit={formik.handleSubmit}>
        <FormGroup className="position-relative mb-4">
          <IonicIcons name="icon ion-ios-mail fz-30 text-primary" />
          <Input
            type="email"
            name="email"
            placeholder="Nhập email"
            className="text-center fz-16"
            bsSize="lg"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </FormGroup>
        {formik.touched.email && formik.errors.email ? (
          <p className="color-error text-center">{formik.errors.email}</p>
        ) : null}
        <FormGroup className="position-relative mb-4">
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

        <p className="pb-4 mb-0 text-center cursor-pointer">
          <u className="color-link" onClick={() => gotoForgotPassword()}>
            Quên mật khẩu
          </u>
        </p>
        <Button className="bg-main w-100 border-0 fz-16 py-2">ĐĂNG NHẬP</Button>
      </Form>
      {err && (
        <div className="error-area py-3">
          <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
        </div>
      )}
    </div>
  );
};

EmailLogin.propTypes = {
  toggle: func,
  onFinishConfirm: func
};

export default React.memo(EmailLogin);
