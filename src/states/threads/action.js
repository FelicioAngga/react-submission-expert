import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveCategoriesAction } from '../category/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE: 'TOGGLE_UPVOTE',
  TOGGLE_DOWNVOTE: 'TOGGLE_DOWNVOTE',
};

function receiveThreadsAction(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadAction(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpvoteAction({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE,
    payload: {
      threadId, userId,
    },
  };
}

function toggleDownvoteAction({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE,
    payload: {
      threadId, userId,
    },
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      const threadsWithOwnerName = await Promise.all(threads.map(async (thread) => {
        const threadDetail = await api.getThreadById(thread.id);
        return { ...thread, name: threadDetail.owner.name };
      }));

      dispatch(receiveThreadsAction(threadsWithOwnerName));
      const categoriesFromThread = threads.map((thread) => thread.category).filter(onlyUnique);
      dispatch(receiveCategoriesAction(categoriesFromThread));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.addThread({ title, body, category });
      const threadDetail = await api.getThreadById(thread.id);
      dispatch(addThreadAction({ ...thread, ownerName: threadDetail.owner.name }));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteThread(threadId, userId, isUpVoted) {
  return async (dispatch) => {
    try {
      dispatch(toggleUpvoteAction({ threadId, userId }));
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

function asyncToggleDownvoteThread(threadId, userId, isUpVoted) {
  return async (dispatch) => {
    try {
      dispatch(toggleDownvoteAction({ threadId, userId }));
      if (!isUpVoted) {
        await api.downvoteThread({ threadId });
      } else {
        await api.neutralizeVoteThread({ threadId });
      }
    } catch (err) {
      alert(err.message);
    }
  };
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export {
  ActionType,
  receiveThreadsAction,
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  toggleUpvoteAction,
  toggleDownvoteAction,
};
