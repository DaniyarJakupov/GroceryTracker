import { FETCH_RECIPE } from '../actions/types';

const INITIAL_STATE = {
  matches: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPE:
      return action.payload;
    default:
      return state;
  }
};
