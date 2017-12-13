import axios from 'axios';

import { FETCH_RECIPE, RECIPE_QUERY } from './types';

const baseUrl =
  'https://api.yummly.com/v1/api/recipes?_app_id=0afd9c29&_app_key=399fb5ef83be884a1dcd5a537acc1fe7&requirePictures=true&q=';

// recipe: http://api.yummly.com/v1/api/recipe/Lemon-Posset-2269827?_app_id=0afd9c29&_app_key=399fb5ef83be884a1dcd5a537acc1fe7

// ACTION CREATOR
export const fetchRecipes = item => async (dispatch) => {
  try {
    const url = `${baseUrl}${item}`;
    console.log(url);
    const { data: { matches } } = await axios.get(url);
    // DISTPATCHING ACTION TO REDUCERS
    dispatch({
      type: FETCH_RECIPE,
      payload: matches,
    });
    dispatch({
      type: RECIPE_QUERY,
      payload: item,
    });
  } catch (err) {
    console.log(err);
  }
};
//
