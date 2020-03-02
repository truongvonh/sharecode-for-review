import React, { Component } from 'react';
import { render } from 'react-dom';
import ImageWithFallback from 'components/ImageWithFallback';

import './LoadListComment.scss';

class LoadListComment extends Component {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.data &&
          this.props.data.map((item, index) => (
            <div className="wrapper-comment-items" key={index}>
              <div className="wrapper-comment-item">
                <div className="d-flex mb-3">
                  <div className="wrapper-img-user">
                    <ImageWithFallback
                      src={item.pathAvatarImg}
                      className="rounded-circle avatar-user-comment"
                      alt="avatar-user-comment"
                    />
                  </div>
                  <div className="info-user-post">
                    <p className="user-name fz-16">
                      {item.userName} <img className="icon-friends-post" src="/static/img/icon-friends.svg" />
                    </p>
                    <p>
                      <span className="time-user-post fz-14">{item.timeComment} giờ trước</span>
                      <img className="icon-dot-post" src="/static/img/icon-dot.svg" alt="icon-dot" />
                      <span className="comment-reply fz-14" onClick={this.props.onClickSetModal}>
                        Trả lời
                      </span>
                    </p>
                  </div>
                </div>
                <span className="comment-content fz-16">{item.content} </span>
              </div>
              {item.childComments && (
                <LoadListComment
                  className="pl-5"
                  data={item.childComments}
                  onClickSetModal={this.props.onClickSetModal}
                />
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default LoadListComment;
