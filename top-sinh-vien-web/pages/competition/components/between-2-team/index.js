import React, { Component } from 'react';
import ImageWithFallback from 'components/ImageWithFallback';

// style
import './styles.scss';

class Team extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mb-4 mt-4">
        <div className="wrapper-team d-flex align-items-center justify-content-center flex-column flex-md-row">
          <div className="d-flex align-items-center justify-content-center pt-3 pb-3">
            <p className="university-name">{this.props.match.university1}</p>
            <ImageWithFallback
              src="/static/img/avatar-placeholder.png"
              className="rounded-circle user-avatar"
              alt="university-avatar"
            />
          </div>
          <div className="wrapper-group-center d-flex align-items-center">
            <div className="wrapper-vote d-flex flex-column justify-content-center align-items-center">
              <p>{this.props.match.vote1}</p>
              <p>vote</p>
            </div>
            <div className="wrapper-match d-flex flex-column justify-content-center align-items-center">
              <p>Trận {this.props.match.id}</p>
              <button className="btn-vote">VOTE</button>
            </div>
            <div className="wrapper-vote d-flex flex-column justify-content-center align-items-center">
              <p>{this.props.match.vote2}</p>
              <p>vote</p>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center pt-3 pb-3">
            <ImageWithFallback
              src="/static/img/user-avatar-follow.png"
              className="rounded-circle user-avatar"
              alt="university-avatar"
            />
            <p className="university-name">{this.props.match.university2}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
