import React from 'react';
import { AUTH_ENDPOINT, GROUP_ENDPOINT } from 'constants/endpoints';
import { User } from 'models/user';
import { getUserInfo } from './actions';
import { getAllGroup } from 'redux/common/actions';
import { getNestedObjectSafe } from 'utils/helper';

export default App =>
  class AppWithAuth extends React.PureComponent {

    static async getInitialProps(appContext) {
      const reduxStore = appContext.ctx.reduxStore;
      const { req, res } = appContext.ctx;
      const pathname = appContext.ctx.pathname;

      if (!process.browser) {
        let userInfo;

        try {
          const allGroups = await GROUP_ENDPOINT.GET_ALL_GROUP();
          reduxStore.dispatch(getAllGroup(allGroups));
          userInfo = await AUTH_ENDPOINT.GET_USER_INFO({
            // cookie: appContext.ctx.req.headers.cookie
            cookie: (getNestedObjectSafe(appContext, ['ctx', 'req', 'headers', 'cookie']) || '')
          });
          reduxStore.dispatch(getUserInfo(userInfo));
        } catch (e) {
          console.log('with auth error = ', e);
        }
      }

      let appProps = {};

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps
      };
    }

    render() {
      return <App {...this.props} />;
    }
  };
