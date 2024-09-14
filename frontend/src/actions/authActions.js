
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';




export const login = (decoded) => async dispatch => {
    try {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: decoded,
    })
    } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response,
    });
    alert('invalid Credential')
  }
   
};
