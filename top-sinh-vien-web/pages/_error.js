// @flow
import React from 'react';
import Head from 'components/common/head';
import Link from 'next/link';

type Props = {};

class Error extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  static defaultProps: Props = {};

  /**
   * Component life cycle
   **/
  componentDidMount() {}

  /**
   * Handler
   **/

  /**
   * Renderer
   **/
  render() {
    return (
      <div className="off-canvas-sidebar d-flex align-items-center justify-content-center">
        <Head title={`ERROR ${this.props.statusCode}`} />
        <div className="col-md-12 text-center" style={{ height: 'cac(100vh - 200px)' }}>
          <h1 className="title">404</h1>
          <h2>Page not found :(</h2>
          <h4>Ooooups! Looks like you got lost.</h4>
        </div>
      </div>
    );
  }
}

export default Error;
