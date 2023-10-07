import React, {useEffect, useState, useMemo} from 'react';
import {Screen} from '../components';
import {FlatList, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart} from '../store/ActionCreators';
import ProductCartComponent from '../domain/ProductCartComponent';
import {IProduct} from '../interfaces';

export const ProductCartScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.productCart);
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

  const renderListComponent = ({item, index}) => {
    return <ProductCartComponent item={item} onPress={onItemClick} />;
  };
  const getItemsCount = useMemo(() => {
    let total = 0;
    items.forEach(element => {
      total = total + element.price;
    });
    return total;
  }, [items]);
  const billComponent = () => {
    return (
      <View style={{padding: 16, flexDirection: 'column'}}>
        <Text style={{fontWeight: '800'}}>Bill details</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <Text style={{fontWeight: '400'}}>Grand Total</Text>
          <Text style={{fontWeight: 'bold'}}>{`$${getItemsCount.toFixed(
            2,
          )}`}</Text>
        </View>
      </View>
    );
  };
  return (
    <Screen hasScrollView={false}>
      {list.length > 0 ? (
        <FlatList
          data={list}
          extraData={list}
          keyExtractor={(item, index) => JSON.stringify(item) + index}
          renderItem={renderListComponent}
          initialNumToRender={8}
          ListFooterComponent={billComponent}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            padding: 16,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Your cart is empty, please add some items
        </Text>
      )}
    </Screen>
  );
};
