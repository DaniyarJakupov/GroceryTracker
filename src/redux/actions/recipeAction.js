import axios from 'axios';

import { FETCH_RECIPE } from './types';

const baseUrl =
  'https://api.yummly.com/v1/api/recipes?_app_id=0afd9c29&_app_key=399fb5ef83be884a1dcd5a537acc1fe7&requirePictures=true&q=';

// recipe: http://api.yummly.com/v1/api/recipe/Lemon-Posset-2269827?_app_id=0afd9c29&_app_key=399fb5ef83be884a1dcd5a537acc1fe7

// ACTION CREATOR
export const fetchRecipes = item => async (dispatch) => {
  try {
    const url = `${baseUrl}${item}`;
    const { data: { matches } } = await axios.get(url);
    // DISTPATCHING ACTION TO REDUCERS
    dispatch({
      type: FETCH_RECIPE,
      payload: matches,
    });
    // callback();

    // console.log(matches);
  } catch (err) {
    console.log(err);
  }
};
//
