import {IProductCartAction, IProductCartState} from '../../interfaces';
import {ADD_PRODUCT, REMOVE_PRODUCT} from '../ActionTypes';
const initialState: IProductCartState = {
  items: [],
};

export const ProductCartReducer = (
  state = initialState,
  action: IProductCartAction,
) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      const list = [...state.items];
      list.push(action.payload);
      return {
        ...state,
        items: list,
      };
    }
    case REMOVE_PRODUCT: {
      const list = [...state.items];
      const index = list.findIndex(item => {
        return item.id === action.payload.id;
      });
      list.splice(index, 1);
      return {
        ...state,
        items: list,
      };
    }
    default:
      return state;
  }
};
