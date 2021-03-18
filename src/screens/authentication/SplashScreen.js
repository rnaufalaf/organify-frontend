import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Logo from '../../components/common/Logo';
import Paragraph from '../../components/common/Paragraph';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('Authorization');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.h1}>Organify</Text>
        <Paragraph style={styles.h2}>
          Organic Lifestyle at Your Fingertips
        </Paragraph>
      </View>
    );
  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: 'green',
    fontSize: 50,
  },
  h2: {
    fontSize: 20,
    marginTop: 8,
  },
  logo: {
    height: 400,
    width: 350,
    justifyContent: 'center',
  },
});
