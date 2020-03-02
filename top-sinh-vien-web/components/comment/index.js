import React, { Component } from 'react';
import { render } from 'react-dom';
import CommentModel from '../../models/comment';
import PopupModalDownload from '../PopupModalDownload';
import ImageWithFallback from 'components/ImageWithFallback';
import LoadListComment from './LoadListComment';

import './styles.scss';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setModal: false
    };
  }

  data = [
    {
      userId: 0,
      userName: 'Mai Hương',
      pathAvatarImg: '/static/img/avatar-placeholder.png',
      timeComment: '7',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s',
      childComments: [
        {
          userId: 0,
          userName: 'Mai Hương 1',
          pathAvatarImg: '/static/img/avatar-placeholder.png',
          timeComment: '3',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s'
        },
        {
          userId: 1,
          userName: 'Hương Mai 3',
          pathAvatarImg: '/static/img/user-avatar-follow.png',
          timeComment: '4',
          content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s'
        }
      ]
    },
    {
      userId: 1,
      userName: 'Hương Mai',
      pathAvatarImg: '/static/img/avatar-user-2.png',
      timeComment: '6',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s'
    },
    {
      userId: 2,
      userName: 'Đức Tuấn',
      pathAvatarImg: '/static/img/user-avatar-follow.png',
      timeComment: '2',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s'
    },
    {
      userId: 3,
      userName: 'Phương Lan',
      pathAvatarImg: '/static/img/avatar-user-2.png',
      timeComment: '1',
      content:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s'
    }
  ];

  onClickSetModal = setModal => {
    this.setState({ setModal: !this.state.setModal });
  };

  onCloseModal() {
    this.setState({ setModal: false });
  }

  onEnterSetModal = e => {
    if (e.key === 'Enter') {
      this.setState({ setModal: !this.state.setModal });
    }
  };

  render() {
    const fakeData = this.data.map(item => new CommentModel(item));
    return (
      <div className="wrapper-comments mt-4">
        <div className="comment-title">
          <h4 className="fz-18">Bình luận (20)</h4>
        </div>
        <PopupModalDownload
          setModal={this.state.setModal}
          onClickSetModal={this.onClickSetModal}
          onCloseModal={this.onCloseModal}
        />
        <div className="wrapper-input-comment">
          <div className="wrapper-comment">
            <ImageWithFallback
              src="/static/img/avatar-placeholder.png"
              className="avatar-user-comment rounded-circle"
              alt="avatar-user-comment"
            />
            <div className="group-input-comment">
              <input
                type="text"
                className="user-input-comment"
                placeholder="Bạn vui lòng tải App Top Sinh viên để thực hiện chức năng này"
                onKeyDown={this.onEnterSetModal}
                onClick={this.onClickSetModal}
              />
              <div className="group-input-icon">
                <img onClick={this.onClickSetModal} src="/static/img/icon-smile.svg" alt="icon-smile" />
                <img onClick={this.onClickSetModal} src="/static/img/icon-image.svg" alt="icon-image" />
              </div>
            </div>
            <button className="btn-send d-none d-sm-block" onClick={this.onClickSetModal}>
              <img className="icon-send" src="/static/img/icon-send-arrow.svg" alt="icon-send" />
            </button>
          </div>
          <div className="list-comment">
            <LoadListComment data={fakeData} onClickSetModal={this.onClickSetModal} />
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
