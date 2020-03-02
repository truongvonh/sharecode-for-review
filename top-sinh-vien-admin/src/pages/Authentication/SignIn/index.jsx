import React, { memo, useState, useEffect } from 'react';
import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';
import { USER_ENDPOINT } from '../../../api/constant';
import { connect } from 'react-redux';
import { getMe } from '../../../store/auth/actions';
import { bindActionCreators } from 'redux';
import { object, string, func } from 'prop-types';
import { toast } from 'react-toastify';

const SignIn = ({ history, getMe, isAuthenticated }) => {
  const [loginInfor, setLoginInfor] = useState({});
  const [accessToken, setAccessToken] = useState('');

  const onLogin = async () => {
    try {
      const result = await USER_ENDPOINT.LOGIN(loginInfor);
      if (result.accessToken) {
        setAccessToken(result.accessToken);
        getMe();
        toast.success('Login success!');
      } 
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && accessToken) history.replace('/dashboard');
  }, [isAuthenticated, accessToken]);

  const onChangeInput = e => {
    setLoginInfor({
      ...loginInfor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input type="email" className="form-control" name="username" onChange={onChangeInput} placeholder="Email" />
              </div>
              <div className="input-group mb-4">
                <input type="password" className="form-control" name="password" onChange={onChangeInput} placeholder="password" />
              </div>
              <button onClick={onLogin} className="btn btn-primary shadow-2 mb-4">Login</button>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

SignIn.propTypes = {
  history: object,
  isAuthenticated: string,
  getMe: func
};

const mapPropToState = store => ({
  isAuthenticated: store.auth.user && store.auth.user._id
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(
    { getMe },
    dispatch
  )
);

export default connect(mapPropToState, mapDispatchToProps)(memo(SignIn));