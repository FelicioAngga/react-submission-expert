import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.register({ name, email, password });
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};
