import * as React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const TileComponent = () => (
  <Card style={{paddingHorizontal: 5}}>
    <Card.Cover
      style={styles.coverSize}
      source={{uri: 'https://picsum.photos/700'}}
    />
    <Card.Title title="Card Title" subtitle="Card Subtitle" />
  </Card>
);

export default TileComponent;

const styles = StyleSheet.create({
  coverSize: {
    height: 200,
    width: 200,
  },
});
