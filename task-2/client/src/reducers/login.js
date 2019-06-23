import {CHECK_TOKEN, LOGIN_SUCCESS, AUTH_ERROR, LOGOUT} from '../actions/login';
const initialState = {};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: null
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    case LOGOUT:
      return {
        ...state,
        email: null,
        access_token: null
      };
    default:
      return {
        ...state,
      };
  }
}
