import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { func } from 'prop-types';
import { AUTH_ENDPOINT } from 'constants/endpoints';

import IonicIcons from 'components/IonicIcons';
import { useFormik } from 'formik';
import i18n from 'locales/i18n';
import { useActions } from 'hooks/useActions';
import { getUserInfo, onAuthError } from 'redux/auth/actions';
import { closeLoginModal } from 'redux/common/actions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = i18n.t('form_validate.required_email');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18n.t('form_validate.invalid_email');
  }
  return errors;
};

const ForgotPassword = ({ gotoResetPassword = () => null }) => {
  const [err, setErr] = React.useState();
  const [getUserInfoAction, onAuthErrorAction, closeLoginModalAction] = useActions(
    [getUserInfo, onAuthError, closeLoginModal],
    null
  );

  const forgotPassword = async ({ username }) => {
    try {
      const data = await AUTH_ENDPOINT.FORGOT_PASSWORD({ username });
      if (data) gotoResetPassword(username);
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
    validate,
    onSubmit: async values => {
      await forgotPassword({ username: values.email });
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

        {formik.touched.email && formik.errors.email ? <p className="color-error text-center">{formik.errors.email}</p> : null}
        <Button className="bg-main w-100 border-0 fz-16 py-2">Nhận mã khôi phục</Button>
      </Form>
      {err && (
        <div className="error-area py-3">
          <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
        </div>
      )}
    </div>
  );
};

ForgotPassword.propTypes = {
  toggle: func,
  gotoConfirmCode: func
};

export default React.memo(ForgotPassword);
