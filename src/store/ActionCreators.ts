import {IProduct} from '../interfaces';
import {
  ADD_PRODUCT,
  GET_PRODUCT_LIST_ERROR,
  GET_PRODUCT_LIST_LOADING,
  GET_PRODUCT_LIST_SUCCESS,
  REMOVE_PRODUCT,
} from './ActionTypes';

export const getProducts = () => {
  return dispatch => {
    dispatch({
      type: GET_PRODUCT_LIST_LOADING,
      payload: {
        loading: true,
        error: '',
        data: [],
      },
    });
    fetch(
      'https://my-json-server.typicode.com/benirvingplt/products/products',
      {
        method: 'GET',
        headers: {},
      },
    )
      .then(r => r.json())
      .then(resp => {
        dispatch({
          type: GET_PRODUCT_LIST_SUCCESS,
          payload: {
            loading: false,
            error: '',
            data: resp,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: GET_PRODUCT_LIST_ERROR,
          payload: {
            loading: false,
            error: error,
            data: [],
          },
        });
      });
  };
};

export const addToCart = (item: IProduct) => {
  return dispatch => {
    dispatch({type: ADD_PRODUCT, payload: item});
  };
};
export const removeFromCart = (item: IProduct) => {
  return dispatch => {
    dispatch({type: REMOVE_PRODUCT, payload: item});
  };
};
