import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card, Divider, Button } from "react-native-paper";
import { List, ListItem, Left, Right } from "native-base";

import { useMutation } from "@apollo/react-hooks";

import OrderDetailsCard from "../../components/common/OrderDetailsCard";
import { UPDATE_ORDER } from "../../util/graphql";

const OrderDetailScreen = (props) => {
  const [errors, setErrors] = useState({});
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);

  const order = props.route.params.order;
  const orderId = order.id;

  let productPrice;
  let productQty;

  {
    !loading ? (
      order.products.map((product) => {
        productPrice = product.price;
        productQty = product.productQty;
      })
    ) : (
      <></>
    );
  }
  const shippingCost = order.shipping.shippingCost;

  const grossAmount = productPrice * productQty;
  const totalPrice = productPrice * productQty + shippingCost;

  const [changeState, { loading }] = useMutation(UPDATE_ORDER, {
    update(_, { data: { updateOrder: orderData } }) {
      setEditState(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { orderId: orderId, state: stateType },
  });

  function confirmArrivalOrder() {
    setStateType("ARRIVED");
    setEditState(true);
  }
  function cancelConfirmArrivalOrder() {
    setEditState(false);
  }
  if (editState) {
    changeState();
  }

  var orderActionButton;

  const arrivedAlert = () =>
    Alert.alert(
      "Confirm Arrived Order ?",
      "Are you sure to confirm your order?",
      [
        {
          text: "Cancel",
          onPress: () => cancelConfirmArrivalOrder(),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => confirmArrivalOrder(),
        },
      ]
    );

  if (order.state.stateType === "DELIVERY") {
    orderActionButton = (
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: "green",
          alignSelf: "center",
          marginTop: 10,
          width: "90%",
          marginBottom: "10%",
        }}
        mode="contained"
        onPress={arrivedAlert}
      >
        <Text style={{ color: "white" }}>Order Arrived ?</Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title title="Order Details" />
        <Card.Content>
          <List style={{ flexDirection: "row" }}>
            <Left style={{ flexDirection: "column", paddingTop: 5 }}>
              <ListItem noBorder>
                <Text>Invoice Number</Text>
              </ListItem>
              <ListItem noBorder>
                <Text>Status</Text>
              </ListItem>
              <ListItem noBorder>
                <Text>Store Name</Text>
              </ListItem>
              <ListItem noBorder>
                <Text>Order Date</Text>
              </ListItem>
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <ListItem noBorder>
                <Text
                  style={{ fontWeight: "bold", color: "green", fontSize: 15 }}
                >
                  INV/<Text style={{ color: "green" }}>{order.id}</Text>
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text
                  style={{ fontWeight: "bold", color: "green", fontSize: 15 }}
                >
                  {order.state.stateType}
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {order.seller.username}
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {order.state.createdAt}
                </Text>
              </ListItem>
            </Right>
          </List>

          {order.state.stateType === "ARRIVED" ? (
            <Button mode="contained">Add Review</Button>
          ) : (
            <></>
          )}
        </Card.Content>
        <Divider style={{ marginTop: 10 }} />
        <Card.Content>
          <Card.Title title="Product List" />
          {order.products &&
            order.products.map((product) => (
              <OrderDetailsCard product={product} />
            ))}
        </Card.Content>
        <Divider />
        <Card.Content>
          <Card.Title title="Address" />
          <List style={{ flexDirection: "row" }}>
            <Left style={{ flexDirection: "column" }}>
              <ListItem noBorder style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    position: "absolute",
                    left: 0,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {order.user.buyer.name}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {order.shipping.buyerAddress}
                </Text>
              </ListItem>
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <ListItem noBorder style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Shipping
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    left: 15,
                    color: "teal",
                  }}
                >
                  {order.shipping.courierName}
                </Text>
              </ListItem>
              <ListItem noBorder>
                {order.state.stateType === "DELIVERY" ? (
                  <Text> AWB num : 000444958166</Text>
                ) : (
                  <></>
                )}
              </ListItem>
            </Right>
          </List>
        </Card.Content>
        <Divider />
        <Card.Content>
          <Card.Title title="Payment" />
          <List style={{ flexDirection: "row" }}>
            <Left style={{ flexDirection: "column" }}>
              <ListItem noBorder>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Item ({productQty})
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Shipping Cost
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Total Price
                </Text>
              </ListItem>
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <ListItem noBorder>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "green" }}
                >
                  {grossAmount}
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "green" }}
                >
                  {shippingCost}
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "green" }}
                >
                  {totalPrice}
                </Text>
              </ListItem>
            </Right>
          </List>
        </Card.Content>
        {orderActionButton}
      </Card>
    </ScrollView>
  );
};

export default OrderDetailScreen;
