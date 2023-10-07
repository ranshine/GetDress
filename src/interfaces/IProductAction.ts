import {IProductState} from './IProductState';

export interface IProductAction {
  type: string;
  payload: IProductState;
}
