import isPreLoadReducer from './reducer';

/**
 * test scenario for isPreLoadReducer
 *
 *  - isPreLoadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return false when given by SET_IS_PRELOAD and isPreload in action is false
*/

describe('isPreload reducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };
    const nextState = isPreLoadReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return false when given by SET_IS_PRELOAD and isPreload in action is false', () => {
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreLoad: false,
      },
    };
    const nextState = isPreLoadReducer(false, action);
    expect(nextState).toEqual(action.payload.isPreLoad);
  });
});
