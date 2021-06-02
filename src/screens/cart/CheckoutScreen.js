import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Card, Button, Divider } from "react-native-paper";
import { Item, Picker, Left, Body, Right, Container } from "native-base";

import { useQuery } from "@apollo/react-hooks";
import { GET_CHECKOUT_DATA } from "../../util/graphql";

import { AuthContext } from "../../context/auth";
import { objectSize } from "../../util/extensions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";
import CheckoutCard from "./CheckoutCard";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutScreen = (props) => {
  const context = useContext(AuthContext);

  const {
    loading,
    data: checkoutData,
    data: userData,
  } = useQuery(GET_CHECKOUT_DATA, {
    variables: {
      userId: context.user.id,
    },
  });
  let { getCheckoutData: productsOnCheckout } = checkoutData
    ? checkoutData
    : [];
  let { getUser: user } = userData ? userData : [];

  var size = objectSize(productsOnCheckout);
  useEffect(() => {
    if (size > 0) {
      let group = productsOnCheckout.reduce((r, a) => {
        r[a.product.user.id] = [...(r[a.product.user.id] || []), a];
        return r;
      }, {});
      let carts = props.carts;
      Object.keys(group).forEach(function (key) {
        if (group[key][0].isChecked && objectSize(carts) <= 1) {
          const cart = {
            user: group[key][0].product.user, // data yang dibutuhkan : username, cityId
            productsInCart: group[key],
          };
          carts = [cart, ...carts];
        }
      });
      props.checkoutItems(carts, !props.isChange);
    }
  }, [size]); // <-- empty dependency array

  console.log("test", productsOnCheckout);

  let checkoutUI = (
    <>
      <View>
        <Card>
          <Card.Title
            title="Checkout"
            titleStyle={{
              textAlign: "left",
              fontSize: 25,
              fontWeight: "bold",
              color: "green",
              marginTop: 10,
            }}
          />
          <Card.Content>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 17 }}>
                You don't have anything in your cart
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
  if (!loading && productsOnCheckout) {
    if (size > 0) {
      let group = productsOnCheckout.reduce((r, a) => {
        r[a.product.user.id] = [...(r[a.product.user.id] || []), a];
        return r;
      }, {});
      checkoutUI = (
        <>
          <ScrollView>
            <Card>
              <Card.Title
                title="Checkout"
                titleStyle={{
                  textAlign: "left",
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "green",
                  marginTop: 10,
                }}
              />
              <Card.Content>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{ fontSize: 17, color: "gray", marginBottom: 10 }}
                  >
                    Shipping Address
                  </Text>
                  <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      {user.buyer.name}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      {user.phone}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      {`${user.address.detail}, ${user.address.district}, ${user.address.cityName}, ${user.address.postalCode}`}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <Divider />
            <Card>
              <Card.Title
                title="Products"
                titleStyle={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "green",
                  fontSize: 25,
                  marginTop: 10,
                }}
              />
              <Card.Content>
                {group &&
                  Object.keys(group).map((key) => (
                    <CheckoutCard
                      key={key}
                      productInCart={group[key]}
                      user={user}
                    />
                  ))}
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <CheckoutSummary />
              </Card.Content>
            </Card>
          </ScrollView>
        </>
      );
    }
  }
  return checkoutUI;
};

CheckoutScreen.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(CheckoutScreen);
