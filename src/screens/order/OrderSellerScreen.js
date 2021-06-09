import React, { useState, useContext } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Card, Chip, Badge } from "react-native-paper";
import { ListItem } from "native-base";

import { useQuery } from "@apollo/react-hooks";
import { GET_SELLER_ORDERS, GET_USER } from "../../util/graphql";
import { objectSize } from "../../util/extensions";
import { AuthContext } from "../../context/auth";

import OrderSellerCardComponent from "../../components/common/OrderSellerCardComponent";
const OrderScreen = (props) => {
  const context = useContext(AuthContext);
  const [active, setActive] = useState(-1);
  const [activeChip, setActiveChip] = useState("Incoming Orders");

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  const handleStatus = (name) => {
    setStatus(name);
    console.log(name);
  };

  const { loading: loadingUser, data: userData } = useQuery(GET_USER, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getUser: currentUser } = userData ? userData : [];

  let username = "";

  if (!loadingUser) {
    username = currentUser.seller.username;
    console.log(username, "hmmm");
  }

  const { loading, data } = useQuery(GET_SELLER_ORDERS, {
    variables: {
      username: username,
    },
  });
  const { getSellerOrders: orders } = data ? data : [];

  var orderList = [];

  if (
    !loading &&
    orders &&
    activeChip === "Incoming Orders" &&
    orders.find((order) => order.state.stateType === "CONFIRMATION")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "CONFIRMATION")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Available to Ship" &&
    orders.find((order) => order.state.stateType === "PROCESSED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "PROCESSED")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Shipment in Progress" &&
    orders.find((order) => order.state.stateType === "DELIVERY")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "DELIVERY")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Sent to Buyer" &&
    orders.find((order) => order.state.stateType === "ARRIVED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "ARRIVED")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Order Completed" &&
    orders.find((order) => order.state.stateType === "COMPLETED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "COMPLETED")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Order Cancelled" &&
    orders.find((order) => order.state.stateType === "FAILED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "FAILED")
    );
  }

  var sizeConfirmation = 0;
  var sizeProcessed = 0;
  var sizeDelivery = 0;
  var sizeArrived = 0;
  var sizeCompleted = 0;
  var sizeFailed = 0;

  if (orders) {
    sizeConfirmation = objectSize(
      orders.filter((order) => order.state.stateType === "CONFIRMATION")
    );
    sizeProcessed = objectSize(
      orders.filter((order) => order.state.stateType === "PROCESSED")
    );
    sizeDelivery = objectSize(
      orders.filter((order) => order.state.stateType === "DELIVERY")
    );
    sizeArrived = objectSize(
      orders.filter((order) => order.state.stateType === "ARRIVED")
    );
    sizeCompleted = objectSize(
      orders.filter((order) => order.state.stateType === "COMPLETED")
    );
    sizeFailed = objectSize(
      orders.filter((order) => order.state.stateType === "FAILED")
    );
  }
  return (
    <>
      <ScrollView style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        <Card>
          <Card.Content>
            <ScrollView horizontal={true}>
              <ListItem
                style={{
                  margin: 5,
                  padding: 5,
                  borderRadius: 3,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <Chip
                  icon="note-plus"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Incoming Orders")}
                >
                  Incoming Orders
                  {sizeConfirmation > 0 ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeConfirmation}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Chip>
                <Chip
                  icon="truck-check"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Available to Ship")}
                >
                  Available to Ship
                  {sizeProcessed > 0 ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeProcessed}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Chip>
                <Chip
                  icon="truck-fast"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Shipment in Progress")}
                >
                  Shipment in Progress
                  {sizeDelivery > 0 ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeDelivery}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Chip>
                <Chip
                  icon="package-down"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Sent to Buyer")}
                >
                  Sent to Buyer
                  {sizeArrived > 0 ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeArrived}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Chip>
                <Chip
                  icon="check"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Order Completed")}
                >
                  Order Completed
                  {sizeCompleted > 0 ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeCompleted}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Chip>
                <Chip
                  icon="close"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Order Cancelled")}
                >
                  Order Cancelled
                  {sizeFailed > 0 ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeFailed}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </Chip>
              </ListItem>
            </ScrollView>
          </Card.Content>
        </Card>
        {!loading ? (
          orderList.length > 0 ? (
            <Card>
              <Card.Content>
                {orderList[0] &&
                  orderList[0].map((orders) => (
                    <OrderSellerCardComponent
                      order={orders}
                      navigation={props.navigation}
                    />
                  ))}
              </Card.Content>
            </Card>
          ) : (
            <Card>
              <Card.Content>
                <Text>You don't have any orders in this section</Text>
              </Card.Content>
            </Card>
          )
        ) : (
          <Card>
            <Card.Content>
              <Text>Loading</Text>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  active: {
    backgroundColor: "green",
  },
  inactive: {
    backgroundColor: "lightgreen",
  },
});

export default OrderScreen;
