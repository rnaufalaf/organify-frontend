import * as React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';

const AppBar = () => {
  const back = () => console.log('Went back');

  const search = () => console.log('Searching');

  const options = () => console.log('Shown more');

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={back} />
        <Appbar.Content
          title="Organify"
          titleStyle={{alignSelf: 'center', marginLeft: 40}}
        />
        <Appbar.Action icon="magnify" onPress={search} />
        <Appbar.Action icon="dots-vertical" onPress={options} />
      </Appbar.Header>
    </View>
  );
};

export default AppBar;
