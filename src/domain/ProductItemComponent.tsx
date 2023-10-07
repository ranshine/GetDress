import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {IProduct} from '../interfaces';
import {ColorComponent, CustomImageComponent} from '../components';
import {favourite} from '../assets';

interface IProductItemProps {
  item: IProduct;
  onPress: (item: IProduct) => void;
}
// image size should be small
const ProductItemComponent = ({item, onPress}: IProductItemProps) => {
  return (
    <View style={styles.cardTemplate}>
      <View style={styles.columnStyle}>
        <CustomImageComponent url={item.img} height={200} width={100} />
        <Text style={styles.itemNameStyle}>{item.name}</Text>
        <View style={styles.colorViewStyle}>
          <ColorComponent colorCode={item.colour} />
          <Image style={styles.imageStyle} source={favourite} />
        </View>

        <View style={styles.priceViewStyle}>
          <Text style={styles.priceTxtStyle}>{`$${item.price}`}</Text>
          <TouchableOpacity
            testID={`${item.id}addId`}
            onPress={() => {
              onPress(item);
            }}
            style={styles.addViewStyle}>
            <Text style={styles.addTxtStyle}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTemplate: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  columnStyle: {flexDirection: 'column'},
  itemNameStyle: {marginTop: 16, fontWeight: '400'},
  colorViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  imageStyle: {width: 24, height: 24},
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
  addViewStyle: {
    backgroundColor: '#E6FFE6',
    paddingHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'green',
  },
  addTxtStyle: {color: 'green', fontWeight: 'bold'},
});

export default React.memo(ProductItemComponent);
