import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { func } from 'prop-types';
import IonicIcons from 'components/IonicIcons';
import { useFormik } from 'formik';
import validate from 'components/AuthValidate';
import { AUTH_ENDPOINT } from 'constants/endpoints';

const PhoneRegister = ({ gotoConfirmCode = () => null, gotoResendCode = () => null }) => {
  const [err, setErr] = React.useState();
  const phoneRegister = async ({ last_name, username, password }) => {
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
      phone: '',
      password: ''
    },
    validate: values => validate(values, false),
    onSubmit: async values => {
      alert(JSON.stringify(values, null, 2));
      // await emailRegister({ last_name: values.lastName, username: values.email, password: values.password });
    }
  });
  return (
    <Form className="form-auth" onSubmit={formik.handleSubmit}>
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

      <Button className="bg-main w-100 border-0 fz-16 py-2">ĐĂNG KÝ</Button>
    </Form>
  );
};

PhoneRegister.propTypes = {
  toggle: func
};

export default React.memo(PhoneRegister);
