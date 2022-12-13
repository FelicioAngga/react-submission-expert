import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENTS:
      return action.payload.comments;
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...comments];
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : [...comment.downVotesBy],
          };
        }
        return comment;
      });
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat([action.payload.userId]),
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : [...comment.upVotesBy],
          };
        }
        return comment;
      });
    default:
      return comments;
  }
}

export default commentsReducer;
