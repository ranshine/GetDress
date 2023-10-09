import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {ProductCartScreen} from '../src/screens';
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

describe('testing product cart screen', () => {
  it('render productlist"', async () => {
    const mockState = {
      productCart: {
        items: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
          {
            id: 2,
            colour: 'Stone',
            name: 'Stone Ribbed Strappy Cut Out Detail Bodycon Dress',
            price: 4,
            img: 'https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024',
          },
          {
            id: 3,
            colour: 'Black',
            name: 'Black Frill Tie Shoulder Bodycon Dress',
            price: 7.99,
            img: 'https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024',
          },
          {
            id: 5,
            colour: 'Red',
            name: 'Red Pin Stripe Belt T Shirt Dress',
            price: 17,
            img: 'https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024',
          },
        ],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
  });
  it('display cart empty"', async () => {
    const mockState = {
      productCart: {
        items: [],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    const {findByText} = render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
    const cartTxt = findByText('Your cart is empty, please add some items');
    expect(cartTxt).toBeTruthy();
  });
  it('check cartlist visible"', async () => {
    const mockState = {
      productCart: {
        items: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
        ],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    const {getByTestId} = render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
    const list = getByTestId('productCartListId');
    expect(list).toBeTruthy();
  });
  it('check cartlist item visible"', async () => {
    const mockState = {
      productCart: {
        items: [
          {
            id: 1,
            colour: 'Black',
            name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
            price: 10,
            img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
          },
        ],
      },
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
    const name = screen.getAllByText(
      'Black Sheet Strappy Textured Glitter Bodycon Dress',
    );
    expect(name).toBeTruthy();
  });
  it('check billing details"', async () => {
    const mockState = {
      productCart: {
        items: [
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
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
    const price = screen.getAllByText('$18.00');
    expect(price).toBeTruthy();
  });
  it('remove item from cart', async () => {
    const mockState = {
      productCart: {
        items: [
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
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
    const removeBtn = screen.getByTestId('1removebtnID');
    fireEvent.press(removeBtn);
  });
  it('add item to cart', async () => {
    const mockState = {
      productCart: {
        items: [
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
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <ProductCartScreen />
      </Provider>,
    );
    const addBtn = screen.getByTestId('1addbtnID');
    fireEvent.press(addBtn);
  });
});
