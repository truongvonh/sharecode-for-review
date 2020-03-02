import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { closeLoading, toggleLoginModal } from 'redux/common/actions';
import { COMMENT_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import { checkDetailProperty, checkDetailTitle, checkVoteType, getNestedObjectSafe } from 'utils/helper';
import CommentAction from 'components/CommentAction';
import Head from 'components/common/head';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';
import DetailItem from 'pages/newsDetail/DetailItem';
import ListComment from 'components/ListComment';
import PlaceHolder from 'components/NewFeedItem/PlaceHolder';
import { object, string } from 'prop-types';

const NewsDetail = ({ type, detailData, ...headProps }) => {
  const [newsDetailData, setNewsDetailData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const user = useSelector(store => store.auth.user, shallowEqual);
  const globalLoading = useSelector(store => store.common.globalLoading, shallowEqual);
  const [allComment, setAllComment] = React.useState([]);
  const [isNextPage, setNextPage] = React.useState(false);
  const [editComment, setEditComment] = React.useState({});
  const [resetComment, setResetComment] = React.useState(false);
  const [parentReply, setParentReply] = React.useState('');
  const [toggleLoginMdAction, closeLoadingAction] = useActions([toggleLoginModal, closeLoading], null);

  const [replyPagination, setReplyPagination] = React.useState({
    page: 0,
    limit: 10
  });

  const [commentPagination, setCommentPagination] = React.useState({
    page: 1,
    limit: 10
  });

  const getAllComment = async ({ comment_type, document }) => {
    try {
      return await COMMENT_ENDPOINT.GET_ALL_COMMENT({ comment_type, document });
    } catch (e) {
      console.log(e);
    }
  };

  const computeReplyComment = allComment =>
    allComment.length > 0
      ? allComment.map(comment => {
          if (Object.keys(comment.replyComment)) {
            return {
              ...comment,
              allReplyComment: {
                result: [comment.replyComment],
                nextPage: getNestedObjectSafe(comment, ['replyComment', 'nextPageReply'])
              }
            };
          }
          return comment;
        })
      : [];

  const checkAndLoadAllComment = () => {
    if (detailData.totalComment) {
      setTimeout(async () => {
        const commentData = await getAllComment({ comment_type: checkVoteType(type), document: detailData._id });

        const { nextPage, result } = commentData;
        setAllComment(computeReplyComment(result));
        setNextPage(nextPage);
      }, 800);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setNewsDetailData(detailData);
    }, 1000);

    checkAndLoadAllComment();
  }, [detailData]);
  
  React.useEffect(() => {
    if (globalLoading) setTimeout(() => { closeLoadingAction(); }, 600);
  }, [globalLoading, newsDetailData]);

  const onVoteDocument = async document => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const data = await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
        if (data)
          setNewsDetailData(prevData => ({
            ...prevData,
            voted: !prevData.voted,
            totalVote: prevData.voted ? prevData.totalVote - 1 : prevData.totalVote + 1
          }));
      }
    } catch (e) {
      console.log('error =', e);
    }
  };

  const onLoadMoreReply = async parent => {
    setReplyPagination(prev => ({
      ...prev,
      page: prev.page + 1
    }));
    try {
      const allReply = await COMMENT_ENDPOINT.GET_ALL_REPLY_COMMENT({ parent, page: replyPagination.page + 1 });
      const { result, nextPage } = allReply;
      const commentParent = allComment.find(item => item._id === parent);
      let newReplyComment = [];
      if (result.length > 1) {
        newReplyComment = result.filter(
          item => item._id !== (commentParent.replyComment && commentParent.replyComment._id)
        );
      }
      setAllComment(
        allComment.map(item => {
          if (item._id === parent) {
            return {
              ...item,
              allReplyComment: {
                result: [...item.allReplyComment.result, ...newReplyComment],
                nextPage
              }
            };
          }
          return item;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onComment = async ({ content, photos }) => {
    setResetComment(false);
    if (!content) return false;
    try {
      if (editComment.comment_id) {
        const { comment_id } = editComment;
        const updateComment = await COMMENT_ENDPOINT.EDIT_COMMENT({ comment_id, content });
        const cloneAllComment = allComment;
        const updateIndex = allComment.findIndex(item => item._id === updateComment._id);
        cloneAllComment[updateIndex] = updateComment;
        setAllComment(cloneAllComment);
      } else {
        const newComment = await COMMENT_ENDPOINT.POST_COMMENT({
          content,
          comment_type: checkVoteType(type),
          document: detailData._id,
          parent: parentReply,
          photos
        });
        if (!parentReply) setAllComment(prevComment => [newComment, ...prevComment]);
        else {
          const parentCommentIndex = allComment.findIndex(item => item._id === parentReply);
          const cloneAllComment = [...allComment];
          cloneAllComment[parentCommentIndex].allReplyComment = {
            ...allComment[parentCommentIndex].allReplyComment,
            result: [...allComment[parentCommentIndex].allReplyComment.result, newComment]
          };
          setAllComment(cloneAllComment);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setParentReply('');
      setEditComment({});
      setResetComment(true);
      closeLoadingAction();
    }
  };

  const onLoadMoreComment = async () => {
    setCommentPagination({ ...commentPagination, page: commentPagination.page + 1 });
    try {
      const newComment = await COMMENT_ENDPOINT.GET_ALL_COMMENT({
        comment_type: checkVoteType(type),
        document: detailData._id,
        page: commentPagination.page + 1
      });
      const { nextPage, result } = newComment;
      setAllComment(computeReplyComment([...allComment, ...result]));
      setNextPage(nextPage);
    } catch (e) {
      console.log();
    }
  };

  const clearFocus = () => {
    setParentReply('');
  };

  const renderCommentComponent = React.useMemo(
    () =>
      user ? (
        <CommentAction
          user={user}
          isReset={resetComment}
          focusInput={parentReply}
          onBlur={clearFocus}
          commentData={editComment}
          onSubmit={onComment}
        />
      ) : (
        <p className="mb-0 text-primary fz-14 pb-3 font-weight-bold cursor-pointer" onClick={toggleLoginMdAction}>
          Vui lòng đăng nhập để bình luận.
        </p>
      ),
    [user, parentReply, allComment, resetComment, commentPagination, editComment]
  );

  const onEditComment = (comment_id, content) => setEditComment({ comment_id, content });

  const onRemoveComment = async comment_id => {
    try {
      const result = await COMMENT_ENDPOINT.DELETE_COMMENT({ comment_id });
      if (result) {
        setAllComment(allComment.filter(item => item._id !== comment_id));
        const updateNewsData = { ...detailData };
        updateNewsData.totalComment = detailData.totalComment - 1;
        setNewsDetailData(updateNewsData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head {...headProps} />
      {!isLoading && Object.values(newsDetailData).length ? (
        <DetailItem
          detailData={newsDetailData}
          type={type}
          user={user}
          onVoteDocument={onVoteDocument}
          commentComponents={renderCommentComponent}
          allComment={
            <ListComment
              commentData={allComment}
              onReplyComment={parent => setParentReply(parent)}
              onLoadMoreComment={onLoadMoreComment}
              onEditComment={onEditComment}
              onLoadMoreReply={onLoadMoreReply}
              onRemoveComment={onRemoveComment}
              isNextPage={isNextPage}
            />
          }
        />
      ) : (
        <PlaceHolder />
      )}
    </>
  );
};

NewsDetail.propTypes = {
  type: string,
  detailData: object
};

export default NewsDetail;
