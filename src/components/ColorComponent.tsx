import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useColorCode} from '../hooks';

interface IColorProp {
  colorCode: string;
}

export const ColorComponent = ({colorCode}: IColorProp) => {
  const {getColorValue} = useColorCode(colorCode);
  return (
    <View
      testID="colorCodeId"
      style={[styles.container, {backgroundColor: getColorValue()}]}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
});
