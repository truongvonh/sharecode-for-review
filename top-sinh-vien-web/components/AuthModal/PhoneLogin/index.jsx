import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { func } from 'prop-types';
import IonicIcons from 'components/IonicIcons';
import i18n from 'locales/i18n';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};
  let phoneValue = '+84' + values.phone;

  if (!values.phone) {
    errors.phone = i18n.t('form_validate.required_phone');
  } else if (!/(\+[0-9]{1,2})([0-9]{10,11})+$/.test(phoneValue)) {
    errors.phone = i18n.t('form_validate.invalid_phone');
  }

  if (!values.password) {
    errors.password = i18n.t('form_validate.required_password');
  } else if (values.password.length < 6 || values.password.length > 30) {
    errors.password = i18n.t('form_validate.invalid_password');
  }

  return errors;
};

const PhoneLogin = ({ onFinishConfirm, gotoForgotPassword }) => {
  const formik = useFormik({
    initialValues: {
      lastName: '',
      phone: '',
      password: ''
    },
    validate,
    onSubmit: async values => {
      alert(JSON.stringify(values, null, 2));
      // await emailRegister({ last_name: values.lastName, username: values.email, password: values.password });
    }
  });
  return (
    <Form className="form-auth">
      <FormGroup className="position-relative mb-4 d-flex align-items-center">
        <Input
          type="text"
          className="text-center text-primary fz-16 w-25 mr-2  bg-white"
          disabled
          value="+84"
          bsSize="lg"
        />
        <Input
          type="text"
          name="phone"
          placeholder="Nhập số điện thoại"
          className="text-center fz-16 w-75"
          bsSize="lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
      </FormGroup>
      {formik.touched.phone && formik.errors.phone ? (
        <p className="color-error text-center">{formik.errors.phone}</p>
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
  );
};

PhoneLogin.propTypes = {
  toggle: func
};

export default React.memo(PhoneLogin);
