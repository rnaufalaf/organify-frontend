import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Left, Right, ListItem, Body, Container } from "native-base";
import { Avatar, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

import Button from "../../components/common/Button";

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
          {props.cartItems.map((data) => {
            return (
              <View>
                <ListItem style={styles.listItem} key={Math.random()} avatar>
                  <Left>
                    <Avatar.Image
                      source={{
                        uri: data.product.image
                          ? data.product.image
                          : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                      }}
                    />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{data.product.name}</Text>
                    </Left>
                    <Right>
                      <Text>Rp. {data.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              </View>
            );
          })}
          <Divider />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>Rp. {total}</Text>
            </Left>
            <Right style={{ paddingLeft: 10 }}>
              <Button
                mode="contained"
                onPress={() => {
                  console.log("button pressed");
                }}
              >
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

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
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
});

export default connect(mapStateToProps, null)(CartScreen);
