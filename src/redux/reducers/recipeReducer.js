import { ADD_RECIPE } from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return action.payload;
    default:
      return state;
  }
};
