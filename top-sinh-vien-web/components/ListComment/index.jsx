import { Link } from 'routes/routesConfig';
import { getFromNow, getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import { array, bool, func, object } from 'prop-types';
import React from 'react';
import './style.scss';
import IonicIcons from 'components/IonicIcons';
import {
  UncontrolledPopover,
} from 'reactstrap';
import { NAVIGATE_URL } from 'constants/url';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { Animated } from 'react-animated-css';
import ConfirmModal from 'components/ConfirmModal';
import Lightbox from 'react-image-lightbox';

const CommentPhotoWithLightBox = ({ comment }) => {
  const [isOpenLightBox, toggleLightBox, closeLightBox] = useModal(false);

  return (
    (getNestedObjectSafe(comment, ['photos']) || []).length > 0 && (
      <div className="mt-3 comment-photo-wrapper cursor-pointer" onClick={toggleLightBox} >
        <ImageWithFallback src={getNestedObjectSafe(comment, ['photos', 0, 'thumb'])} />
        { isOpenLightBox && (
          <Lightbox mainSrc={getNestedObjectSafe(comment, ['photos', 0, 'origin'])}
                    onCloseRequest={closeLightBox} />
        ) }
      </div>
    )
  );
};

const CommentItem = ({
  comment,
  onReplyComment = () => null,
  onEditComment = () => null,
  onRemoveComment = () => null,
  onLoadMoreReply = () => null }) => {

  const [isRemoveMd, toggleRemoveMd, closeRemoveMd] = useModal(false);
  const [deleteItem, setDeleteItem] = React.useState('');

  const renderListReplyComment = (replyComment, nextPage, parent) => {
    const allReply = replyComment.result.length > 0 && (
      replyComment.result.map((reply, index) => (
        <li className="d-flex" key={index}>
          <div className="avatar flex-shrink-0">
            <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(reply, ['user', '_id']))}>
              <a className="d-block w-100">
                <ImageWithFallback src={getNestedObjectSafe(reply, ['user', 'profile', 'avatar', 0, 'thumb'])}
                                   alt={reply.email || getNestedObjectSafe(reply, ['user', 'profile', 'fullName'])} />
              </a>
            </Link>
          </div>
          <div className="content-wrapper ml-2 w-100">
            <div className="rounded p-2 bg-light mb-2">
              <h4 className="mb-0">
                <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(reply, ['user', '_id']))}>
                  <a className="font-weight-bold color-font fz-14">
                    {getNestedObjectSafe(reply, ['user', 'profile', 'fullName'])}
                  </a>
                </Link>
              </h4>
              <p className="mb-0 fz-14 color-font">
                {getNestedObjectSafe(reply, ['content'])}
              </p>
              <CommentPhotoWithLightBox comment={reply} />
            </div>
            <p className="fz-12 text-secondary">
              {getFromNow(getNestedObjectSafe(reply, ['updatedAt']))}
            </p>
          </div>
        </li>
      ))
    );

    return (
      <ul className="list-reply-comment pl-5">
        { allReply }
        { nextPage && (
          <p className="mb-0 font-weight-bold color-font fz-14 mb-2 cursor-pointer"
             onClick={() => onLoadMoreReply(parent)}>
            Xem thêm trả lời
          </p>
        ) }
      </ul>
    );
  };
  const user = useSelector(store => store.auth.user, shallowEqual);

  const onSelectDeleteItem = (id) => {
    toggleRemoveMd();
    setDeleteItem(id);
  };

  const renderListInteract = () => (
    <ul className="p-0">
      { user && user._id === getNestedObjectSafe(comment, ['user','_id']) ?

        <>
          <li className="d-flex align-items-center px-3 py-1 cursor-pointer"
              onClick={() => onEditComment(comment._id, comment.content)}>
            <IonicIcons name="ion-md-create fz-24 color-link" />
            <p className="mb-0 color-link fz-14 ml-2">Chỉnh sửa</p>
          </li>
          <li className="d-flex align-items-center px-3 py-1 cursor-pointer"
              onClick={() => onSelectDeleteItem(comment._id)}>
            <IonicIcons name="ion-md-trash fz-24 text-danger" />
            <p className="mb-0 text-danger fz-14 ml-2">Xoá bình luận</p>
          </li>
        </> :
        <li className="d-flex align-items-center px-3 py-1 cursor-pointer mb-0">
          <IonicIcons name="ion-md-warning fz-24 text-danger" />
          <p className="mb-0 text-danger fz-14 ml-2">Báo cáo</p>
        </li>
      }
    </ul>
  );

  return (
    <>
      <li>
        <div className="d-flex">
          <div className="avatar flex-shrink-0">
            <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(comment, ['user', '_id']))}>
              <a className="d-block border-white">
                <ImageWithFallback src={getNestedObjectSafe(comment, ['user', 'profile', 'avatar', 0, 'thumb'])}
                                   alt={getNestedObjectSafe(comment, ['user', 'profile', 'fullName'])} />
              </a>
            </Link>
          </div>
          <div className="comment-infor-wrapper ml-2 w-100">
            <div className="content bg-light rounded p-2 mb-2">
              <h3 className="mb-0">
                <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(comment, ['user', '_id']))}>
                  <a className="font-weight-bold color-font fz-14">
                    {getNestedObjectSafe(comment, ['user', 'profile', 'fullName'])}
                  </a>
                </Link>
              </h3>
              <p className="color-font fz-14 mb-0">
                {getNestedObjectSafe(comment, ['content'])}
              </p>
              <CommentPhotoWithLightBox comment={comment} />
            </div>
            <div className="action-wrapper d-flex mb-2 align-items-center">
              <p className="fz-12 mb-0 text-secondary">
                {getFromNow(getNestedObjectSafe(comment, ['updatedAt']))}
              </p>
              <p className="text-secondary mb-0 ml-2 fz-12 cursor-pointer"
                 onClick={() => onReplyComment(comment._id)}>Trả lời</p>
              <div className="mb-0 ml-auto">
                <a href="#"
                   id={`comment-interact-${comment._id}`}
                   onClick={(e) => e.preventDefault()} >
                  <IonicIcons name="ion-ios-more text-secondary fz-24 cursor-pointer" />
                </a>
                <UncontrolledPopover trigger="legacy"
                                     placement="bottom"
                                     className="shadow-lg border-0"
                                     target={`comment-interact-${comment._id}`}>
                  { renderListInteract() }
                </UncontrolledPopover>
              </div>
            </div>
          </div>
        </div>
        { Object.keys(comment.replyComment).length > 0 &&
        renderListReplyComment(
          comment.allReplyComment,
          getNestedObjectSafe(comment, ['allReplyComment', 'nextPage']),
          getNestedObjectSafe(comment, ['replyComment', 'parent']),
        )
        }
      </li>
      { isRemoveMd && (
        <Animated animationIn="zoomIn"
                  animationOut="zoomOut"
                  isVisible={isRemoveMd}>
          <ConfirmModal isOpen={isRemoveMd}
                        toggle={toggleRemoveMd}
                        onOk={() => {
                          onRemoveComment(deleteItem);
                          closeRemoveMd();
                        }}
                        close={() => closeRemoveMd()} />
        </Animated>
      ) }

    </>
  );
};

CommentItem.propTypes = {
  comment: object,
  onReplyComment: func,
  onEditComment: func,
  onRemoveComment: func,
  onLoadMoreReply: func
};

const ListComment = ({
  commentData,
  isNextPage = false,
  onLoadMoreComment = () => null,
  ...propsCommentItem
}) => {
  return (
    <div className="list-comment-wrapper">
      <ul className="pl-0 mb-0 list-comment">
        { commentData.length ?
          commentData.map((comment, index) => {
            return (
              <CommentItem comment={comment}
                           key={index}
                           { ...propsCommentItem } />
            );
          }) :
          <p className="mb-0">Chưa có bình luận</p>
        }
        { isNextPage && (
          <p className="mb-0 font-weight-bold color-font cursor-pointer"
             onClick={onLoadMoreComment}>Xem thêm bình luận</p>
        ) }
      </ul>
    </div>
  );
};

ListComment.propTypes = {
  commentData: array,
  isNextPage: bool,
  onLoadMoreComment: func,
  onReplyComment: func,
  onLoadMoreReply: func,
};

export default React.memo(ListComment);
