import React from "react";
import Time from "react-time-format";
import { Card, Button } from "react-native-paper";
import { Left, Right, Body, Container, H2, H3, H1 } from "native-base";
import { View, Text, TouchableOpacity } from "react-native";
import OrderDetailsCard from "./OrderDetailsCard";

function OrderCardComponent(props) {
  console.log("lol", props.order);
  const order = props.order;
  // const answer_array = order.state.createdAt.split("T");
  // console.log(answer_array);

  let productPrice;
  let productQty;

  {
    order.products.map((product) => {
      productPrice = product.price;
      productQty = product.productQty;
    });
  }
  const shippingCost = order.shipping.shippingCost;

  const grossAmount = productPrice * productQty;
  const totalPrice = grossAmount + shippingCost;

  return (
    <Card
      onPress={() =>
        props.navigation.navigate("Order Detail", {
          order: order,
        })
      }
    >
      <Card.Content>
        <H3>{/* <Time value={answer_array[0]} format="DD-MM-YYYY" /> */}</H3>
      </Card.Content>
      <Card.Content style={{ flexDirection: "row" }}>
        <Left>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "green" }}>{order.seller.username}</Text>
            <Text>(INV/{order.id})</Text>
          </View>
        </Left>
        <Right style={{ position: "relative", left: 20 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "green" }}>Status: </Text>
            <Text>(INV/{order.state.stateType})</Text>
          </View>
        </Right>
        <Right>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "green" }}>Sub Total: </Text>
            <Text>{totalPrice}</Text>
          </View>
        </Right>
      </Card.Content>
      {order.products &&
        order.products.map((product) => <OrderDetailsCard product={product} />)}
    </Card>
  );
}

export default OrderCardComponent;
