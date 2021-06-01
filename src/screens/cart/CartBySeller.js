import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Left, Right } from "native-base";
import { Divider, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import CartByProducts from "./CartByProducts";

import { useMutation } from "@apollo/client";
import { ADD_CHECKLIST_TO_CART } from "../../util/graphql";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";

const CartBySeller = (props) => {
  const [checked, setChecked] = useState(props.productInCart[0].isChecked);
  const [errors, setErrors] = useState({});

  console.log("im here", props);
  let productIds = [];
  props.productInCart.forEach((productInCart) => {
    productIds = [...productIds, productInCart.product.id];
  });

  const [addChecklist] = useMutation(ADD_CHECKLIST_TO_CART, {
    variables: { productIds: productIds, isChecked: checked ? false : true },
    update() {
      props.refetchCartQuery();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  const onChecked = (sellerNameCB) => {
    let carts = props.carts;
    if (carts.length > 0) {
      console.log("udah sampe sini" + carts[0].productInCart);
      if (
        carts.find(
          (cart) =>
            cart.productsInCart[0].product.user.seller.username === sellerNameCB
        )
      ) {
        carts = carts.filter(
          (cart) => cart.user.seller.username !== sellerNameCB
        );
      } else {
        const cart = {
          user: props.productInCart[0].product.user,
          productsInCart: props.productInCart,
        };
        carts = [cart, ...carts];
      }
    } else {
      const cart = {
        user: props.productInCart[0].product.user,
        productsInCart: props.productInCart,
      };
      carts = [cart, ...carts];
    }
    props.checkoutItems(carts, checked);
    setChecked(checked ? false : true);
    addChecklist();
  };
  return (
    <View>
      <Card>
        <Card.Content style={{ borderColor: "black", borderRadius: 10 }}>
          <BouncyCheckbox
            text={props.productInCart[0].product.user.seller.username}
            style={{ fontWeight: "bold", paddingBottom: 10 }}
            onPress={() =>
              onChecked(props.productInCart[0].product.user.seller.username)
            }
            isChecked={checked}
          />
          {props.productInCart &&
            props.productInCart.map((product) => {
              return (
                <CartByProducts
                  key={product.id}
                  product={product}
                  checked={checked}
                  refetchCartQuery={props.refetchCartQuery}
                />
              );
            })}
        </Card.Content>
      </Card>
    </View>
  );
};

CartBySeller.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(CartBySeller);

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "relative",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
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
  },
});
