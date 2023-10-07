import React, {useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IProduct} from '../interfaces';
import {useSelector} from 'react-redux';
import {CustomImageComponent} from '../components';

interface IProductItemProps {
  item: IProduct;
  onPress: (item: IProduct) => void;
}
// image size should be small
const ProductCartComponent = ({item, onPress}: IProductItemProps) => {
  const {items} = useSelector(state => state.productCart);

  const getItemCount = useMemo(() => {
    const filter = items.filter(currentItem => {
      return currentItem.id === item.id;
    });
    return filter.length;
  }, [items]);
  return (
    <View style={styles.cardTemplate}>
      <CustomImageComponent
        url={item.img}
        height={60}
        width={60}
        style={styles.imageStyle}
      />

      <View style={styles.nameViewStyle}>
        <Text style={styles.nameStyle} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={styles.priceViewStyle}>
          <Text style={styles.priceTxtStyle}>{`$${item.price}`}</Text>
          <View style={styles.removeButtonViewStyle}>
            <TouchableOpacity
              testID={`${item.id}btnID`}
              onPress={() => {
                onPress(item);
              }}
              style={styles.removeBtnStyle}>
              <Text style={styles.removeTxtStyle}>REMOVE</Text>
            </TouchableOpacity>
            <Text style={styles.cartTotalStyle}>{getItemCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardTemplate: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  imageStyle: {
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  nameViewStyle: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
  },
  nameStyle: {flexWrap: 'wrap', flex: 1, fontWeight: '400'},
  priceViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  priceTxtStyle: {
    fontWeight: 'bold',
    color: '#fc19c3',
  },
  removeButtonViewStyle: {flexDirection: 'row', alignItems: 'center'},
  removeBtnStyle: {
    backgroundColor: '#E6FFE6',
    paddingHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'green',
  },
  removeTxtStyle: {color: 'green', fontWeight: 'bold', fontSize: 10},
  cartTotalStyle: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default React.memo(ProductCartComponent);
