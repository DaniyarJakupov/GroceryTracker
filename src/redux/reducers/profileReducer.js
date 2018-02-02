const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PROFILE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
