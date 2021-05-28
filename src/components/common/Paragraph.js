import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../constants/Theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    textAlign: "justify",
    fontSize: wp(3.89),
    lineHeight: 25,
    color: "black",
    marginBottom: 14,
    margin: 20,
  },
});

export default memo(Paragraph);
