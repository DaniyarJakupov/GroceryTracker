import axios from 'axios';

import { FETCH_DROPS } from './types';

export function fetchDrops() {
  const url = '';
  return function (dispatch) {
    axios
      .get(url)
      .then(response =>
        dispatch({
          type: FETCH_DROPS,
          payload: response,
        }))
      .catch(err =>
        dispatch({
          type: 'ERROR',
          payload: err,
        }));
  };
}
