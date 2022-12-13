const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  SET_CATEGORY: 'SET_CATEGORY',
};

function receiveCategoriesAction(values, selectedCategory = null) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      categories: {
        values, selectedCategory,
      },
    },
  };
}

function setCategoryAction(selectedCategory) {
  return {
    type: ActionType.SET_CATEGORY,
    payload: {
      selectedCategory,
    },
  };
}

export {
  ActionType,
  receiveCategoriesAction,
  setCategoryAction,
};
