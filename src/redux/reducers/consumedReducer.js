import { ADD_HEALTHY_ITEM, ADD_JUNK_ITEM } from '../actions/types';

const INITIAL_STATE = {
  healthyFood: [],
  junkFood: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_HEALTHY_ITEM:
      return { ...state, healthyFood: [...state.healthyFood, action.payload] };
    case ADD_JUNK_ITEM:
      return { ...state, junkFood: [...state.junkFood, action.payload] };
    default:
      return state;
  }
};
