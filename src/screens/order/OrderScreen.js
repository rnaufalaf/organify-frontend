import React, { useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Card, Chip, Badge } from "react-native-paper";
import { ListItem } from "native-base";

import { useQuery } from "@apollo/react-hooks";
import { GET_USER_ORDERS } from "../../util/graphql";
import { objectSize } from "../../util/extensions";

import OrderCardComponent from "../../components/common/OrderCardComponent";
const OrderScreen = (props) => {
  const { loading, data } = useQuery(GET_USER_ORDERS);
  const { getUserOrders: orders } = data ? data : [];

  const [active, setActive] = useState(-1);
  const [activeChip, setActiveChip] = useState("Confirmation");
  const [status, setStatus] = useState("Ongoing");

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  const handleStatus = (name) => {
    setStatus(name);
    console.log(name);
  };

  var orderList = [];

  if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Confirmation" &&
    orders.find((order) => order.state.stateType === "CONFIRMATION")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "CONFIRMATION")
    );
  } else if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Processed" &&
    orders.find((order) => order.state.stateType === "PROCESSED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "PROCESSED")
    );
  } else if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Delivery" &&
    orders.find((order) => order.state.stateType === "DELIVERY")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "DELIVERY")
    );
  } else if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Arrived" &&
    orders.find((order) => order.state.stateType === "ARRIVED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "ARRIVED")
    );
  } else if (
    orders &&
    status === "Completed" &&
    orders.find((order) => order.state.stateType === "COMPLETED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "COMPLETED")
    );
  } else if (
    orders &&
    status === "Failed" &&
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
  var sizeOngoing = 0;

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
    sizeOngoing = sizeConfirmation + sizeProcessed + sizeDelivery + sizeArrived;
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
                  padding: 0,
                  borderRadius: 3,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Chip
                  icon="clock"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleStatus("Ongoing")}
                >
                  Ongoing
                  {sizeOngoing > 0 && status !== "Ongoing" ? (
                    <Badge
                      style={{
                        left: 295,
                        top: 0,
                        bottom: 50,
                      }}
                    >
                      {sizeOngoing}
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
                  onPress={() => handleStatus("Completed")}
                >
                  Completed
                  {sizeCompleted > 0 && status !== "Completed" ? (
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
                  onPress={() => handleStatus("Failed")}
                >
                  Failed
                  {sizeFailed > 0 && status !== "Failed" ? (
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
          {status === "Ongoing" ? (
            <Card.Content>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <ListItem
                  style={{
                    margin: 5,
                    padding: 0,
                    borderRadius: 3,
                    flexDirection: "row",
                  }}
                >
                  <Chip
                    icon="check-circle"
                    textStyle={styles.text}
                    style={[
                      styles.center,
                      { margin: 5 },
                      active == -1 ? styles.active : styles.inactive,
                    ]}
                    onPress={() => handleChip("Confirmation")}
                  >
                    Confirmation
                    {sizeConfirmation > 0 && status !== "Confirmation" ? (
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
                    icon="package-up"
                    textStyle={styles.text}
                    style={[
                      styles.center,
                      { margin: 5 },
                      active == -1 ? styles.active : styles.inactive,
                    ]}
                    onPress={() => handleChip("Processed")}
                  >
                    Processed
                    {sizeProcessed > 0 && status !== "Processed" ? (
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
                    onPress={() => handleChip("Delivery")}
                  >
                    Delivery
                    {sizeDelivery > 0 && status !== "Delivery" ? (
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
                    name="arrived"
                    textStyle={styles.text}
                    style={[
                      styles.center,
                      { margin: 5 },
                      active == -1 ? styles.active : styles.inactive,
                    ]}
                    onPress={() => handleChip("Arrived")}
                  >
                    Arrived
                    {sizeArrived > 0 && status !== "Arrived" ? (
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
                </ListItem>
              </ScrollView>
            </Card.Content>
          ) : (
            <></>
          )}
        </Card>
        {!loading ? (
          orderList.length > 0 ? (
            <Card>
              <Card.Content>
                {orderList[0] &&
                  orderList[0].map((orders) => (
                    <OrderCardComponent
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
