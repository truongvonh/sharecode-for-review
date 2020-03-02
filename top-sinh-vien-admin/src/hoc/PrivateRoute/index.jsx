import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { any, element, string, bool, func, object } from 'prop-types';
import { getMe } from '../../store/auth/actions';
import { bindActionCreators } from 'redux';
import { ALL_PERMISSIONS } from 'constant';
import { history } from 'store';
import { isValidRouter } from 'utils/helper';

const PrivateRoute = ({
                        component: Component,
                        isAuthenticated,
                        isLoading,
                        authorization,
                        getMe,
                        user,
                        ...rest
                      }) => {

  useEffect(() => {
    if (!isAuthenticated) getMe();
  }, []);

  useEffect(() => {
    if (user) {

      if (!isValidRouter(user, authorization))
        history.replace('/dashboard');
      
    }
  }, [user]);
  
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && !isLoading ? (
          <Component {...props} />
        ) : (
          !isAuthenticated && !isLoading && <Redirect
            to={{
              pathname: '/auth/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  location: any,
  component: element,
  isAuthenticated: string,
  authorization: string,
  isLoading: bool,
  user: object,
  getMe: func
};

const mapStateToProps = store => ({
  isLoading: store.auth.isLoading,
  isAuthenticated: store.auth.user && store.auth.user._id,
  user: store.auth.user
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(
    { getMe },
    dispatch
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);