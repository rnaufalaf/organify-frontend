import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';

const TitleComponent = (props) => (
  <Title style={styles.titleStyle}>{props.title}</Title>
);

const styles = StyleSheet.create({
  titleStyle: {
    color: 'black',
    paddingHorizontal: 15,
    paddingTop: 10,
    fontWeight: '700',
    fontSize: 24,
  },
});

export default TitleComponent;
