/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import ThreadItem from '../components/ThreadItem';
import CommentItem from '../components/CommentItem';
import { asyncAddComment } from '../states/comments/action';
import '../styles/ThreadDetail.css';

function ThreadDetail() {
  const dispatch = useDispatch();
  const { threadDetail, authUser, comments } = useSelector((states) => states);
  const { threadId } = useParams();
  const commentInput = useRef(null);

  function onAddComment() {
    dispatch(asyncAddComment({ threadId, content: commentInput.current.value }));
    commentInput.current.value = '';
  }

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [dispatch, threadId]);

  if (!threadDetail) return null;

  return (
    <>
      <ThreadItem {...threadDetail} detail />
      { !authUser
        ? (
          <p>
            <Link to="/login" className="login-link">Login </Link>
            untuk menambah komentar
          </p>
        )
        : (
          <div className="add-comment">
            <h2>Beri komentar</h2>
            <input type="text" className="comment-input" placeholder="Komentar" ref={commentInput} />
            <button type="button" className="btn-add-comment" onClick={onAddComment}>Kirim</button>
          </div>
        )}
      {
        comments && (
        <div className="comments-container">
          {comments.map((comment) => <CommentItem {...comment} threadId={threadId} key={comment.id} />)}
        </div>
        )
      }
    </>
  );
}

export default ThreadDetail;
