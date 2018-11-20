import _get from 'lodash/get';
import _set from 'lodash/set';
import { wrapAction } from 'multireducer';

export const COUNTER_RESTORE = '@@redux-persist-component/counters';
export const COUNTER_INCREASE = 'counter_increase';
export const COUNTER_DECREASE = 'counter_decrease';
export const COUNTER_RESET = 'counter_reset';
export const COUNTER_RESET_ALL = 'counter_reset_all';

function restoreLocal({ dispatch, result, currentState }) {
  Object.keys(result).map(
    objKey =>
      objKey === 'counterLocalStorage' &&
      JSON.stringify(result.counterCookie) !==
        JSON.stringify(currentState.counterCookie)
        ? dispatch(
            wrapAction(
              {
                type: '@@redux-persist-component/counters',
                result: result[objKey],
              },
              objKey,
            ),
          )
        : null,
  );
}

function restoreCookie({ dispatch, result, currentState }) {
  Object.keys(result).map(
    objKey =>
      objKey === 'counterCookie' &&
      JSON.stringify(result.counterCookie) !==
        JSON.stringify(currentState.counterCookie)
        ? dispatch(
            wrapAction(
              {
                type: '@@redux-persist-component/counters',
                result: result[objKey],
              },
              objKey,
            ),
          )
        : null,
  );
}

export function saveAndRestoreCookie() {
  return {
    save: state => ({ counterCookie: state.counterCookie }),
    restore: restoreCookie,
  };
}

export function saveAndRestoreLocal() {
  return {
    save: state => ({ counterLocalStorage: state.counterLocalStorage }),
    restore: restoreLocal,
  };
}

export function increase(index) {
  return {
    type: COUNTER_INCREASE,
    index,
  };
}

export function decrease(index) {
  return {
    type: COUNTER_DECREASE,
    index,
  };
}

export function reset(index) {
  return {
    type: COUNTER_RESET,
    index,
  };
}

export function resetAll() {
  return {
    type: COUNTER_RESET_ALL,
  };
}

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case COUNTER_RESTORE:
      return Object.assign({}, newState, action.result);
    case COUNTER_INCREASE:
      return _set(newState, action.index, _get(state, action.index, 0) + 1);
    case COUNTER_DECREASE:
      return _set(newState, action.index, _get(state, action.index, 0) - 1);
    case COUNTER_RESET:
      return _set(newState, action.index, 0);
    case COUNTER_RESET_ALL:
      return initialState;
    default:
      return state;
  }
}
