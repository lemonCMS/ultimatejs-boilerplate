import _set from 'lodash/set';
import _omit from 'lodash/omit';

export const STORAGE_SAVE = 'STORAGE_SAVE';
export const STORAGE_PURGE = 'STORAGE_PURGE';

export function save(key, values) {
  return {
    type: STORAGE_SAVE,
    key,
    values,
  };
}

export function purge(key) {
  return {
    type: STORAGE_PURGE,
    key,
  };
}

export default function reducer(orgState, action = {}) {
  const state = Object.assign({}, orgState);
  switch (action.type) {
    case STORAGE_PURGE: {
      return Object.assign({}, _omit(state, action.key));
    }
    case STORAGE_SAVE: {
      return Object.assign({}, _set(state, action.key, action.values));
    }
    default:
      return Object.assign({}, state);
  }
}
