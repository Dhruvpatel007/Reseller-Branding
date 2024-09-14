import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

 function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
     
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;


