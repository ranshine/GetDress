import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {ProductListScreen} from '../src/screens';
import thunk from 'redux-thunk';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});

describe('testing product list screen', () => {
  it('render productlist"', async () => {
    const mockState = {
      productList: {
        loading: false,
        error: '',
        data: [],
      },
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductListScreen />
      </Provider>,
    );
  });
  it('render product list', async () => {
    const mockState = {
      productList: {
        loading: false,
        error: '',
        data: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
          {
            id: 2,
            colour: 'Black',
            name: 'Black Frill Tie Shoulder Bodycon Dress',
            price: 8,
            img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
          },
        ],
      },
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductListScreen />
      </Provider>,
    );
    const list = screen.getByTestId('productListId');
    expect(list).toBeTruthy();
  });
  it('no products list', async () => {
    const mockState = {
      productList: {
        loading: false,
        error: '',
        data: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
        ],
      },
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductListScreen />
      </Provider>,
    );
    const productsEmptyText = screen.findByText('No items found');
    expect(productsEmptyText).toBeTruthy();
  });
  it('adding items to cart', async () => {
    const mockState = {
      productList: {
        loading: false,
        error: '',
        data: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
        ],
      },
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductListScreen />
      </Provider>,
    );
    const addToCart = screen.getByTestId('1addId');
    fireEvent.press(addToCart);
  });
  it('check product list visible"', async () => {
    const mockState = {
      productList: {
        loading: false,
        error: '',
        data: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
        ],
      },
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductListScreen />
      </Provider>,
    );
    const name = screen.getAllByText(
      'Black Sheet Strappy Textured Glitter Bodycon Dress',
    );
    expect(name).toBeTruthy();
  });
  it('check product color', async () => {
    const mockState = {
      productList: {
        loading: false,
        error: '',
        data: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
        ],
      },
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductListScreen />
      </Provider>,
    );
    const colorCode = screen.getByTestId('colorCodeId');
    expect(colorCode).toBeTruthy();
  });
});
