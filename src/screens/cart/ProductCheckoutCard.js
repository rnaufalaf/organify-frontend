import React from "react";
import { Image, Text } from "react-native";
import { Card } from "react-native-paper";
import { Left, Body, Right } from "native-base";

const ProductCheckoutCard = ({ product }) => {
  console.log(product);
  return (
    <>
      <Card>
        <Card.Content style={{ flexDirection: "column" }}>
          <Left>
            <Image source={{ uri: product.product.images[0].downloadUrl }} />
          </Left>
          <Left style={{ flexDirection: "row" }}>
            <Text>{product.product.name}</Text>
            <Text>Rp. {product.product.price}</Text>
            <Text>
              {product.productQty} item (
              {product.product.weight * product.productQty}) .gram
            </Text>
          </Left>
        </Card.Content>
      </Card>
    </>
  );
};
export default ProductCheckoutCard;
