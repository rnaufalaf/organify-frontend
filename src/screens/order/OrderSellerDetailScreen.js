import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Card, Divider, Button, useTheme } from "react-native-paper";
import { List, ListItem, Left, Right } from "native-base";

import { useMutation } from "@apollo/react-hooks";
import OrderDetailsCard from "../../components/common/OrderDetailsCard";
import { UPDATE_ORDER, ADD_AWB_NUMBER } from "../../util/graphql";
import { useForm } from "../../util/hooks";

const OrderSellerDetailScreen = (props) => {
  const [errors, setErrors] = useState({});
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();
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

  const { onChange, onSubmit, values } = useForm(addAwbNumberCallback, {
    awbNumber: "",
  });

  const [addAwbNumber] = useMutation(ADD_AWB_NUMBER, {
    update(_, { data: { addAwbNumber: data } }) {
      values.awbNumber = "";
      shipOrder();
      Alert.alert("AWB has been successfully added.");
      setModalVisible(!modalVisible);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      orderId: orderId,
      awbNumber: values.awbNumber,
      courierName: order.shipping.courierName,
      buyerAddress: order.shipping.buyerAddress,
      shippingCost: order.shipping.shippingCost,
    },
  });

  function addAwbNumberCallback() {
    addAwbNumber();
  }

  const [changeState, { loading }] = useMutation(UPDATE_ORDER, {
    update(_, { data: { updateOrder: orderData } }) {
      setEditState(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { orderId: orderId, state: stateType },
  });

  function confirmOrder() {
    setStateType("PROCESSED");
    setEditState(true);
  }
  function rejectOrder() {
    setStateType("FAILED");
    setEditState(true);
  }
  function shipOrder() {
    setStateType("DELIVERY");
    setEditState(true);
  }
  if (editState) {
    changeState();
  }

  var orderActionButton;

  const confirmAlert = () =>
    Alert.alert("Admit Order ?", "Are you sure to admit this order?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => confirmOrder(),
      },
    ]);

  const rejectAlert = () =>
    Alert.alert("Reject Order ?", "Are you sure to reject this order?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => rejectOrder(),
      },
    ]);

  const shipAlert = () =>
    Alert.alert("Ship Order ?", "Admit this order to shipment?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          setModalVisible(true);
        },
      },
    ]);

  if (order.state.stateType === "CONFIRMATION") {
    orderActionButton = (
      <View
        style={{
          flexDirection: "column",
          paddingBottom: 30,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: "green",
            alignItems: "center",
            marginTop: 10,
            width: "90%",
          }}
          mode="contained"
          onPress={confirmAlert}
        >
          <Text style={{ color: "white" }}>Admit Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: "red",
            alignItems: "center",
            marginTop: 10,
            width: "90%",
          }}
          mode="contained"
          onPress={rejectAlert}
        >
          <Text style={{ color: "white" }}>Reject Order</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (order.state.stateType === "PROCESSED") {
    orderActionButton = (
      <View
        style={{
          paddingBottom: 30,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: "green",
            marginTop: 10,
            alignItems: "center",
            width: "90%",
          }}
          mode="contained"
          onPress={shipAlert}
        >
          <Text style={{ color: "white" }}>Ship Order</Text>
        </TouchableOpacity>
      </View>
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
                <Text>Customer Name</Text>
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
                  {order.user.buyer.name}
                </Text>
              </ListItem>
              <ListItem noBorder>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {order.state.createdAt}
                </Text>
              </ListItem>
            </Right>
          </List>
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
                {order.state.stateType === "DELIVERY" || "ARRIVED" ? (
                  <Text> AWB num : {order.shipping.awbNumber}</Text>
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
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={{ flex: 1 }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  name="awbNumber"
                  placeholder="AWB Number"
                  placeholderTextColor="#666666"
                  value={values.awbNumber}
                  onChangeText={(val) => onChange("awbNumber", val)}
                  autoCorrect={false}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onSubmit}
                >
                  <Text style={styles.textStyle}>Add AWB Number</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 15,
    color: "#05375a",
  },
});

export default OrderSellerDetailScreen;
