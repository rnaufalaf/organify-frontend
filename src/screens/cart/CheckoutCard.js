import React, { useState, useEffect } from "react";
import { Card, Title } from "react-native-paper";
import { ListItem, Item, Picker, Text } from "native-base";
import {
  GET_PRODUCTS_CART,
  GET_SHIPPING_COST,
  ADD_ORDER,
} from "../../util/graphql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkoutItems,
  setAddOrder,
  setOrderIdsWillBePaid,
} from "../../../Redux/actions/orderAction";
import { objectSize } from "../../util/extensions";
import ProductCheckoutCard from "./ProductCheckoutCard";

const CheckoutCard = (props) => {
  const [userCartData, {}] = useLazyQuery(GET_PRODUCTS_CART);
  const [courier, setCourier] = useState({
    code: "",
    service: "",
    amount: 0,
  });
  let weightTotal = 0;
  let productInCartIds = [];
  let products = props.productInCart.map((product) => {
    productInCartIds = [...productInCartIds, product.id];
    weightTotal += product.product.weight * product.productQty;
    return {
      id: product.product.id,
      name: product.product.name,
      price: product.product.price,
      weight: product.product.weight,
      images: [
        {
          downloadUrl: product.product.images[0].downloadUrl,
        },
      ],
      productQty: product.productQty,
    };
  });

  let costVariables = {
    origin: props.productInCart[0].product.user.address.cityId,
    destination: props.user.address.cityId,
    weight: weightTotal,
    courier: "tiki",
  };

  const changeCourier = (_, { value }) => {
    const courierSplit = value.split("");
    setCourier({
      code: courierSplit[0],
      service: courierSplit[1],
      amount: parseInt(courierSplit[2]),
    });
  };

  const [addOrder] = useMutation(ADD_ORDER, {
    variables: {
      products: products,
      state: "CONFIRMATION",
      shipping: {
        awbNumber: "",
        courierName: courier.code,
        buyerAddress: `${props.user.address.detail}, ${props.user.address.district}, ${props.user.address.cityName}, ${props.user.address.postalCode}`,
        shippingCost: courier.amount,
      },
      sellerUsername: props.productInCart[0].product.user.seller.username,
      productInCartIds: productInCartIds,
    },
    update(proxy, result) {
      userCartData();
      const updatedOrderIds = [...props.orderIds, result.data.addOrder.id];
      console.log(updatedOrderIds);
      props.setOrderIdsWillBePaid(updatedOrderIds);
    },
  });

  useEffect(() => {
    if (props.isAddOrder) {
      addOrder();
      props.setAddOrder(false);
    }
  }, [props.isAddOrder]);

  useEffect(() => {
    let carts = props.carts;
    let cartObj;
    let productInCartObj;
    let indexCartObj;
    let indexProductInCartObj;
    carts.forEach((cart, indexCart) => {
      if (
        cart.user.seller.username ===
        props.productInCart[0].product.user.seller.username
      ) {
        indexCartObj = indexCart;
        cartObj = cart;
        cart.productsInCart.forEach((productInCart, indexProductInCart) => {
          indexProductInCartObj = indexProductInCart;
          productInCartObj = productInCart;
          productInCartObj = { ...productInCartObj, courier: courier };
          cartObj.productsInCart[indexProductInCartObj] = productInCartObj;
        });
        return;
      }
    });
    carts[indexCartObj] = cartObj;
    props.checkoutItems(carts, !props.isChange);
    // addToCart()
  }, [courier]);

  const { loading, data } = useQuery(GET_SHIPPING_COST, {
    variables: costVariables,
  });

  costVariables.courier = "jne";
  const { loading: jneLoading, data: jneData } = useQuery(GET_SHIPPING_COST, {
    variables: costVariables,
  });

  costVariables.courier = "pos";
  const { loading: posLoading, data: posData } = useQuery(GET_SHIPPING_COST, {
    variables: costVariables,
  });

  let { getCosts: tikiCosts } = data ? data : [];
  let { getCosts: jneCosts } = jneData ? jneData : [];
  let { getCosts: posCosts } = posData ? posData : [];

  let cartCheckoutUI = <></>;

  if (!loading && !jneLoading && !posLoading) {
    const tikiSize = objectSize(tikiCosts);
    const jneSize = objectSize(jneCosts);
    const posSize = objectSize(posCosts);
    let options = [];
    if (tikiSize > 0 && tikiCosts[0].costs) {
      tikiCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${tikiCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${tikiCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <Item picker style={[styles.pickerStyle]}>
                  <Picker
                    name="tiki"
                    mode="dropdown"
                    value={`${tikiCosts[0].code} ${cost.service} ${cost.cost[0].value}`}
                    style={{ height: 20 }}
                    onValueChange={(val) => handleChange(val)}
                  >
                    <Picker.Item
                      label={
                        tikiCosts[0].code +
                        " - " +
                        cost.service +
                        " " +
                        Rp +
                        cost.cost[0].value
                      }
                      // value={
                      //   city.type + " " + city.city_name + "-" + city.city_id
                      // }
                    />
                  </Picker>
                </Item>
              </>
            ),
          },
        ];
      });
    }
    if (jneSize > 0 && jneCosts[0].costs) {
      jneCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${jneCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${jneCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <Item picker style={[styles.pickerStyle]}>
                  <Picker
                    name="jne"
                    mode="dropdown"
                    value={`${jneCosts[0].code} ${cost.service} ${cost.cost[0].value}`}
                    style={{ height: 20 }}
                    onValueChange={(val) => handleChange(val)}
                  >
                    <Picker.Item
                      label={
                        jneCosts[0].code +
                        " - " +
                        cost.service +
                        " " +
                        Rp +
                        cost.cost[0].value
                      }
                      // value={
                      //   city.type + " " + city.city_name + "-" + city.city_id
                      // }
                    />
                  </Picker>
                </Item>
              </>
            ),
          },
        ];
      });
    }

    cartCheckoutUI = (
      <Card>
        <Card.Content>
          <Text>{props.productInCart[0].product.user.seller.username}</Text>
        </Card.Content>
        {props.productInCart &&
          props.productInCart.map((product, index) => (
            <ProductCheckoutCard key={index} product={product} />
          ))}
        <Card.Content>
          <Title>Shipping</Title>
          <Picker
            onChange={changeCourier}
            options={options}
            placeholder="Shipping"
          />
        </Card.Content>
      </Card>
    );
  }
  return cartCheckoutUI;
};

CheckoutCard.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  setAddOrder: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
  isAddOrder: state.orders.isAddOrder,
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, {
  checkoutItems,
  setAddOrder,
  setOrderIdsWillBePaid,
})(CheckoutCard);
