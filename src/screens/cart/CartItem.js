import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { Left, Right, Body, ListItem, Container } from "native-base";
import { Avatar, Divider } from "react-native-paper";

const CartItem = (props) => {
  const data = props.item.item.product;
  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Avatar.Image
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.name}</Text>
        </Left>
        <Right>
          <Text>Rp. {data.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
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
});

export default CartItem;
