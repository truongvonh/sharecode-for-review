import React, { memo, useEffect } from 'react';
import { string, func } from 'prop-types';
import ImageWithFallback from 'components/ImageWithFallback';
import { Col, Container, Row } from 'react-bootstrap';
import { formatDate } from 'utils/helper';
import ConfirmModal from 'components/ConfirmModal';
import useModal from 'hooks/useModal';
import { useSelector, shallowEqual } from 'react-redux';
import { DELETE_COMMENT_SUCCESS } from 'store/schoolReview/constant';

const Comment = ({ comment, handleDeleteComment, nextPageReply = false, handleReplyComment, ...props }) => {
  const [confirmMdDelete, toggleMdDelete, closeMdDelete] = useModal(false);
  const statusDelete = useSelector(store => store.schoolReview.status, shallowEqual);
  const { user, content, createdAt, _id, photos } = comment;

  const { profile } = user;
  const { avatar } = profile;

  useEffect(() => {
    if (statusDelete === DELETE_COMMENT_SUCCESS) {
      closeMdDelete();
    }
  }, [statusDelete]);

  return (
    <>
      <Col sm="12" className="mb-4">
        <div className="d-flex align-items-center">
          <ImageWithFallback
            className="gallery-image"
            src={avatar.length && avatar[0].thumb}
            style={{ height: 30, width: 30, borderRadius: 15 }}
          />
          <span className="ml-2">
            <strong>{profile && profile.firstName + profile.lastName}</strong>
          </span>
        </div>
        <div style={{ paddingLeft: 40 }}>
          {content && content}
          <span style={{ margin: '10px', fontSize: '11px' }}>{createdAt && formatDate(createdAt)}</span>
          {nextPageReply && (
            <a
              href="#"
              className="cursor-pointer"
              onClick={e => {
                e.preventDefault();
                handleReplyComment(_id);
              }}
              style={{ paddingRight: 5 }}
            >
              Phản hồi
            </a>
          )}
          <a
            href="#"
            className="cursor-pointer"
            onClick={e => {
              e.preventDefault();
              toggleMdDelete();
            }}
          >
            Xóa
          </a>
        </div>
        <Container style={{ paddingLeft: 40 }} fluid>
          <Row>
            {photos.length
              ? photos.map(item => {
                  return (
                    <>
                      <Col sm={4}>
                        <ImageWithFallback
                          className="gallery-image"
                          src={item.thumb}
                          style={{ margin: '2px', width: '100%', height: 300 }}
                        />
                      </Col>
                    </>
                  );
                })
              : null}
          </Row>
        </Container>
      </Col>
      <ConfirmModal
        onHide={closeMdDelete}
        content="Bạn có muốn xoá không?"
        show={confirmMdDelete}
        onSelect={() => handleDeleteComment(_id)}
      />
    </>
  );
};

Comment.propTypes = {
  comment: string,
  handleDeleteComment: func,
  nextPageReply: string,
  handleReplyComment: func
};

export default memo(Comment);
