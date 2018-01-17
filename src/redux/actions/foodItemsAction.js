import { ADD_ITEM, ADD_ITEM_ARRAY, REMOVE_ITEM, ADD_HEALTHY_ITEM, ADD_JUNK_ITEM } from './types';

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item,
});

export const addItemArray = array => ({
  type: ADD_ITEM_ARRAY,
  payload: array,
});

export const removeItem = item => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const addHealthyItem = item => ({
  type: ADD_HEALTHY_ITEM,
  payload: item,
});

export const addJunkItem = item => ({
  type: ADD_JUNK_ITEM,
  payload: item,
});
