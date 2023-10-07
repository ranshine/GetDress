import React, {useEffect, useLayoutEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '../components';
import {getProducts, addToCart} from '../store/ActionCreators';
import ProductItemComponent from '../domain/ProductItemComponent';
import {useNavigation} from '@react-navigation/native';
import cart from '../assets/cart.png';
import {PRODUCT_CART} from '../navigation/Routes';

export const ProductListScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, error, data} = useSelector(state => state.productList);
  const {items} = useSelector(state => state.productCart);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{paddingRight: 4}}>
          <TouchableOpacity style={{paddingRight: 10}}>
            <Image source={cart} height={14} width={14} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(PRODUCT_CART);
            }}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              borderRadius: 10,
              top: 0,
              right: 0,
              paddingVertical: 2,
              paddingHorizontal: 6,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
              {items.length}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, items]);

  const onItemClick = (item: IProduct): void => {
    dispatch(addToCart(item));
  };

  const renderListComponent = ({item, index}) => {
    return <ProductItemComponent item={item} onPress={onItemClick} />;
  };

  if (loading) {
    return (
      <ActivityIndicator
        color={'#000080'}
        style={{position: 'absolute', marginTop: '60%', marginLeft: '40%'}}
        size={'large'}
      />
    );
  }

  return (
    <Screen hasScrollView={false}>
      <FlatList
        numColumns={2}
        data={data}
        extraData={data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderListComponent}
        initialNumToRender={6}
      />
    </Screen>
  );
};
