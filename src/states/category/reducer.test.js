import categoriesReducer from './reducer';

describe('categories Reducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = categoriesReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return categories when given by RECEIVE_CATEGORIES action', () => {
    const initialState = null;
    const action = {
      type: 'RECEIVE_CATEGORIES',
      payload: {
        categories: [
          'react', 'electron', 'C++'
        ],
        selectedCategory: null,
      },
    };
    const nextState = categoriesReducer(initialState, action);
    expect(nextState).toEqual(action.payload.categories);
  });

  it('should return selected category and categories when given by SET_CATEGORY action', () => {
    const initialState = {
      categories: [
        'react', 'electron', 'C++'
      ],
    };
    const action = {
      type: 'SET_CATEGORY',
      payload: {
        selectedCategory: 'electron',
      },
    }
    const selectedCategory = action.payload.selectedCategory;
    const categories = initialState.categories;
    const nextState = categoriesReducer(initialState, action);
    expect(nextState).toEqual({ categories, selectedCategory });
  });
});
