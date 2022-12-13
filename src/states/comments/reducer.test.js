import commentsReducer from './reducer';

describe('comment reducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return comments when given by RECEIVE_COMMENTS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_COMMENTS',
      payload: {
        comments: [{
          "id": "comment-1",
          "content": "Ini adalah komentar pertama",
          "createdAt": "2021-06-21T07:00:00.000Z",
          "owner": {
            "id": "users-1",
            "name": "John Doe",
            "avatar": "https://generated-image-url.jpg"
          },
          "upVotesBy": [],
          "downVotesBy": []
        }],
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.comments);
  })

  it('should return comments with new comments when given by ADD_COMMENT', () => {
    const initialState = [{
      "id": "comment-1",
      "content": "Ini adalah komentar pertama",
      "createdAt": "2021-06-21T07:00:00.000Z",
      "owner": {
        "id": "users-1",
        "name": "John Doe",
        "avatar": "https://generated-image-url.jpg"
      },
      "upVotesBy": [],
      "downVotesBy": []
    }]
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          "id": "comment-2",
          "content": "Ini adalah komentar kedua",
          "createdAt": "2021-06-21T07:00:00.000Z",
          "owner": {
            "id": "users-2",
            "name": "Cios Does",
            "avatar": "https://generated-image-url.jpg"
          },
          "upVotesBy": [],
          "downVotesBy": []
        }
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });

  it('should return comment with toggled up vote when given by TOGGLE_UPVOTE_COMMENT action', () => {
    const initialState = [{
      "id": "comment-2",
      "content": "Ini adalah komentar kedua",
      "createdAt": "2021-06-21T07:00:00.000Z",
      "owner": {
        "id": "users-2",
        "name": "Cios Does",
        "avatar": "https://generated-image-url.jpg"
      },
      "upVotesBy": [],
      "downVotesBy": []
    }];

    const action = {
      type: 'TOGGLE_UPVOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-2',
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual([{
      ...initialState[0],
      upVotesBy: [action.payload.userId],
    }]);
  });

  it('should return comment with toggled down vote when given by TOGGLE_DOWNVOTE_COMMENT action', () => {
    const initialState = [{
      "id": "comment-2",
      "content": "Ini adalah komentar kedua",
      "createdAt": "2021-06-21T07:00:00.000Z",
      "owner": {
        "id": "users-2",
        "name": "Cios Does",
        "avatar": "https://generated-image-url.jpg"
      },
      "upVotesBy": [],
      "downVotesBy": []
    }];

    const action = {
      type: 'TOGGLE_DOWNVOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-2',
      },
    };

    const nextState = commentsReducer(initialState, action);
    expect(nextState).toEqual([{
      ...initialState[0],
      downVotesBy: [action.payload.userId],
    }]);
  });

});
