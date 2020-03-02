import React from 'react';
import Head from 'components/common/head';

const Home = props => {
  return (
    <div>
      <Head title="Trang chủ Top Sinh Vien" />
      <h1>Hello</h1>
    </div>
  );
};

Home.getInitialProps = ({ lamProps, req }) => {
  return {
    lamProps
  };
};

export default Home;
