import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Divider, useTheme } from "react-native-paper";
import { List, ListItem, Left, Right, View } from "native-base";
import Toast from "react-native-toast-message";
import * as Print from "expo-print";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { Rating } from "react-native-ratings";

import { useMutation } from "@apollo/react-hooks";

import OrderDetailsCard from "../../components/common/OrderDetailsCard";
import { UPDATE_ORDER, ADD_REVIEW } from "../../util/graphql";

const OrderDetailScreen = (props) => {
  console.log("the params", props.route.params);
  const [errors, setErrors] = useState({});
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);

  const [score, setScore] = useState(0);
  const [body, setBody] = useState("");
  const [productId, setProductId] = useState("");

  console.log(score, "the score");

  const handleRating = (rating) => {
    setScore(rating);
  };

  const handleChange = (val) => {
    setBody(val);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();

  const order = props.route.params.order;
  const orderId = order.id;

  let productPrice;
  let productQty;
  let idTemp;

  {
    !loading ? (
      order.products.map((product) => {
        productPrice = product.price;
        productQty = product.productQty;
        idTemp = product.id;
      })
    ) : (
      <></>
    );
  }

  console.log(idTemp, "lmao");

  const reviewHandler = () => {
    addReview();
  };

  const [addReview] = useMutation(ADD_REVIEW, {
    update(_, { data: { addReview: reviewData } }) {
      setModalVisible(false);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Review has been added succesfully",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      score: score,
      body: body,
      productId: productId,
    },
  });

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
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Order changed to Arrived",
    });
    setEditState(true);
  }
  function cancelConfirmArrivalOrder() {
    setEditState(false);
  }
  function confirmCompleteOrder() {
    setStateType("COMPLETED");
    Toast.show({
      topOffset: 60,
      type: "success",
      text1: "Order changed to Completed",
    });
    setEditState(true);
  }
  function cancelConfirmCompleteOrder() {
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

  const completedAlert = () =>
    Alert.alert(
      "Finalize your Order ?",
      "Are you sure to finalize your order?",
      [
        {
          text: "Cancel",
          onPress: () => cancelConfirmCompleteOrder(),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => confirmCompleteOrder(),
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

  if (order.state.stateType === "ARRIVED") {
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
        onPress={completedAlert}
      >
        <Text style={{ color: "white" }}>Finalize Order</Text>
      </TouchableOpacity>
    );
  }
  if (order.state.stateType === "COMPLETED") {
    orderActionButton = (
      <View>
        <TouchableOpacity
          style={{
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: "green",
            marginTop: 10,
            alignSelf: "center",
            width: "90%",
          }}
          mode="contained"
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "white" }}>Add Review</Text>
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
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ position: "absolute", right: 15, top: 15 }}>
                  <Material
                    name="close"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={30}
                  showRating
                  onFinishRating={(rating) => handleRating(rating)}
                />
                <TextInput
                  name="body"
                  placeholder="Tell us about the product...."
                  placeholderTextColor="#666666"
                  value={body}
                  onChangeText={(val) => handleChange(val)}
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
                  onPress={() => {
                    setProductId(idTemp), reviewHandler();
                  }}
                >
                  <Text style={styles.textStyle}>Add Review</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
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
    height: "50%",
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

export default OrderDetailScreen;
