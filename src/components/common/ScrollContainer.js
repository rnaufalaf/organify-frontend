import React from "react";
import { ScrollView, Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

var { width } = Dimensions.get("window");

const ScrollContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: width,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default ScrollContainer;
