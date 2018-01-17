import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import queryReducer from './queryReducer';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import consumedReducer from './consumedReducer';

export default combineReducers({
  recipes: recipeReducer,
  queries: queryReducer,
  items: itemReducer,
  user: userReducer,
  consumed: consumedReducer,
});
