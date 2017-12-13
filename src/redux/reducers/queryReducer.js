import { RECIPE_QUERY } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECIPE_QUERY:
      return [action.payload];
    default:
      return state;
  }
};
