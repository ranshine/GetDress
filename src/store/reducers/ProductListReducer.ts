import {IProductAction, IProductState} from '../../interfaces';
import {
  GET_PRODUCT_LIST_ERROR,
  GET_PRODUCT_LIST_LOADING,
  GET_PRODUCT_LIST_SUCCESS,
} from '../ActionTypes';
const initialState: IProductState = {
  loading: false,
  error: '',
  data: [],
};

export const ProductListReducer = (
  state = initialState,
  action: IProductAction,
): IProductState => {
  switch (action.type) {
    case GET_PRODUCT_LIST_LOADING:
      return {...state, loading: true, data: action.payload.data};
    case GET_PRODUCT_LIST_SUCCESS:
      return {...state, data: action.payload.data, loading: false};
    case GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
