import _get from 'lodash/get';
import _set from 'lodash/set';
import _findIndex from 'lodash/findIndex';

export const AUTH_RESTORE = '@@redux-persist-component/auth';
export const AUTH_LOGIN = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAILED';
export const AUTH_AUTH_SET_TOKEN = 'AUTH_AUTH_SET_TOKEN';
export const AUTH_AUTH_LOGOUT = 'AUTH_AUTH_LOGOUT';
export const AUTH_USERINFO = 'AUTH_USERINFO';
export const AUTH_USERINFO_SUCCSS = 'AUTH_USERINFO_SUCCSS';
export const AUTH_USERINFO_FAIL = 'AUTH_USERINFO_FAIL';
export const AUTH_PASSWORD = 'AUTH_PASSWORD_REQUEST';
export const AUTH_PASSWORD_SUCCESS = 'AUTH_PASSWORD_SUCCESS';
export const AUTH_PASSWORD_FAIL = 'AUTH_PASSWORD_FAILED';
export const AUTH_PASSWORD_CHANGE = 'AUTH_PASSWORD_CHANGE_REQUEST';
export const AUTH_PASSWORD_CHANGE_SUCCESS = 'AUTH_PASSWORD_CHANGE_SUCCESS';
export const AUTH_PASSWORD_CHANGE_FAIL = 'AUTH_PASSWORD_CHANGE_FAILED';
export const AUTH_SET_ACCOUNT_AFFILIATES = 'AUTH_SET_ACCOUNT_AFFILIATES';
export const AUTH_SET_ACCOUNT_AFFILIATES_SUCCESS =
  'AUTH_SET_ACCOUNT_AFFILIATES_SUCCES';
export const AUTH_SET_ACCOUNT_AFFILIATES_FAILED =
  'AUTH_SET_ACCOUNT_AFFILIATES_FAILED';
export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAIL = 'AUTH_REGISTER_FAIL';
export const AUTH_UPDATE = 'AUTH_UPDATE';
export const AUTH_UPDATE_SUCCESS = 'AUTH_UPDATE_SUCCESS';
export const AUTH_UPDATE_FAIL = 'AUTH_UPDATE_FAIL';
export const AUTH_REDIRECT_AFTER_LOGIN = 'AUTH_REDIRECT_AFTER_LOGIN';
export const AUTH_CLEAR_REDIRECT_AFTER_LOGIN =
  'AUTH_CLEAR_REDIRECT_AFTER_LOGIN';

export const authRestore = () => ({
  save: state => ({ token: state.token, loggedIn: state.loggedIn }),
  restore: ({ dispatch, result, currentState }) => {
    if (
      result.token &&
      currentState.token &&
      result.token !== currentState.token
    ) {
      dispatch({ action: AUTH_RESTORE, result });
    }
  },
});

export function logout() {
  return ({ dispatch, cookies }) => {
    cookies.removeItem('token').then(() => {
      dispatch({ type: AUTH_AUTH_LOGOUT });
    });
  };
}

export function setAccountAffiliates(path, params) {
  return {
    types: [
      AUTH_SET_ACCOUNT_AFFILIATES,
      AUTH_SET_ACCOUNT_AFFILIATES_SUCCESS,
      AUTH_SET_ACCOUNT_AFFILIATES_FAILED,
    ],
    promise: ({ client }) => client.put(path, params),
  };
}

export function getUserAttempt() {
  return {
    type: AUTH_USERINFO,
  };
}

export function getUserSuccess(result) {
  return {
    type: AUTH_USERINFO_SUCCSS,
    result,
  };
}

export function getUserFailure(Exception) {
  return {
    type: AUTH_USERINFO_FAIL,
    exception: Exception,
  };
}

export function setUser(data) {
  return {
    type: AUTH_USERINFO_SUCCSS,
    result: data,
  };
}

export function redirectAfterLogin(data) {
  return {
    type: AUTH_REDIRECT_AFTER_LOGIN,
    result: data,
  };
}

export function clearRedirectAfterLogin() {
  return {
    type: AUTH_CLEAR_REDIRECT_AFTER_LOGIN,
  };
}

export function getUser(token) {
  return {
    types: [AUTH_USERINFO, AUTH_USERINFO_SUCCSS, AUTH_USERINFO_FAIL],
    promise: ({ client, cookies }) =>
      cookies.setItem('token', token).then(() =>
        client.get('/authuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ),
  };
}

export function loginAttempt() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSucces(result) {
  return ({ dispatch }) => {
    dispatch(getUser(result.access_token));
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      result,
    });
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAIL,
  };
}

export function register(payload) {
  return {
    types: [AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL],
    promise: ({ client }) => client.post('/register', payload),
  };
}

export function update(payload) {
  return {
    types: [AUTH_UPDATE, AUTH_UPDATE_SUCCESS, AUTH_UPDATE_FAIL],
    promise: ({ client }) => client.put('/register', payload),
  };
}

export function authenticate(payload) {
  return ({ dispatch, client }) => {
    dispatch(loginAttempt());
    return client
      .post('/authenticate', {
        username: payload.username,
        password: payload.password,
      })
      .then(response => {
        dispatch(loginSucces(response));
        return response;
      })
      .catch(Exception => {
        dispatch(loginFailure(Exception));
        throw Exception;
      });
  };
}

export function setToken(token) {
  return ({ dispatch }) => {
    dispatch({
      type: AUTH_AUTH_SET_TOKEN,
      token,
    });
  };
}

export function passwordReset(payload) {
  return {
    types: [AUTH_PASSWORD, AUTH_PASSWORD_SUCCESS, AUTH_PASSWORD_FAIL],
    promise: ({ client }) =>
      client.post('/password', {
        username: payload.username,
      }),
  };
}

export function passwordChange(payload) {
  return {
    types: [
      AUTH_PASSWORD_CHANGE,
      AUTH_PASSWORD_CHANGE_SUCCESS,
      AUTH_PASSWORD_CHANGE_FAIL,
    ],
    promise: ({ client }) =>
      client.post('/password-reset', {
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.passwordCheck,
        token: payload.token,
      }),
  };
}

export function isLoaded(globalState) {
  return (
    globalState.auth &&
    globalState.auth.user &&
    (globalState.auth.user.success === true ||
      globalState.auth.user.pending === true ||
      globalState.auth.user.failed === true)
  );
}

const initialState = {
  token: null,
  loggedIn: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_AUTH_SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        loggedIn: true,
        success: true,
        failed: false,
        pending: false,
      });
    case AUTH_LOGIN:
      return Object.assign({}, state, {
        token: null,
        loggedIn: false,
        loggedOut: false,
        pending: true,
        failed: false,
        success: false,
      });
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.result.access_token,
        loggedIn: true,
        pending: false,
        failed: false,
        success: true,
      });
    case AUTH_LOGIN_FAIL:
      return Object.assign({}, state, {
        token: null,
        loggedIn: false,
        pending: false,
        failed: true,
        success: false,
      });
    case AUTH_USERINFO:
      return Object.assign({}, state, {
        user: { pending: true, failed: false, success: false },
      });
    case AUTH_USERINFO_SUCCSS: {
      const result = action.result;
      return Object.assign({}, state, {
        user: {
          ...result,
          pending: false,
          failed: false,
          success: true,
        },
      });
    }
    case AUTH_USERINFO_FAIL:
      return Object.assign(
        {},
        {
          loggedIn: false,
          user: { pending: false, failed: true, success: false },
        },
      );
    case AUTH_AUTH_LOGOUT:
      return Object.assign(
        {},
        {
          token: null,
          loggedOut: true,
          loggedIn: false,
          pending: false,
          failed: false,
          success: false,
        },
      );
    case AUTH_PASSWORD:
      return Object.assign({}, state, {
        password: { pending: true, failed: false, success: false },
      });
    case AUTH_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        password: { pending: false, failed: false, success: true },
      });
    case AUTH_PASSWORD_FAIL:
      return Object.assign({}, state, {
        password: { pending: false, failed: true, success: false },
      });
    case AUTH_PASSWORD_CHANGE:
      return Object.assign({}, state, {
        passwordChange: { pending: true, failed: false, success: false },
      });
    case AUTH_PASSWORD_CHANGE_SUCCESS:
      return Object.assign({}, state, {
        passwordChange: { pending: false, failed: false, success: true },
      });
    case AUTH_PASSWORD_CHANGE_FAIL:
      return Object.assign({}, state, {
        passwordChange: {
          msg: action.result,
          pending: false,
          failed: true,
          success: false,
        },
      });
    case AUTH_REGISTER:
      return Object.assign({}, state, {
        register: { pending: true, failed: false, success: false },
      });
    case AUTH_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        user: action.result.user,
        token: action.result.access_token,
        loggedIn: true,
        register: { pending: false, failed: false, success: true },
      });
    case AUTH_REGISTER_FAIL:
      return Object.assign({}, state, {
        register: { pending: false, failed: true, success: false },
      });

    case AUTH_UPDATE:
      return Object.assign({}, state, {
        update: { pending: true, failed: false, success: false },
      });
    case AUTH_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        user: action.result,
        update: { pending: false, failed: false, success: true },
      });
    case AUTH_UPDATE_FAIL:
      return Object.assign({}, state, {
        update: { pending: false, failed: true, success: false },
      });

    case AUTH_SET_ACCOUNT_AFFILIATES_SUCCESS: {
      const accountIndex = _findIndex(state.user.accounts, [
        'id',
        _get(action, ['result', 'id']),
      ]);
      const affiliateIds = _get(action, ['result', 'affiliate_ids'], []);
      _set(
        state,
        ['user', 'accounts', accountIndex, 'affiliate_ids'],
        affiliateIds,
      );
      return Object.assign({}, state);
    }
    case AUTH_REDIRECT_AFTER_LOGIN: {
      return Object.assign({}, state, { redirectAfterLogin: action.result });
    }
    case AUTH_CLEAR_REDIRECT_AFTER_LOGIN: {
      return Object.assign({}, state, { redirectAfterLogin: null });
    }
    case AUTH_RESTORE:
      return Object.assign({}, state, action.result);
    default:
      return Object.assign({}, state);
  }
}
