import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { func } from 'prop-types';
import IonicIcons from 'components/IonicIcons';
import { useFormik } from 'formik';
import { AUTH_ENDPOINT } from 'constants/endpoints';
import i18n from 'locales/i18n';
import { useActions } from 'hooks/useActions';
import { getUserInfo, onAuthError } from 'redux/auth/actions';
import { closeLoginModal } from 'redux/common/actions';
import validate from 'components/AuthValidate';

const EmailRegister = ({ gotoConfirmCode = () => null, gotoResendCode = () => null }) => {
  const [err, setErr] = React.useState();
  const [getUserInfoAction, onAuthErrorAction, closeLoginModalAction] = useActions(
    [getUserInfo, onAuthError, closeLoginModal],
    null
  );
  const emailRegister = async ({ last_name, username, password }) => {
    try {
      const data = await AUTH_ENDPOINT.EMAIL_REGISTER({ username, password, last_name });
      if (data) gotoConfirmCode(username);
    } catch (errorMessage) {
      setErr(errorMessage);
      onAuthErrorAction(errorMessage);
    }
  };

  const formik = useFormik({
    initialValues: {
      lastName: '',
      email: '',
      password: ''
    },
    validate: values => validate(values, true),
    onSubmit: async values => {
      // alert(JSON.stringify(values, null, 2));
      await emailRegister({ last_name: values.lastName, username: values.email, password: values.password });
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
          <IonicIcons name="icon ion-md-person fz-30 text-primary" />
          <Input
            type="text"
            name="lastName"
            placeholder="Nhập tên tài khoản"
            className="text-center fz-16"
            bsSize="lg"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
        </FormGroup>
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className="color-error text-center">{formik.errors.lastName}</p>
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

        <Button className="w-100 bg-main border-0 fz-16 py-2">ĐĂNG KÝ</Button>
      </Form>
      {err && (
        <div className="error-area py-3">
          <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
        </div>
      )}
      <p className="mb-0 text-center color-font pt-3" onClick={() => gotoResendCode()}>
        <u className="ml-2 text-primary cursor-pointer">Xác thực email</u>
      </p>
    </div>
  );
};

EmailRegister.propTypes = {
  toggle: func,
  gotoConfirmCode: func,
  gotoResendCode: func
};

export default React.memo(EmailRegister);
