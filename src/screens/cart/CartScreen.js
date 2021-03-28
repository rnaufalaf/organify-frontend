import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Left, Right, Container } from "native-base";
import { Divider } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

import Button from "../../components/common/Button";
import CartItem from "./CartItem";
import * as actions from "../../../Redux/actions/cartActions";

var { height, width } = Dimensions.get("window");

const CartScreen = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          <ScrollView>
            <SwipeListView
              data={props.cartItems}
              renderItem={(data) => <CartItem item={data} />}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity style={styles.hiddenButton}>
                    <Icon
                      name="trash"
                      color={"white"}
                      size={30}
                      onPress={() => props.removeFromCart(data.item)}
                    />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            ></SwipeListView>
          </ScrollView>
          <Divider />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>Rp. {total}</Text>
            </Left>
            <Right style={{ paddingLeft: 10 }}>
              <Button mode="contained" onPress={() => props.clearCart()}>
                Clear
              </Button>
            </Right>
            <Right style={{ paddingRight: 10 }}>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("button checkout pressed");
                }}
              >
                Checkout
              </Button>
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like you don't have anything inside your cart</Text>
          <Text>Add some items to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
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
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
