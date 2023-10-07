import React from 'react';
import {View} from 'react-native';
import {useColorCode} from '../hooks';

interface IColorProp {
  colorCode: string;
}

export const ColorComponent = ({colorCode}: IColorProp) => {
  const {getColorValue} = useColorCode(colorCode);
  return (
    <View
      style={{
        backgroundColor: getColorValue(),
        height: 20,
        width: 20,
        borderRadius: 10,
        marginVertical: 8,
      }}></View>
  );
};
