import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import itemReducer from './itemReducer';
import userReducer from './userReducer';

export default combineReducers({
  recipes: recipeReducer,
  items: itemReducer,
  user: userReducer,
});
