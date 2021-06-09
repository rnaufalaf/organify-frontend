import React from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Container } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_ORDER } from "../../util/graphql";

import { connect } from "react-redux";
import { setOrderIdsWillBePaid } from "../../../Redux/actions/orderAction";

import { client } from "../../../App";
var { height, width } = Dimensions.get("window");

const MidtransPaymentChecker = (props) => {
  console.log(props.route.params, "im here");

  const redirectToHomeScreen = () => {
    // props.orderIds.forEach((orderId) => {
    //   client
    //     .mutate({
    //       mutation: UPDATE_ORDER,
    //       variables: {
    //         orderId: orderId,
    //         state: "PROCESSED",
    //       },
    //     })
    //     .then((result) => {
    //       console.log("update order success", result);
    //     });
    props.navigation.navigate("Product Container");
  };

  return (
    <Container style={styles.container}>
      <Text>Payment Succesful!</Text>
      <Button mode="contained" onPress={redirectToHomeScreen}>
        Back to homescreen
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, { setOrderIdsWillBePaid })(
  MidtransPaymentChecker
);
