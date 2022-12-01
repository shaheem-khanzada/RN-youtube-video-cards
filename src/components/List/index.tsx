import axios from 'axios';
import * as React from 'react';
import { Animated, View, ScrollView, StyleSheet } from 'react-native';
import Item from './item';

const YOUTUBE_API_KEY = 'AIzaSyCAy2bKfO87Rf7P9iPOV-j7cDNExnJejEk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 200,
  },
});

const Spacer = ({ spacing, axis = 'Vertical' }: any) => (
  <View
    style={axis === 'Vertical' ? { height: spacing } : { width: spacing }}
  />
);

const intersperse = (item: any, array: any) =>
  array.reduce((acc: any, each: any, index: any) => {
    const isLast = index + 1 === array.length;
    if (isLast) {
      return [...acc, each];
    }
    return [...acc, each, item];
  }, []);

const flexOne = { flex: 1 };

const GridView = ({
  children,
  crossAxisCount,
  mainAxisSpacing = 0,
  crossAxisSpacing = 0,
  onScroll,
}: any) => {
  const defaultSection = Array.from({ length: crossAxisCount }).map(() => null);
  const numberOfColumns = Math.round(children.length / crossAxisCount);
  let copiedChildren = children?.slice?.();

  const getItemsForRow = () =>
    defaultSection.map(() =>
      copiedChildren.length ? (
        <View style={flexOne}>{copiedChildren.shift()}</View>
      ) : (
        <View style={flexOne} />
      )
    );

  const list = Array.from({ length: numberOfColumns }).map((_, idx) => (
    <View style={{ flexDirection: 'row' }} key={idx}>
      {intersperse(
        <Spacer axis="Horizontal" spacing={crossAxisSpacing} />,
        getItemsForRow()
      )}
    </View>
  ));

  return (
    <ScrollView onScroll={onScroll}>
      {intersperse(<Spacer spacing={mainAxisSpacing} />, list)}
    </ScrollView>
  );
};

const FlatListBasics = () => {
  const [videos, setVideos] = React.useState<any[]>([]);
  const [itemsPerRow, setItemsPerRow] = React.useState(3);
  const [nextPageToken, setNextPageToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const fetchVideos = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const { data }: any = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=programming&key=${YOUTUBE_API_KEY}${
          nextPageToken ? '&pageToken=' + nextPageToken : ''
        }`
      );
      setNextPageToken(data.nextPageToken);
      setVideos((prevVideos: any) => [...prevVideos, ...data.items]);
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchVideos();
  }, []);

  const onLayout = (e: any) => {
    console.log('event onLayout', e?.nativeEvent?.layout?.width);
    if (e && e?.nativeEvent?.layout) {
      let width = e?.nativeEvent?.layout?.width;
      if (width < 512) {
        setItemsPerRow(1);
      } else if (width < 882) {
        setItemsPerRow(2);
      } else if (width < 1142) {
        setItemsPerRow(3);
      } else if (width > 1142) {
        setItemsPerRow(4);
      }
    }
  };

  const handleInfinityScroll = (event: any) => {
    console.log('event', event);
    let mHeight = event?.nativeEvent?.layoutMeasurement?.height;
    let cSize = event?.nativeEvent?.contentSize?.height;
    let Y = event?.nativeEvent?.contentOffset?.y;
    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  };

  if (!videos.length) {
    return <View />;
  }

  return (
    <Animated.View onLayout={(e) => onLayout(e)} style={styles.container}>
      <GridView
        crossAxisCount={itemsPerRow}
        onScroll={(event: any) => {
          if (handleInfinityScroll(event)) {
            fetchVideos();
          }
        }}
        mainAxisSpacing={0}
        crossAxisSpacing={0}
      >
        {videos.map((video, index) => {
          return <Item key={index} video={video.snippet} />;
        })}
      </GridView>
    </Animated.View>
  );
};

export default FlatListBasics;
