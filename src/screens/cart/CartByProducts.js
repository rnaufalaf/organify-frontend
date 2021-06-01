import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Left, Right, Body, ListItem } from "native-base";
import { IconButton } from "react-native-paper";
import { Avatar, Card } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";

import {
  GET_PRODUCTS_CART,
  EDIT_PRODUCTS_IN_CART,
  DELETE_PRODUCT_FROM_CART,
} from "../../util/graphql";
import { useMutation } from "@apollo/react-hooks";

const CartByProducts = (props) => {
  const [productQty, setProductQty] = useState(props.product.productQty);
  const [errors, setErrors] = useState({});
  const [editProductQty, setEditProductQty] = useState(false);

  useEffect(() => {
    let carts = props.carts;
    console.log("the carts" + carts);
    let cartObj;
    let productInCartObj;
    let indexCartObj;
    let indexProductInCartObj;
    carts.forEach((cart, indexCart) => {
      if (
        cart.user.seller.username === props.product.product.user.seller.username
      ) {
        indexCartObj = indexCart;
        cart.productsInCart.forEach((productInCart, indexProductInCart) => {
          if (productInCart.product.id === props.product.product.id) {
            indexProductInCartObj = indexProductInCart;
            productInCartObj = productInCart;
            productInCartObj = {
              ...productInCartObj,
              productQty: parseInt(productQty),
            };
            console.log("obj" + productInCartObj);
            return;
          }
        });
        cartObj = cart;
        cartObj.productsInCart[indexProductInCartObj] = productInCartObj;
        return;
      }
    });
    carts[indexCartObj] = cartObj;
  }, [productQty]);

  const [deleteProductFromCart] = useMutation(DELETE_PRODUCT_FROM_CART, {
    update() {
      props.refetchCartQuery();
    },
    variables: { cartId: props.product.id },
  });

  const [editProductsInCart] = useMutation(EDIT_PRODUCTS_IN_CART, {
    variables: {
      productId: props.product.product.id,
      productQty: productQty,
      isChecked: props.product.isChecked,
    },
    update() {
      props.refetchCartQuery();
      setEditProductQty(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  function valueChange(val) {
    console.log(val);
    // setProductQty(productQty);
    // setEditProductQty(true);
  }

  if (editProductQty) {
    editProductsInCart();
  }

  return (
    <Card>
      <Card.Content>
        <Body style={styles.body}>
          <Left>
            <Avatar.Image
              source={{
                uri:
                  props.product.product.images.length > 0
                    ? props.product.product.images[0].downloadUrl
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
            />
          </Left>
          <Left>
            <Text>{props.product.product.name}</Text>
          </Left>
          <Right>
            <Text>Rp. {props.product.product.price}</Text>
          </Right>
          <Right>
            <NumericInput
              value={productQty}
              onChange={(val) => {
                setProductQty(val);
                setEditProductQty(true);
              }}
              containerStyle={{ marginRight: -30 }}
              totalWidth={80}
              totalHeight={35}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="#B0228C"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor="green"
              leftButtonBackgroundColor="green"
            />
          </Right>
        </Body>
        <View style={{ marginLeft: 330 }}>
          <TouchableOpacity onPress={deleteProductFromCart}>
            <IconButton icon="trash-can-outline" color="gray" size={20} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
};

CartByProducts.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(CartByProducts);

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 28,
    flexDirection: "row",
  },
});
