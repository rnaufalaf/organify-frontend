import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { Left, Body, Right, View } from "native-base";

const ProductCheckoutCard = ({ product }) => {
  console.log("productvalue", product);
  return (
    <>
      <Card>
        <Card.Content style={{ flexDirection: "row" }}>
          <Left>
            <Avatar.Image
              source={{ uri: product.product.images[0].downloadUrl }}
            />
          </Left>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={
                ([styles.text],
                { position: "relative", right: 50, top: 0, fontSize: 16 })
              }
            >
              {product.product.name}
            </Text>
            <View style={{ flexDirection: "column" }}>
              <Right>
                <Text style={styles.text}> Rp. {product.product.price}</Text>
                <Text style={styles.text}>
                  {product.productQty} item{" "}
                  {product.product.weight * product.productQty} gram
                </Text>
              </Right>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "left",
  },
});

export default ProductCheckoutCard;
