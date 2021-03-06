import * as React from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const TitleComponent = (props) => {
  return <Title style={[styles.titleStyle, props.style]}>{props.title}</Title>;
};

const styles = StyleSheet.create({
  titleStyle: {
    color: "black",
    paddingHorizontal: 15,
    fontWeight: "700",
    fontSize: 20,
  },
});

export default TitleComponent;
