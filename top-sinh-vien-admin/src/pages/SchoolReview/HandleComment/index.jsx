import React, { memo, useState, useMemo } from 'react';
import { string, func } from 'prop-types';
import Comment from '../Comment';
import ReplyComment from '../ReplyComment';
import { useActions } from '../../../hooks/useActions';
import { deleteComment, resetComment } from 'store/schoolReview/actions';
import { Row, Container } from 'react-bootstrap';

const HandleComment = ({ dataComment, dataReply, handleReplyComment, commentId }) => {
  const [getDeleteComment] = useActions([deleteComment], null);

  /* Handle */
  const handleDeleteComment = item => {
    getDeleteComment({ id: item });
  };

  const getReplyComment = useMemo(() => {
    try {
      return dataReply.result || [];
    } catch (e) {
      console.log(e);
    }

    return [];
  }, [dataReply]);

  const handleDeleteReply = item => {
    getDeleteComment({ id: item });
  };

  return (
    dataComment.length &&
    dataComment.map(item => {
      const comment = item.comment;
      const { replyComment } = comment;
      return (
        <>
          <Comment
            handleDeleteComment={handleDeleteComment}
            comment={comment}
            nextPageReply={replyComment ? true : false}
            handleReplyComment={comment_id => handleReplyComment(comment_id)}
          />
          {commentId === comment._id
            ? !!getReplyComment.length &&
              getReplyComment.map(item => {
                return (
                  <>
                    <Container fluid>
                      <Row style={{ paddingLeft: 60 }}>
                        <ReplyComment handleDeleteReply={handleDeleteReply} comment={item} />
                      </Row>
                    </Container>
                  </>
                );
              })
            : null}
        </>
      );
    })
  );
};

HandleComment.propTypes = {
  dataComment: string,
  dataReply: string,
  handleReplyComment: func,
  commentId: string
};

export default memo(HandleComment);
