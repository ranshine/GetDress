import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {IProduct} from '../interfaces';
import FastImage from 'react-native-fast-image';
import {ColorComponent} from '../components';
import favourite from '../assets/favourite.png';

interface IProductItemProps {
  item: IProduct;
  onPress: (item: IProduct) => void;
}
// image size should be small
const ProductItemComponent = ({item, onPress}: IProductItemProps) => {
  return (
    <View style={styles.card_template}>
      <View style={{flexDirection: 'column'}}>
        <FastImage
          style={{width: 100, height: 200, alignSelf: 'center'}}
          source={{
            uri: item.img.replace('http:', 'https:'),
            cache: FastImage.cacheControl.web,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={{marginTop: 16}}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 4,
            alignItems: 'center',
          }}>
          <ColorComponent colorCode={item.colour} />
          <Image style={{width: 24, height: 24}} source={favourite} />
        </View>

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
            <Text style={{color: 'green', fontWeight: 'bold'}}>ADD</Text>
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
  card_template: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  card_image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});

export default React.memo(ProductItemComponent);
