import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { convertTimeToPostedAt } from '../utils/time';
import { asyncToggleUpVoteComment, asyncToggleDownVoteComment } from '../states/comments/action';
import '../styles/CommentItem.css';

function CommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, threadId,
}) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);
  const { name, avatar } = owner;
  const postedAt = convertTimeToPostedAt(createdAt);

  function isUserUpVotedComment() {
    if (!authUser) return false;
    const result = upVotesBy.filter((userUpvoted) => userUpvoted === authUser.id);
    return result.length > 0;
  }

  function isUserDownVotedComment() {
    if (!authUser) return false;
    const result = downVotesBy.filter((userDownvoted) => userDownvoted === authUser.id);
    return result.length > 0;
  }

  function onUpVoteClick() {
    if (!authUser) alert('You must be logged in to vote');
    const isUpvoted = isUserUpVotedComment();
    const data = {
      threadId,
      userId: authUser.id,
      commentId: id,
      upVotesBy,
      downVotesBy,
      isUpvoted,
    };
    dispatch(asyncToggleUpVoteComment(data));
  }

  function onDownVoteClick() {
    if (!authUser) alert('You must be logged in to vote');
    const isDownvoted = isUserDownVotedComment();
    const data = {
      threadId,
      userId: authUser.id,
      commentId: id,
      upVotesBy,
      downVotesBy,
      isDownvoted,
    };
    dispatch(asyncToggleDownVoteComment(data));
  }

  return (
    <div className="comment-item">
      <header className="comment-header">
        <div className="owner-info">
          <img src={avatar} alt={name} className="comment-avatar" />
          <p>{name}</p>
        </div>
        <p>{postedAt}</p>
      </header>
      <p className="comment-content">{content}</p>
      <div className="votes-container">
        <button type="button" className="upvote btn-comment" onClick={onUpVoteClick}>
          {isUserUpVotedComment() ? <FaThumbsUp /> : <FiThumbsUp /> }
          <span className="info-count">{upVotesBy.length}</span>
        </button>
        <button type="button" className="downvote btn-comment" onClick={onDownVoteClick}>
          {isUserDownVotedComment() ? <FaThumbsDown /> : <FiThumbsDown />}
          <span className="info-count">{downVotesBy.length}</span>
        </button>
      </div>
      <div className="divider" />
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.instanceOf(Object).isRequired,
  upVotesBy: PropTypes.instanceOf(Array).isRequired,
  downVotesBy: PropTypes.instanceOf(Array).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
