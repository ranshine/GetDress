import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {ProductCartReducer, ProductListReducer} from './reducers';

const reducer = combineReducers({
  productList: ProductListReducer,
  productCart: ProductCartReducer,
});
const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});
export default store;
