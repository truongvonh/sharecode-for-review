import React, { memo, useEffect } from 'react';
import { string, func } from 'prop-types';
import ImageWithFallback from 'components/ImageWithFallback';
import { Row, Col, Container } from 'react-bootstrap';
import { formatDate } from 'utils/helper';
import ConfirmModal from 'components/ConfirmModal';
import useModal from 'hooks/useModal';
import { DELETE_COMMENT_SUCCESS } from 'store/schoolReview/constant';
import { useSelector, shallowEqual } from 'react-redux';

const ReplyComment = ({ comment, handleDeleteReply, ...props }) => {
  const [confirmReply, toggleReply, closeReply] = useModal(false);
  const statusDelete = useSelector(store => store.schoolReview.status, shallowEqual);

  useEffect(() => {
    if (statusDelete === DELETE_COMMENT_SUCCESS) {
      closeReply();
    }
  }, [statusDelete]);

  const { user, content, createdAt, _id, photos } = comment;
  const { profile } = user;
  const { avatar } = profile;
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
        <div style={{ marginLeft: '40px' }}>
          {content && content}
          <span style={{ margin: '10px', fontSize: '11px' }}>{createdAt && formatDate(createdAt)}</span>
          <a
            href="#"
            className="cursor-pointer"
            onClick={e => {
              e.preventDefault();
              toggleReply();
            }}
          >
            Xóa
          </a>
        </div>
        <Container fluid>
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
        onHide={closeReply}
        content="Bạn có muốn xoá không?"
        show={confirmReply}
        onSelect={() => handleDeleteReply(_id)}
      />
    </>
  );
};

ReplyComment.propTypes = {
  comment: string,
  handleDeleteReply: func
};

export default memo(ReplyComment);
