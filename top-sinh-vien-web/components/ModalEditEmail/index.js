import React from 'react';
import { Button, Form, FormGroup, Input, Modal, ModalHeader } from 'reactstrap';
// styles
import './styles.scss';
import IonicIcons from 'components/IonicIcons';
import i18n from 'locales/i18n';
import { useFormik } from 'formik';
import { USER_ENDPOINT } from 'constants/endpoints';
import ReactCodeInput from 'react-verification-code-input';
import { useActions } from 'hooks/useActions';
import { updateUserInfo } from 'redux/auth/actions';
import { shallowEqual, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

const ModalEditEmail = ({ className, toggle, isOpen, close, updateEmailSuccess, ...props }) => {
  const [err, setErr] = React.useState();
  const [txtEmail, setTxtEmail] = React.useState();
  const [txtPassword, setTxtPassword] = React.useState();
  const [code, setCode] = React.useState(0);
  const [isEditEmail, setIsEditEmail] = React.useState(true);
  const [isConfirmUpdate, setIsConfirmUpdate] = React.useState(false);
  // const [emailValue, setEmailValue] = useModal();

  const closeModal = () => {
    close();
    setIsEditEmail(true);
    setIsConfirmUpdate(false);
  };

  const closeBtn = (
    <button className="close" onClick={() => closeModal()}>
      &times;
    </button>
  );

  const updateEmail = async ({ email, password }) => {
    try {
      const data = await USER_ENDPOINT.UPDATE_EMAIL({ email, password });
      if (data) {
        // toast.success(i18n.t(`update_profile_success`));
        setIsEditEmail(false);
        setIsConfirmUpdate(true);
        setErr('');
      }
    } catch (errorMessage) {
      setErr(errorMessage);
    }
  };

  const updateUserInfoAction = useActions(updateUserInfo);
  const user = useSelector(store => store.auth.user, shallowEqual);

  const confirmUpdateEmail = async ({ email, verify_code }) => {
    try {
      const data = await USER_ENDPOINT.UPDATE_CONFIRM_EMAIL({ email, verify_code });
      if (data) {
        console.log('Confirm thanh cong');
        updateEmailSuccess(txtEmail);
        closeModal();
        setErr('');
        updateUserInfoAction({
          ...user,
          email: txtEmail
        });
      }
    } catch (errorMessage) {
      setErr(errorMessage);
    }
  };

  const onClickConfirmUpdate = () => {
    confirmUpdateEmail({ email: txtEmail, verify_code: code });
  };

  const onChange = e => {
    setCode(e);
  };
  const onClickResendCode = () => {
    updateEmail({ email: txtEmail, password: txtPassword });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      await updateEmail({ email: values.email, password: values.password });
      setTxtEmail(values.email);
      setTxtPassword(values.password);
      resetForm();
    }
  });

  return (
    <div>
      <Modal isOpen={isOpen} className={'custom-modal'} toggle={toggle}>
        <ModalHeader close={closeBtn}></ModalHeader>
        <div className=" bg-white rounded">
          <div className="wrapper-edit-email mx-auto py-4">
            {isEditEmail && (
              <Form className="form-auth" onSubmit={formik.handleSubmit}>
                <FormGroup className="position-relative mb-4">
                  <IonicIcons name="icon ion-ios-mail fz-30 text-primary ic-mail position-absolute" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Nhập email mới"
                    className="text-center fz-16"
                    bsSize="lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email || ''}
                  />
                </FormGroup>

                {formik.touched.email && formik.errors.email ? (
                  <p className="color-error">{formik.errors.email}</p>
                ) : null}
                <FormGroup className="position-relative mb-4">
                  <IonicIcons name="icon ion-ios-lock fz-30 text-primary ic-mail position-absolute" />
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
                  <p className="color-error">{formik.errors.password}</p>
                ) : null}
                <Button className="bg-main w-100 border-0 fz-16 py-2">Nhận mã xác thực</Button>
              </Form>
            )}
            {isConfirmUpdate && (
              <div>
                <ReactCodeInput className="form-confirm-code" onChange={onChange} />
                <p className="py-3 mb-0 text-center">
                  Bạn chưa nhận được mã xác thực?
                  <a href="#" onClick={() => onClickResendCode()}>
                    Gửi lại
                  </a>
                </p>
                <Button
                  className="bg-main w-100 border-0 fz-16 py-2 mt-4"
                  disabled={code.length < 6}
                  onClick={() => onClickConfirmUpdate()}
                >
                  OK
                </Button>
              </div>
            )}
          </div>
          {err && (
            <div className="error-area py-3">
              <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalEditEmail;
