import React, {useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {IProduct} from '../interfaces';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

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
    <View style={styles.card_template}>
      <FastImage
        style={{
          width: 60,
          height: 60,
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: 'lightgray',
        }}
        source={{
          uri: item.img.replace('http:', 'https:'),
          cache: FastImage.cacheControl.web,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 8,
        }}>
        <Text
          style={{flexWrap: 'wrap', flex: 1, fontWeight: '400'}}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fc19c3',
            }}>{`$${item.price}`}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                onPress(item);
              }}
              style={{
                backgroundColor: '#E6FFE6',
                paddingHorizontal: 16,
                borderRadius: 8,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: 'green',
              }}>
              <Text style={{color: 'green', fontWeight: 'bold', fontSize: 10}}>
                REMOVE
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 8,
                fontWeight: 'bold',
              }}>
              {getItemCount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_template: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
});

export default React.memo(ProductCartComponent);
