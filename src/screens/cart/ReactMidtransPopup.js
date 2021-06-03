import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
const ReactMidtransPopup = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://app.sandbox.midtrans.com/snap/v2/vtweb/801afe31-1524-4fce-9f6e-445f23b5f538",
        }}
      />
    </View>
  );
};
export default ReactMidtransPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
