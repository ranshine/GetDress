import {IProduct} from './IProduct';

export interface IProductCartAction {
  type: string;
  payload: IProduct;
}
