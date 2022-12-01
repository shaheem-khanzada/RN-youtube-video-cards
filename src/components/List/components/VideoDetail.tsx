import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingRight: 24,
    color: '#fff',
  },
  channelIcon: {
    marginRight: 12,
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
  },
  channelDetails: {
    flexDirection: 'column',
  },
  channelName: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
  },
  channelViews: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
    marginRight: 3,
  },
  icon: {
    fontSize: 20,
  },
});

const VideoDetail = ({ hovered, channelTitle, title, image }: any) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        style={styles.channelIcon}
        resizeMode={'cover'}
        source={{
          uri: image,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          {hovered ? (
            <MaterialIcons name="more-vert" size={20} color="#fff" />
          ) : null}
        </View>
        <Text style={styles.channelName}>
          {channelTitle}{' '}
          <View/>
          <IoniconsIcon name="ios-checkmark-circle" size={12} color="#aaaaaa" />
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.channelViews}>8.1M views</Text>
          <Text style={styles.channelViews}>{`\u2022`}</Text>
          <Text style={styles.channelViews}>7 days ago</Text>
        </View>
      </View>
    </View>
  );
};

export default VideoDetail;
