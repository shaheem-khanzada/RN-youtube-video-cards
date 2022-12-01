import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import List from '../components/List/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 15,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    margin: 24,
    textAlign: 'center',
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
};

export default Home;
