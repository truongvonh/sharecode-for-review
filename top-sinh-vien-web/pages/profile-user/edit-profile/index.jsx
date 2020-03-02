import React, { useState } from 'react';
import { ACCOUNT_TYPE, ALL_GENDER } from 'constants/common';
import { Formik } from 'formik';
import i18n from 'locales/i18n';
import { getNestedObjectSafe } from 'utils/helper';
import moment from 'moment';
import Select from 'react-select';
import { ConsumerProfiler } from 'layout/ProfileUserWrapper';

import { COMMON_ENDPOINT, SCHOOL_ENDPOINT, USER_ENDPOINT } from 'constants/endpoints';

import DatePicker from 'react-datepicker';
import { shallowEqual, useSelector } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

import './style.scss';
import { Alert } from 'reactstrap';
import { useRouter } from 'next/router';
import Head from 'components/common/head';
import ModalEditEmail from 'components/ModalEditEmail';
import useModal from 'hooks/useModal';
import { toast } from 'react-toastify';

const max_chars = 100;

const validate = values => {
  const errors = {};

  if (!values.lastName) {
    errors.lastName = i18n.t('form_validate.required_lastName');
  } else if (
    !/^[a-zA-Z._-\s{1}\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]+$/i.test(
      values.lastName
    )
  ) {
    errors.lastName = i18n.t('form_validate.invalid_lastName');
  }

  return errors;
};

const EditProfile = ({ user_id, profileInfo }) => {
  const [areaCharsLeft, setAreaCharsLeft] = React.useState(100);
  const [listSchool, setListSchool] = React.useState([]);
  const [provinceCity, setProvinceCity] = React.useState([]);
  const [defaultSchool, setDefaultSchool] = React.useState({});
  const [defaultCity, setDefaultCity] = React.useState({});
  const [decribeValue, setDecribeValue] = React.useState();
  const [startDate, setStartDate] = useState();
  const [visible, setVisible] = useState(false);
  const [isTypeEmail, setIsTypeEmail] = useState(false);
  const [err, setErr] = React.useState();
  const [isShowingEditEmail, toggleEditEmail, closeEditEmail] = useModal(false);
  const [emailValue, setEmailValue] = useState();

  const onDismiss = () => setVisible(false);

  React.useEffect(() => {
    const defaultSchool =
      listSchool.length > 0 &&
      listSchool.find(item => item._id == getNestedObjectSafe(profileInfo, ['profile', 'school', '_id']));
    if (defaultSchool) {
      setDefaultSchool({ label: defaultSchool.name, value: defaultSchool._id });
    }
  }, [listSchool.length, profileInfo]);

  React.useEffect(() => {
    const defaultCity =
      provinceCity.length > 0 &&
      (getNestedObjectSafe(profileInfo, ['profile', 'address']) || []).length > 0 &&
      provinceCity.find(item => item.city === getNestedObjectSafe(profileInfo, ['profile', 'address']));
    if (defaultCity) {
      setDefaultCity({ label: defaultCity.city, value: defaultCity.city });
    }
  }, [provinceCity, profileInfo]);

  React.useEffect(() => {
    if (
      profileInfo &&
      profileInfo.profile &&
      profileInfo.profile.dateOfBirth &&
      profileInfo.profile.dateOfBirth !== ''
    ) {
      const defaultBirthDay = moment(getNestedObjectSafe(profileInfo, ['profile', 'dateOfBirth'])).format('YYYY,MM,DD');
      setStartDate(new Date(defaultBirthDay));
    } else {
      setStartDate('');
    }
    setDecribeValue(getNestedObjectSafe(profileInfo, ['profile', 'describe']));
    if (profileInfo && profileInfo.profile && profileInfo.profile.describe) {
      setAreaCharsLeft(max_chars - getNestedObjectSafe(profileInfo, ['profile', 'describe']).length);
    }
    if (getNestedObjectSafe(profileInfo, ['accountType']) === ACCOUNT_TYPE.EMAIL_PHONE) {
      setIsTypeEmail(true);
    }
    setEmailValue(getNestedObjectSafe(profileInfo, ['email']));
  }, [profileInfo]);

  const handleChangeArea = event => {
    const input = event.target.value;
    const chars_left = max_chars - input.length;
    setAreaCharsLeft(chars_left);
    setDecribeValue(input);
  };

  const initialValues = {
    lastName: getNestedObjectSafe(profileInfo, ['profile', 'fullName']),
    // email: getNestedObjectSafe(profileInfo, ['email']),
    birthDay: getNestedObjectSafe(profileInfo, ['profile', 'dateOfBirth']),
    gender: getNestedObjectSafe(profileInfo, ['profile', 'gender'])
    // describe: getNestedObjectSafe(profileInfo, ['profileInfo', 'profile', 'describe'])
  };

  const getListSchool = async ({ page, limit }) => {
    try {
      const school = await SCHOOL_ENDPOINT.LIST_SCHOOL({ page, limit });
      setListSchool(school.length ? school.map(item => ({ ...item, value: item._id, label: item.name })) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const getProvinceCity = async () => {
    try {
      const data = await COMMON_ENDPOINT.SEARCH_PROVINCE();
      setProvinceCity(data.length ? data.map(item => ({ ...item, value: item.city, label: item.city })) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeSchool = selectedOption => {
    setDefaultSchool({ label: selectedOption.label, value: selectedOption.value });
  };

  const handleChangeCity = selectedOption => {
    setDefaultCity({ label: selectedOption.label, value: selectedOption.value });
  };

  const updateEmailSuccess = email => {
    setEmailValue(email);
  };

  const updateProfileInfo = async ({ last_name, gender, date_of_birth, school, address, describe }) => {
    try {
      const data = await USER_ENDPOINT.UPDATE_USER_INFO({
        last_name,
        gender,
        date_of_birth,
        school,
        address,
        describe
      });
      if (data) {
        toast.success(i18n.t(`update_profile_success`));
      }
    } catch (errorMessage) {
      setErr(errorMessage);
      toast.error(i18n.t(`error.${errorMessage}`));
    }
  };

  const listGender = ['Nam', 'Nữ', 'Khác'];

  React.useEffect(() => {
    getListSchool({ page: 1, limit: 1000 });
    getProvinceCity();
  }, []);

  return (
    <>
      <Head title="Chỉnh sửa thông tin cá nhân" />
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validate={validate}
        isSubmitting
        onSubmit={(values, actions) => {
          setTimeout(() => {
            updateProfileInfo({
              last_name: values.lastName,
              gender: values.gender,
              date_of_birth: startDate || undefined,
              school: defaultSchool.value,
              address: defaultCity.value || undefined,
              describe: decribeValue
            });
          }, 500);
        }}
      >
        {props => {
          return (
            <div>
              <ModalEditEmail
                isOpen={isShowingEditEmail}
                toggle={toggleEditEmail}
                close={closeEditEmail}
                updateEmailSuccess={updateEmailSuccess}
              />
              <form onSubmit={props.handleSubmit}>
                <div className="d-flex align-items-center w-100 justify-content-center">
                  <div className="wrapper-edit-profile d-flex flex-column w-100 mt-4 col-9">
                    <div className="wrapper-title d-flex justify-content-center align-items-center pt-4 pb-4">
                      <p className="font-weight-bold fz-20 title">Chỉnh sửa thông tin cá nhân</p>
                    </div>

                    <div className="wrapper-content-edit">
                      <div className="form-group pt-3">
                        <label className="label-edit fz-14 font-weight-medium">
                          Họ và tên <span className="ic-obligatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control font-weight-bold fz-14 input-text-control"
                          name="lastName"
                          onChange={props.handleChange}
                          value={props.values.lastName}
                        />
                        {props.errors.lastName ? <div className="text-danger">{props.errors.lastName}</div> : null}
                      </div>

                      <p className="label-edit fz-14 font-weight-medium pb-2">Giới tính</p>
                      <div className="group-button pb-2">
                        {Object.keys(ALL_GENDER).map((item, index) => (
                          <div className="custom-control custom-radio custom-control-inline" key={index}>
                            <input
                              type="radio"
                              className="custom-control-input"
                              id={`defaultInline${index}`}
                              name="gender"
                              checked={props.values.gender === index}
                              onChange={() => props.setFieldValue('gender', index)}
                            />
                            <label
                              className="custom-control-label font-weight-bold fz-14"
                              htmlFor={`defaultInline${index}`}
                            >
                              {listGender[index]}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="form-group">
                        <label className="label-edit fz-14 font-weight-medium">Ngày sinh</label>

                        <div className="d-flex align-items-center">
                          <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            className="font-weight-bold fz-14 input-text-control w-100"
                          />
                          {/*<span className="pl-2 fz-12 font-weight-medium cursor-pointer">Ẩn</span>*/}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="label-edit fz-14 font-weight-medium">
                          Trường học <span className="ic-obligatory">*</span>
                        </label>
                        {listSchool && defaultSchool && (
                          <Select
                            className="font-weight-bold fz-14"
                            options={listSchool}
                            value={defaultSchool}
                            onChange={handleChangeSchool}
                          />
                        )}
                      </div>

                      <div className="form-group">
                        <label className="label-edit fz-14 font-weight-medium">Tỉnh thành</label>
                        {provinceCity && defaultCity && (
                          <Select
                            className="font-weight-bold fz-14"
                            options={provinceCity}
                            value={defaultCity}
                            onChange={handleChangeCity}
                          />
                        )}
                      </div>

                      <div className="form-group">
                        <label className="label-edit fz-14 font-weight-medium">Email</label>
                        <div className="d-flex align-items-center">
                          {emailValue && (
                            <input
                              type="text"
                              className="form-control font-weight-bold fz-14 input-text-control"
                              name="email"
                              value={emailValue}
                              disabled={true}
                            />
                          )}

                          {/*<img src="/static/img/ic_an_thong tin.png" />*/}
                          {/*<span className="pl-2 fz-12 font-weight-medium cursor-pointer">Ẩn</span>*/}
                          {isTypeEmail && (
                            <img
                              className="cursor-pointer pl-3"
                              src="/static/img/ic_edit.png"
                              onClick={() => toggleEditEmail()}
                            />
                          )}
                        </div>
                        {/*{props.errors.email ? <div className="text-danger">{props.errors.email}</div> : null}*/}
                      </div>

                      <div className="form-group">
                        <label className="label-edit fz-14 font-weight-medium">Điện thoại</label>
                        <div className="d-flex align-items-center">
                          <input
                            type="text"
                            className="form-control font-weight-bold fz-14 input-text-control"
                            name="phoneNumber"
                            onChange={props.handleChange}
                            value={props.values.phoneNumber}
                            disabled={true}
                          />
                          {isTypeEmail && <img className="cursor-pointer pl-3" src="/static/img/ic_edit.png" />}

                          {/*<img src="/static/img/ic_an_thong tin.png" />*/}
                          {/*<span className="pl-2 fz-12 font-weight-medium cursor-pointer">Ẩn</span>*/}
                        </div>
                        {props.errors.phoneNumber ? (
                          <div className="text-danger">{props.errors.phoneNumber}</div>
                        ) : null}
                      </div>

                      <div>
                        <p className="label-edit fz-14 font-weight-medium">Mô tả thêm</p>
                        <div className="position-relative">
                          <textarea
                            className="form-control font-weight-bold fz-14"
                            id="exampleFormControlTextarea3"
                            rows="5"
                            onChange={handleChangeArea}
                            maxLength="100"
                            name="describe"
                            value={decribeValue}
                          />
                          <span className="position-absolute area-count font-weight-bold fz-12">
                            {areaCharsLeft}/100
                          </span>
                        </div>
                      </div>
                    </div>
                    {err && (
                      <div className="error-area py-3">
                        <p className="mb-0 text-danger font-weight-bold fz-14 text-center">{i18n.t(`error.${err}`)}</p>
                      </div>
                    )}
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <button className="btn-save fz-14 font-weight-bold mb-3 mt-3 py-2 px-4" type="submit">
                        Lưu thông tin
                      </button>
                    </div>
                  </div>
                </div>
                {/*<div className="d-flex align-items-center justify-content-center">*/}
                {/*  <Alert color="success" isOpen={visible} toggle={onDismiss} className="mt-3 col-6">*/}
                {/*    Cập nhật thành công!*/}
                {/*  </Alert>*/}
                {/*</div>*/}
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

const WrapperEditProfile = () => {
  const user = useSelector(store => store.auth.user, shallowEqual);
  const router = useRouter();

  // useEffect(() => {
  //   if (user && user._id === router.query.user_id) return false;
  //   else {
  //     Router.replaceRoute(`/profile-user/${PROFILE_USER_TYPE.TIME_LINE}/${router.query.user_id}`);
  //   }
  //   // return () => null;
  // }, []);

  return (
    <ConsumerProfiler>
      {context => (
        <React.Fragment>
          <EditProfile
            user_id={context.user_id}
            profileInfo={context.profileInfo}
            onClickStatus={context.onClickStatus}
            isEditProfile={context.isEditProfile}
          />
        </React.Fragment>
      )}
    </ConsumerProfiler>
  );
};

WrapperEditProfile.contextType = ConsumerProfiler;

export default WrapperEditProfile;
