import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
};

function receiveCommentsAction(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
}

function addCommentAction(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpvoteCommentAction({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      userId, commentId,
    },
  };
}

function toggleDownvoteCommentAction({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      userId, commentId,
    },
  };
}

function asyncToggleUpVoteComment({
  userId, threadId, commentId, isUpVoted,
}) {
  return async (dispatch) => {
    try {
      dispatch(toggleUpvoteCommentAction({ userId, commentId }));
      if (!isUpVoted) {
        await api.upVoteComment({ threadId, commentId });
      } else {
        await api.neutralizeVoteComment({ threadId, commentId });
      }
    } catch (err) {
      alert(err.message);
    }
  };
}

function asyncToggleDownVoteComment({
  userId, threadId, commentId, isDownVoted,
}) {
  return async (dispatch) => {
    try {
      dispatch(toggleDownvoteCommentAction({ userId, commentId }));
      if (!isDownVoted) {
        await api.downVoteComment({ threadId, commentId });
      } else {
        await api.neutralizeVoteComment({ threadId, commentId });
      }
    } catch (err) {
      alert(err.message);
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.addComment({ threadId, content });
      dispatch(addCommentAction(comment));
    } catch (err) {
      alert(err);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveCommentsAction,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  addCommentAction,
  asyncAddComment,
};
