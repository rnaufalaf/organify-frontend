import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Title, Divider } from "react-native-paper";
import { Left, Body, Right, Container } from "native-base";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { checkoutItems } from "../../../Redux/actions/orderAction";
import { currencyIdrConverter } from "../../util/extensions";
import { sub } from "react-native-reanimated";

const CartSummary = (props) => {
  const [subTotal, setSubTotal] = useState(0);
  const [amountOfProducts, setAmountOfProducts] = useState(0);

  let total = 0;
  let amountCounter = 0;

  console.log(props);

  useEffect(() => {
    props.carts.forEach((cart) => {
      cart.productsInCart.forEach((productInCart) => {
        amountCounter += productInCart.productQty;
        const price = parseInt(productInCart.product.price);
        total += price * productInCart.productQty;
      });
    });
    setAmountOfProducts(amountCounter);
    setSubTotal(total);

    console.log("sini", amountCounter, total);
  }, [props.carts, props.isChange]);

  function checkout() {
    props.navigation.navigate();
  }

  return (
    <View>
      <Divider></Divider>
      <Card>
        <Card.Content>
          <Title>Cart Summary</Title>
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ paddingLeft: 5, flexDirection: "row" }}>
                <Text>Sub total : </Text>
                <Text style={styles.price}>
                  Rp {currencyIdrConverter(subTotal, 0, ".", ",")}
                </Text>
              </View>
              <View style={{ paddingLeft: 5, flexDirection: "row" }}>
                <Text>Sub total : ({amountOfProducts} products) </Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

CartSummary.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
    color: "green",
  },
});

export default connect(mapStateToProps, { checkoutItems })(CartSummary);
