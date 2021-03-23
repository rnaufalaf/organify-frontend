import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import TitleComponent from "../common/TitleComponent";
import Paragraph from "../common/Paragraph";

const FirstRoute = (props) => (
  <View>
    <TitleComponent
      title="Deskripsi"
      style={{ color: "green", fontWeight: "bold" }}
    />
    <View>
      <Paragraph>{props.description}</Paragraph>
    </View>
  </View>
);

const SecondRoute = (props) => (
  <View>
    <TitleComponent
      title="Khasiat"
      style={{ color: "green", fontWeight: "bold" }}
    />
    <View>
      <Paragraph>{props.benefits}</Paragraph>
    </View>
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

const TabComponent = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Deskripsi" },
    { key: "second", title: "Khasiat" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "yellow" }}
      style={{ backgroundColor: "green" }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  scene: {
    flex: 1,
  },
});

export default TabComponent;
