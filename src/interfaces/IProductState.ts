import {IProduct} from './IProduct';

export interface IProductState {
  loading: boolean;
  error: string;
  data: IProduct[];
}
