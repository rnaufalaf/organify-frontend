import React from "react";
import { StyleSheet, Text } from "react-native";
import { Badge } from "react-native-paper";

import { connect } from "react-redux";

const CartBadge = (props) => {
  return (
    <>
      {props.productsInCart.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.productsInCart.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 15,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(CartBadge);
