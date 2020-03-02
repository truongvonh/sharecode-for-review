import React, { useEffect, useState } from 'react';
import BaseModal from 'components/BaseModal';
import { useActions } from 'hooks/useActions';
import { useSelector, shallowEqual } from 'react-redux';
import { Row, Col, Form, Alert, Badge, Container } from 'react-bootstrap';
import ImageWithFallback from 'components/ImageWithFallback';
import { formatDate } from 'utils/helper';
import { getAllComment, resetComment } from 'store/schoolReview/actions';
import { useDispatch } from 'react-redux';
import { COMMENT_ENDPOINT } from '../../../api/constant';
import HandleComment from '../../SchoolReview/HandleComment';
import { DELETE_COMMENT_SUCCESS } from 'store/schoolReview/constant';

const ReviewActionModal = ({ show, onHide, ...props }) => {
  const dispatch = useDispatch();
  const [allComment] = useActions([getAllComment], null);
  const storeReviewLocation = useSelector(store => store.locationReview.detailReview, shallowEqual);
  const getAllCommentStore = useSelector(store => store.schoolReview.allComment, shallowEqual);
  const nextPage = useSelector(store => store.schoolReview.nextPage, shallowEqual);
  const statusDelete = useSelector(store => store.schoolReview.status, shallowEqual);
  const [page, setPage] = useState(1);
  const [itemReview, setItemReview] = useState();
  const [dataReply, setDataReply] = useState([]);
  const [commentId, setCommentId] = useState('');

  /* Handle */
  useEffect(() => {
    if (storeReviewLocation) {
      setItemReview({ comment_type: 'LOCATION_REVIEW', document: storeReviewLocation._id });
      allComment({ comment_type: 'LOCATION_REVIEW', document: storeReviewLocation._id, page });
    }
  }, [storeReviewLocation]);

  useEffect(() => {
    if (!show) {
      setPage(1);
    }
  }, [show]);

  const getDateReplyComment = async () => {
    const data = await COMMENT_ENDPOINT.ALL_REPLY_COMMENT({ parent: commentId });
    setDataReply(data);
  };

  useEffect(() => {
    if (statusDelete === DELETE_COMMENT_SUCCESS) {
      getDateReplyComment();
    }
  }, [statusDelete]);

  const handleReplyComment = async comment_id => {
    const data = await COMMENT_ENDPOINT.ALL_REPLY_COMMENT({ parent: comment_id });
    setCommentId(comment_id);
    setDataReply(data);
  };

  const renderComment = data => {
    return (
      <HandleComment
        dataComment={data}
        commentId={commentId}
        handleReplyComment={handleReplyComment}
        dataReply={dataReply && dataReply}
      />
      // data.length &&
      // data.map(item => {
      //   const comment = item.comment;
      //   const { replyComment } = comment;
      //   return (
      //     <>
      //       <Comment
      //         handleDeleteComment={handleDeleteComment}
      //         comment={comment}
      //         nextPageReply={replyComment ? true : false}
      //         handleReplyComment={comment_id => handleReplyComment(comment_id)}
      //       />
      //       {commentId === comment._id ? (
      //         <>
      //           <Container fluid>
      //             <Row style={{ paddingLeft: 60 }}>
      //               <ReplyComment handleDeleteReply={handleDeleteReply} comment={dataReply} />
      //             </Row>
      //           </Container>
      //         </>
      //       ) : null}
      //     </>
      //   );
      // })
    );
  };

  const renderImage = data => {
    return data.length
      ? data.map(item => {
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
      : null;
  };

  const renderRating = data => {
    return (
      <>
        <Badge key={data} variant="primary" className="mr-2 mb-1">
          {data} <i className={'feather mr-0 icon-star'} />
        </Badge>
      </>
    );
  };

  const nextPageComment = () => {
    setPage(page + 1);
    allComment({ ...itemReview, page: page + 1 });
  };

  const renderDetailReviewSchool = data => {
    let fullName = data && data.user && data.user.profile.firstName + ' ' + data.user.profile.lastName;
    return data ? (
      <>
        <Alert key="key" variant="light">
          <Row>
            <Col sm={6}>
              <Form.Label style={{ fontWeight: 'bold' }}>Tên địa điểm: </Form.Label>
              <div>{data.location && data.location.name}</div>
            </Col>
            <Col sm={6}>
              <Form.Label style={{ fontWeight: 'bold' }}>Địa chỉ: </Form.Label>
              <div>{data.location && data.location.address}</div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Label style={{ fontWeight: 'bold' }}>Người đánh giá: </Form.Label>
              <div>{fullName}</div>
            </Col>
            <Col sm={6}>
              <Form.Label style={{ fontWeight: 'bold' }}>Xếp hạng đánh giá: </Form.Label>
              <div>{data.rating && renderRating(data.rating)}</div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Form.Label style={{ fontWeight: 'bold' }}>Nội dung: </Form.Label>
              <div>{data && data.content}</div>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Label style={{ fontWeight: 'bold' }}>Thời gian tạo: </Form.Label>
              <div>{data && formatDate(data.createdAt)}</div>
            </Col>
            <Col sm={4}>
              <Form.Label style={{ fontWeight: 'bold' }}>Tổng bình luân: </Form.Label>
              <div>{data && data.total_comment}</div>
            </Col>
            <Col sm={4}>
              <Form.Label style={{ fontWeight: 'bold' }}>Tổng lượng thích: </Form.Label>
              <div>{data && data.total_vote}</div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Label style={{ fontWeight: 'bold' }}>Hình ảnh: </Form.Label>
              <Container fluid>
                <Row>{data.photos && renderImage(data.photos)}</Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {getAllCommentStore && getAllCommentStore.length ? (
                <>
                  <hr></hr>
                  <Form.Label style={{ fontWeight: 'bold' }}>Nhận xét: </Form.Label>
                  <Container fluid>{renderComment(getAllCommentStore)}</Container>
                </>
              ) : null}
              {nextPage ? (
                <div>
                  <a
                    href="#"
                    className="cursor-pointer"
                    onClick={e => {
                      e.preventDefault();
                      nextPageComment();
                    }}
                  >
                    Xem thêm bình luận
                  </a>
                </div>
              ) : null}
            </Col>
          </Row>
        </Alert>
      </>
    ) : null;
  };

  const handleClosed = () => {
    dispatch(resetComment());
    onHide();
  };

  return (
    <>
      <BaseModal borderNone show={show} onHide={handleClosed} size="xl" title="Đánh giá địa điểm" {...props}>
        {renderDetailReviewSchool(storeReviewLocation)}
      </BaseModal>
    </>
  );
};

export default React.memo(ReviewActionModal);
