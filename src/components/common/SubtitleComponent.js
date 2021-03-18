import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';

const SubtitleComponent = (props) => (
  <Subheading style={styles.subtitleStyle}>{props.subtitle}</Subheading>
);

const styles = StyleSheet.create({
  subtitleStyle: {
    color: 'black',
    paddingHorizontal: 15,
    fontSize: 15,
  },
});

export default SubtitleComponent;
