import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa';
import { Markup } from 'interweave';
import { getRandomPastelColor } from '../utils/pastelColor';
import { convertTimeToPostedAt } from '../utils/time';
import { asyncToggleDownvoteThread, asyncToggleUpvoteThread } from '../states/threads/action';
import '../styles/ThreadItem.css';
import { asyncToggleDownvoteThreadDetail, asyncToggleUpvoteThreadDetail } from '../states/threadDetail/action';

// eslint-disable-next-line max-len
function ThreadItem({
  id, title, body, category, createdAt, name, upVotesBy, downVotesBy, totalComments, detail = false,
}) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const postedAt = convertTimeToPostedAt(createdAt);
  const color = getRandomPastelColor();

  function isUserUpVotedThread() {
    if (!authUser) return false;
    const result = upVotesBy.filter((userUpvoted) => userUpvoted === authUser.id);
    return result.length > 0;
  }

  function isUserDownVotedThread() {
    if (!authUser) return false;
    const result = downVotesBy.filter((userDownvoted) => userDownvoted === authUser.id);
    return result.length > 0;
  }

  function onUpVoteClick() {
    const isUpvoted = isUserUpVotedThread();
    if (!authUser) alert('You must be logged in to vote');
    else if (!detail) dispatch(asyncToggleUpvoteThread(id, authUser.id, isUpvoted));
    else if (detail) {
      const data = {
        threadId: id,
        userId: authUser.id,
        upVotesBy,
        downVotesBy,
        isUpvoted,
      };
      dispatch(asyncToggleUpvoteThreadDetail(data));
    }
  }

  function onDownVoteClick() {
    const isDownvoted = isUserDownVotedThread();
    if (!authUser) alert('You must be logged in to vote');
    else if (!detail) dispatch(asyncToggleDownvoteThread(id, authUser.id, isDownvoted));
    else if (detail) {
      const data = {
        threadId: id,
        userId: authUser.id,
        upVotesBy,
        downVotesBy,
        isDownvoted,
      };
      dispatch(asyncToggleDownvoteThreadDetail(data));
    }
  }

  return (
    <div className="thread-item-container">
      <Link to={`/threads/${id}`} className="title">
        <p>{title}</p>
      </Link>
      <div className="body-container">
        <Markup className="body" content={body} />
      </div>
      <p className="category" style={{ backgroundColor: color }}>{`#${category}`}</p>
      <div className="thread-information">
        <button type="button" className="upvote btn-thread" onClick={onUpVoteClick}>
          {isUserUpVotedThread() ? <FaThumbsUp /> : <FiThumbsUp /> }
          <span className="info-count">{upVotesBy.length}</span>
        </button>
        <button type="button" className="downvote btn-thread" onClick={onDownVoteClick}>
          {isUserDownVotedThread() ? <FaThumbsDown /> : <FiThumbsDown />}
          <span className="info-count">{downVotesBy.length}</span>
        </button>
        <div className="comments">
          <FaRegComment />
          <span className="info-count">{totalComments}</span>
        </div>
        <p className="created-at">{postedAt}</p>
        <p>
          Dibuat oleh
          <span className="ownerName">{` ${name}`}</span>
        </p>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  detail: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.instanceOf(Array).isRequired,
  downVotesBy: PropTypes.instanceOf(Array).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
