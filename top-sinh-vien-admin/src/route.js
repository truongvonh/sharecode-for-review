import React from 'react';

// const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const SignIn = React.lazy(() => import('./pages/Authentication/SignIn'));

const route = [
    { path: '/auth/signin', exact: true, name: 'Signin 1', component: SignIn }
];

export default route;