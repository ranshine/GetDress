import React from 'react';
import {Text} from 'react-native';

interface ICustomTxtProps {
  title: string;
  style?: any;
}

const CustomTextComponent = ({title, style}: ICustomTxtProps) => {
  return <Text style={style}>{title}</Text>;
};

export default CustomTextComponent;
