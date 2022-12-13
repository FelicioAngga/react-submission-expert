import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.TOGGLE_UPVOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: action.payload.upVotesBy.includes(action.payload.userId)
          ? action.payload.upVotesBy.filter((id) => id !== action.payload.userId)
          : action.payload.upVotesBy.concat([action.payload.userId]),
        downVotesBy: action.payload.downVotesBy.includes(action.payload.userId)
          ? action.payload.downVotesBy.filter((id) => id !== action.payload.userId)
          : [...action.payload.downVotesBy],
      };
    case ActionType.TOGGLE_DOWNVOTE_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: action.payload.downVotesBy.includes(action.payload.userId)
          ? action.payload.downVotesBy.filter((id) => id !== action.payload.userId)
          : action.payload.downVotesBy.concat([action.payload.userId]),
        upVotesBy: action.payload.upVotesBy.includes(action.payload.userId)
          ? action.payload.upVotesBy.filter((id) => id !== action.payload.userId)
          : [...action.payload.upVotesBy],
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
