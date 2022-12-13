import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveCommentsAction } from '../comments/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  TOGGLE_UPVOTE_DETAIL: 'TOGGLE_UPVOTE_DETAIL',
  TOGGLE_DOWNVOTE_DETAIL: 'TOGGLE_DOWNVOTE_DETAIL',

};

function receiveThreadDetailAction(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function toggleUpvoteAction(data) {
  const { userId, upVotesBy, downVotesBy } = data;
  return {
    type: ActionType.TOGGLE_UPVOTE_DETAIL,
    payload: {
      upVotesBy, downVotesBy, userId,
    },
  };
}

function toggleDownvoteAction(data) {
  const { userId, upVotesBy, downVotesBy } = data;
  return {
    type: ActionType.TOGGLE_DOWNVOTE_DETAIL,
    payload: {
      upVotesBy, downVotesBy, userId,
    },
  };
}

function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadById(id);
      dispatch(receiveThreadDetailAction({
        ...threadDetail,
        name: threadDetail.owner.name,
        totalComments: threadDetail.comments.length,
      }));
      dispatch(receiveCommentsAction(threadDetail.comments));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteThreadDetail(data) {
  return async (dispatch) => {
    try {
      const { threadId, isUpVoted } = data;
      dispatch(toggleUpvoteAction(data));
      if (!isUpVoted) {
        await api.upvoteThread({ threadId });
      } else {
        await api.neutralizeVoteThread({ threadId });
      }
    } catch (err) {
      alert(err.message);
    }
  };
}

function asyncToggleDownvoteThreadDetail(data) {
  return async (dispatch) => {
    try {
      const { threadId, isDownVoted } = data;
      dispatch(toggleDownvoteAction(data));
      if (!isDownVoted) {
        await api.downvoteThread({ threadId });
      } else {
        await api.neutralizeVoteThread({ threadId });
      }
    } catch (err) {
      alert(err.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailAction,
  asyncReceiveThreadDetail,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
};
