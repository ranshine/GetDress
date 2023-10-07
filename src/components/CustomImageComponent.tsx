import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

interface ICustomImageProps {
  url: string;
  height: number;
  width: number;
  style?: any;
}

export const CustomImageComponent = ({
  url,
  height,
  width,
  style,
}: ICustomImageProps) => {
  return (
    <FastImage
      style={[styles.imageStyle, style, {height: height, width: width}]}
      source={{
        uri: url.replace('http:', 'https:'),
        cache: FastImage.cacheControl.web,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    alignSelf: 'center',
  },
});
