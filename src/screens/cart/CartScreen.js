import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card, Button, Divider } from "react-native-paper";
import { Container, ListItem, View, Left } from "native-base";
import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";
import CartSummary from "./CartSummary";

import CartBySeller from "./CartBySeller";
import { objectSize } from "../../util/extensions";

import { GET_PRODUCTS_CART } from "../../util/graphql";

var { height, width } = Dimensions.get("window");

const CartScreen = (props) => {
  const { loading, data, refetch } = useQuery(GET_PRODUCTS_CART);

  let { getProductsCart: productsInCart } = data ? data : [];
  // console.log(loading);
  // if (!loading) {
  //   console.log("ini products in cart ", data);
  // }
  var size = objectSize(productsInCart);

  useEffect(() => {
    if (size > 0) {
      console.log("size", size);
      let group = productsInCart.reduce((r, a) => {
        r[a.product.user.id] = [...(r[a.product.user.id] || []), a];
        return r;
      }, {});
      let carts = props.carts;
      Object.keys(group).forEach(function (key) {
        // carts.find((cart) => cart.cartItems[0].item.user.seller.username == group[key][0].item.user.seller.username
        if (group[key][0].isChecked && objectSize(carts) <= 1) {
          const cart = {
            user: group[key][0].product.user, // data yang dibutuhkan : username, cityId
            productsInCart: group[key],
          };
          carts = [cart, ...carts];
        }
      });
      props.checkoutItems(carts, !props.isChange);
      console.log("lmaoobject", carts);
    }
  }, [size]);
  let cartUI = (
    <Container style={styles.emptyContainer}>
      <Text>Looks like you don't have anything inside your cart</Text>
      <Text>Add some items to get started</Text>
    </Container>
  );
  if (!loading) {
    if (size > 0) {
      let group = productsInCart.reduce((r, a) => {
        r[a.product.user.id] = [...(r[a.product.user.id] || []), a];
        return r;
      }, {});

      cartUI = (
        <>
          <Container>
            {group &&
              Object.keys(group).map((key, index) => (
                <CartBySeller
                  key={index}
                  productInCart={group[key]}
                  refetchCartQuery={refetch}
                />
              ))}
            <CartSummary />
          </Container>
        </>
      );
    }
  }
  return cartUI;
};

CartScreen.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
  isChange: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});
const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
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
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, { checkoutItems })(CartScreen);
