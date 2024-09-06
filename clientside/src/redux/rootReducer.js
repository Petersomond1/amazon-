import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from  './slices/carSlice.js'
import navigationReducer from './slices/navigationReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  navigation: navigationReducer,
  // Add other reducers here if you have any
});

export default rootReducer