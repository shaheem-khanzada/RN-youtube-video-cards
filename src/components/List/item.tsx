import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Pressable } from 'react-native-web-hover';

import HoverButton from './components/HoverButton';
import Thumbnail from './components/Thumbnail';
import VideoDetail from './components/VideoDetail';

const styles = StyleSheet.create({
  cardContainer: {
    padding: 27,
    flex: 1,
  },
});

const Item = ({ video }: any) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const padding = React.useRef(new Animated.Value(27)).current;

  const hoverOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: false,
      duration: 10,
    }).start();
    Animated.timing(padding, {
      toValue: 27,
      duration: 10,
      useNativeDriver: false,
    }).start();
  };

  const hoverIn = () => {
    Animated.timing(scale, {
      toValue: 1.02,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(padding, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      style={({ hovered }: any) => [hovered ? { zIndex: 2 } : { zIndex: 1 }]}
    >
      {({ hovered }: any) => {
        hovered ? hoverIn() : hoverOut();
        return (
          <Animated.View
            style={[
              styles.cardContainer,
              {
                transform: [
                  {
                    scale: scale.interpolate({
                      inputRange: [1, 1.02],
                      outputRange: [0.9, 1.06],
                    }),
                  },
                ],
                padding: padding,
                ...(hovered
                  ? {
                      boxShadow: 'black 0px 1px 3px 2px',
                      backgroundColor: '#0f0f0f',
                      borderRadius: 10,
                      position: 'absolute',
                      width: '100%',
                    }
                  : {}),
              },
            ]}
          >
            <Thumbnail image={video.thumbnails.high.url} />
            <VideoDetail
              title={video.title}
              channelTitle={video.channelTitle}
              image={video.thumbnails.high.url}
              hovered={hovered}
            />
            <HoverButton
              isHovered={hovered}
              title="Watch Later"
              style={{ marginTop: 15 }}
            />
            <HoverButton isHovered={hovered} title="Add to queue" />
          </Animated.View>
        );
      }}
    </Pressable>
  );
};

export default Item;
