import { ADD_ITEM, ADD_ITEM_ARRAY, REMOVE_ITEM } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case ADD_ITEM_ARRAY:
      return [...action.payload];
    case REMOVE_ITEM:
      return state.filter(item => item.name !== action.payload.name);
    default:
      return state;
  }
};
