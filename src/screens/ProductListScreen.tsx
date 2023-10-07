import React, {useEffect, useLayoutEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '../components';
import {getProducts, addToCart} from '../store/ActionCreators';
import ProductItemComponent from '../domain/ProductItemComponent';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_CART} from '../navigation/Routes';
import {IProduct, IProductCartState, IProductState} from '../interfaces';
import {cart} from '../assets';
import {NO_ITEMS_FOUND} from '../utils/AppConstants';

interface IProductRootState {
  productList: IProductState;
}
interface IProductCartRootState {
  productCart: IProductCartState;
}

export const ProductListScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, error, data} = useSelector(
    (state: IProductRootState) => state.productList,
  );
  const {items} = useSelector(
    (state: IProductCartRootState) => state.productCart,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const renderHeaderRightComponent = (): JSX.Element => {
    return (
      <View style={styles.headerContainerStyle}>
        <TouchableOpacity style={styles.cartImageStyle}>
          <Image source={cart} height={14} width={14} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(PRODUCT_CART);
          }}
          hitSlop={styles.hitSlopStyle}
          style={styles.itemsCountStyle}>
          <Text style={styles.itemTxtStyle}>{items.length}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderHeaderRightComponent(),
    });
  }, [navigation, items]);

  const onItemClick = (item: IProduct): void => {
    dispatch(addToCart(item));
  };

  const getKeyExtractor = useCallback(
    (item, index) => JSON.stringify(item) + index,
    [],
  );

  const renderListComponent = useCallback(({item}) => {
    return <ProductItemComponent item={item} onPress={onItemClick} />;
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        color={'#000080'}
        style={styles.indicatorStyle}
        size={'large'}
      />
    );
  }

  return (
    <Screen hasScrollView={false}>
      {data.length > 0 && error === '' ? (
        <FlatList
          testID="productListId"
          numColumns={2}
          data={data}
          extraData={data}
          keyExtractor={getKeyExtractor}
          renderItem={renderListComponent}
          initialNumToRender={6}
        />
      ) : (
        <Text style={styles.noItemStyle} testID="noItemsId">
          {NO_ITEMS_FOUND}
        </Text>
      )}
    </Screen>
  );
};
const styles = StyleSheet.create({
  indicatorStyle: {position: 'absolute', marginTop: '60%', marginLeft: '40%'},
  noItemStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
  },
  hitSlopStyle: {top: 20, bottom: 20, left: 50, right: 50},
  itemsCountStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    top: 0,
    right: 0,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  itemTxtStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainerStyle: {paddingRight: 4},
  cartImageStyle: {paddingRight: 10},
});
