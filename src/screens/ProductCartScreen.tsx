import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {Screen} from '../components';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart} from '../store/ActionCreators';
import ProductCartComponent from '../domain/ProductCartComponent';
import {IProduct, IProductCartState} from '../interfaces';
import {CART_EMPTY} from '../utils/AppConstants';

interface IProductCartRootState {
  productCart: IProductCartState;
}
export const ProductCartScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const {items} = useSelector(
    (state: IProductCartRootState) => state.productCart,
  );
  const [list, setList] = useState<IProduct[]>([]);

  useEffect(() => {
    const listItems = [...items];
    const newList = listItems.filter((obj, index) => {
      return index === items.findIndex(o => obj.id === o.id);
    });
    setList([...newList]);
  }, [items]);

  const onItemClick = (item: IProduct): void => {
    dispatch(removeFromCart(item));
  };

  const renderListComponent = useCallback(({item}) => {
    return <ProductCartComponent item={item} onPress={onItemClick} />;
  }, []);

  const getItemsCount = useMemo(() => {
    let total = 0;
    items.forEach(element => {
      total = total + element.price;
    });
    return total;
  }, [items]);
  const billComponent = () => {
    return (
      <View style={styles.billingViewStyle}>
        <Text style={styles.billTxtStyle}>Bill details</Text>
        <View style={styles.grandTotalViewStyle}>
          <Text style={styles.grandTotalTxtStyle}>Grand Total</Text>
          <Text style={styles.priceTxtStyle}>{`$${getItemsCount.toFixed(
            2,
          )}`}</Text>
        </View>
      </View>
    );
  };
  const getKeyExtractor = useCallback(
    (item, index) => JSON.stringify(item) + index,
    [],
  );

  return (
    <Screen hasScrollView={false}>
      {list.length > 0 ? (
        <FlatList
          testID="productCartListId"
          data={list}
          extraData={list}
          keyExtractor={getKeyExtractor}
          renderItem={renderListComponent}
          initialNumToRender={8}
          ListFooterComponent={billComponent}
        />
      ) : (
        <Text testID="cartTxtId" style={styles.cartEmptyTextStyle}>
          {CART_EMPTY}
        </Text>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  billingViewStyle: {padding: 16, flexDirection: 'column'},
  cartEmptyTextStyle: {
    textAlign: 'center',
    padding: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  billTxtStyle: {fontWeight: '700', fontSize: 14},
  grandTotalViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  grandTotalTxtStyle: {fontWeight: '400', fontSize: 14},
  priceTxtStyle: {fontWeight: 'bold'},
});
