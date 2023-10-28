import {
  LOGIN_ERR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_ERR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  TEST,
} from "./types";

const initialState = {
  loading: false,
  data: [],
  req: null,
  error: null,
  isAuthenticated: false,
};

const accountReducer = (state = initialState, action) => {
  const { type, data, error, req } = action;

  switch (type) {
    case TEST:
      console.log("reducer test");
      return state;

    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        req,
        error: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
        error: null,
      };

    case SIGNUP_ERR:
      return {
        ...state,
        loading: false,
        error,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        req,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
        error: null,
        isAuthenticated: true,
      };

    case LOGIN_ERR:
      return {
        ...state,
        loading: false,
        error,
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default accountReducer;
