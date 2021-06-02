import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Card, Divider, Button } from "react-native-paper";
import { List, ListItem, Left, Right, Body } from "native-base";
import PropTypes from "prop-types";
import PaymentGateway from "react-native-midtrans-payment";
import { connect } from "react-redux";
import { checkoutItems, setAddOrder } from "../../../Redux/actions/orderAction";
import { currencyIdrConverter } from "../../util/extensions";
import { View, Text, StyleSheet } from "react-native";

const CheckoutSummary = (props) => {
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [isCourierExists, setCourierExists] = useState(false);
  const [midtransItemList, setMidtransItemList] = useState([]);

  let total = 0;
  let amountCounter = 0;
  let shippingCostCounter = 0;
  let isExistsCourierList = [];
  let productItems = [];
  let courierItems = [];

  function addOrderAction() {
    console.log("adding order");
    props.setAddOrder(true);
  }

  useEffect(() => {
    props.carts.forEach((cart) => {
      if (cart.productsInCart[0].courier) {
        shippingCostCounter += cart.productsInCart[0].courier.amount;
        // compare between previous value and next value
        isExistsCourierList = [
          ...isExistsCourierList,
          cart.productsInCart[0].courier.code !== "",
        ];
        courierItems = [
          ...courierItems,
          {
            id: "",
            price: cart.productsInCart[0].courier.amount,
            quantity: 1,
            name: `${cart.productsInCart[0].courier.code} (${cart.productsInCart[0].courier.service})`,
          },
        ];
      } else {
        isExistsCourierList = [...isExistsCourierList, false];
      }
      cart.productsInCart.forEach((productInCart) => {
        productItems = [
          ...productItems,
          {
            id: productInCart.product.id,
            price: productInCart.product.price,
            quantity: productInCart.productQty,
            name: productInCart.product.name,
          },
        ];
        amountCounter += productInCart.productQty;
        const price = parseInt(productInCart.product.price);
        total += price * productInCart.productQty;
      });
    });
    let courierExists = false;
    isExistsCourierList.every((value) => {
      courierExists = value;
      return courierExists;
    });
    setShippingCost(shippingCostCounter);
    setAmount(amountCounter);
    setSubTotal(total);
    setCourierExists(courierExists);
    setMidtransItemList(productItems.concat(courierItems));
  }, [props.isChange]);

  async function pay() {
    const optionConnect = {
      clientKey: "Mid-client-xmrguN00WG4lTFIg",
      urlMerchant: "http://organify.com/payment",
    };

    const transRequest = {
      transactionId: "order-org",
      totalAmount: subTotal + shippingCost,
    };

    const itemDetails = midtransItemList;

    console.log("masuk item", midtransItemList);

    const userDetail = {
      fullName: props.carts[0].productsInCart[0].user.buyer.name,
      email: props.carts[0].productsInCart[0].user.email,
      phoneNumber: props.carts[0].productsInCart[0].user.phone,
      userId: props.carts[0].productsInCart[0].user.id,
      address: props.carts[0].productsInCart[0].user.address.detail,
      city: props.carts[0].productsInCart[0].user.address.cityName,
      country: "IDN",
      zipCode: props.carts[0].productsInCart[0].user.address.postalCode,
    };
    console.log("masuk user", userDetail);

    const optionColorTheme = {
      primary: "#c51f1f",
      primaryDark: "#1a4794",
      secondary: "#1fce38",
    };

    const optionFont = {
      defaultText: "open_sans_regular.ttf",
      semiBoldText: "open_sans_semibold.ttf",
      boldText: "open_sans_bold.ttf",
    };

    const callback = (res) => {
      console.log(res);
      addOrderAction();
    };

    PaymentGateway.checkOut(
      optionConnect,
      transRequest,
      itemDetails,
      userDetail,
      optionColorTheme,
      optionFont,
      callback
    );
  }

  const getButtonPayment = () => {
    let summaryUI;
    if (isCourierExists) {
      const paymentInput = {
        grossAmount: subTotal + shippingCost,
        productDetails: midtransItemList,
        customerDetails: {
          firstName: props.carts[0].productsInCart[0].user.buyer.name,
          email: props.carts[0].productsInCart[0].user.email,
          phone: props.carts[0].productsInCart[0].user.phone,
          billingAddress: {
            firstName: props.carts[0].productsInCart[0].user.buyer.name,
            email: props.carts[0].productsInCart[0].user.email,
            phone: props.carts[0].productsInCart[0].user.phone,
            address: props.carts[0].productsInCart[0].user.address.detail,
            city: props.carts[0].productsInCart[0].user.address.cityName,
            postalCode:
              props.carts[0].productsInCart[0].user.address.postalCode,
            countryCode: "IDN",
          },
        },
      };
      summaryUI = (
        <Button
          labelStyle={{ color: "white" }}
          style={{ backgroundColor: "green" }}
          disabled={false}
          onPress={pay}
        >
          Pay
        </Button>
      );
    } else {
      summaryUI = (
        <Button disabled={true} onClick={addOrderAction}>
          Pay
        </Button>
      );
    }
    return summaryUI;
  };
  return (
    <View>
      <ActivityIndicator color="#fff" size="large" />
      <Card>
        <Card.Title
          title="Summary"
          titleStyle={{
            textAlign: "left",
            fontWeight: "bold",
            color: "green",
            fontSize: 25,
            marginTop: 10,
            marginRight: 5,
          }}
        />
        <Card.Content>
          <List style={{ flexDirection: "row" }}>
            <Left style={{ flexDirection: "column" }}>
              <ListItem>
                <Text style={styles.text}>Item (x{amount})</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.text}>Shipping Cost</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.text}>Sub Total</Text>
              </ListItem>
            </Left>
            <Right style={{ flexDirection: "column" }}>
              <ListItem>
                <Text style={styles.price}>
                  Rp {currencyIdrConverter(subTotal, 0, ".", ",")}
                </Text>
              </ListItem>
              <ListItem>
                <Text style={styles.price}>
                  Rp {currencyIdrConverter(shippingCost, 0, ".", ",")}
                </Text>
              </ListItem>
              <ListItem>
                <Text style={styles.price}>
                  Rp{" "}
                  {currencyIdrConverter(subTotal + shippingCost, 0, ".", ",")}
                </Text>
              </ListItem>
            </Right>
          </List>
        </Card.Content>
        <Card.Content>{getButtonPayment()}</Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "left",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    textAlign: "left",
  },
});

CheckoutSummary.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  setAddOrder: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
  isAddOrder: state.orders.isAddOrder,
});

export default connect(mapStateToProps, { checkoutItems, setAddOrder })(
  CheckoutSummary
);
