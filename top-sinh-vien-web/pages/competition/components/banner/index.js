import React, { Component } from 'react';

// style
import './styles.scss';

class Banner extends Component {
  render() {
    return (
      <div className="wrapper-banner">
        <img className="banner" src="/static/img/banner.png" alt="banner" />
        <div className="wrapper-banner-button">
          <button className="fz-12">Thể lệ</button>
          <button className="fz-12">Giải thưởng</button>
        </div>
      </div>
    );
  }
}

export default Banner;
