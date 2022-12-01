import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  img: {
    width: '100%',
    minHeight: 172,
    borderRadius: 10,
  },
});

const Thumbnail = ({ image }: any) => {
  return (
    <Image
      style={[styles.img]}
      source={{
        uri: image,
      }}
    />
  );
};
export default Thumbnail;
