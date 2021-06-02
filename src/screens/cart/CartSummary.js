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
  }, [props.carts, props.isChange]);

  function checkout() {
    props.navigation.navigate("Checkout");
  }

  return (
    <View>
      <Divider style={{ backgroundColor: "black" }} />
      <Card>
        <Card.Content>
          <Title
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "green",
              textAlign: "center",
            }}
          >
            Cart Summary
          </Title>
          <View style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ marginVertical: 5, flexDirection: "row" }}>
                <Text style={styles.text}>Sub total : </Text>
                <Text
                  style={
                    ([styles.price],
                    {
                      right: -235,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "green",
                    })
                  }
                >
                  Rp {currencyIdrConverter(subTotal, 0, ".", ",")}
                </Text>
              </View>
              <View style={{ marginVertical: 5, flexDirection: "row" }}>
                <Text style={styles.text}>Total Products : </Text>
                <Text style={([styles.text], { right: -200, fontSize: 17 })}>
                  ({amountOfProducts} products){" "}
                </Text>
              </View>
            </View>
          </View>
          <Button mode="contained" onPress={checkout}>
            Checkout
          </Button>
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
    fontSize: 17,
    fontWeight: "bold",
    color: "green",
  },
  text: {
    fontSize: 17,
  },
});

export default connect(mapStateToProps, { checkoutItems })(CartSummary);
