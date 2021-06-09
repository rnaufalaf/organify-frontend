import React from "react";
import { View, Text } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { Left, Right, Body, Container, H3 } from "native-base";

// import ModalAddItemReview from "./ModalAddItemReview";

function OrderDetailsCard(props) {
  console.log("the product", props.product);
  // console.log(props.order);

  // console.log(order)

  var OrderProductList = <></>;
  if (props.product) {
    OrderProductList = (
      <Card>
        <Card.Content style={{ flexDirection: "row", marginHorizontal: -10 }}>
          <Left>
            <Avatar.Image
              source={{ uri: props.product.images[0].downloadUrl }}
              size={50}
              style={{ margin: 10 }}
            />
          </Left>
          <Left>
            <Text style={{ fontWeight: "bold" }}>Product Name</Text>

            <Text style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>
              {props.product.name}
            </Text>
          </Left>
          <Left>
            <View>
              <Text style={{ fontWeight: "bold" }}>Price</Text>
              <Text style={{ color: "teal", fontWeight: "bold", fontSize: 16 }}>
                Rp{props.product.price}
              </Text>
            </View>
          </Left>
          <Left>
            <View>
              <Text style={{ fontWeight: "bold" }}>Amount</Text>

              <Text style={{ color: "teal", fontWeight: "bold", fontSize: 16 }}>
                {props.product.productQty}
              </Text>
            </View>
          </Left>
          {/* <Left>
            {props.order && props.order.state.stateType === "ARRIVED" ? (
              <ModalAddItemReview item={props.item}></ModalAddItemReview>
            ) : (<></>)}
          </Left> */}
        </Card.Content>
      </Card>
    );
  }
  return OrderProductList;
}

export default OrderDetailsCard;
