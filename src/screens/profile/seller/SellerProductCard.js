import React from "react";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Button,
  TouchableRipple,
} from "react-native-paper";

var { width } = Dimensions.get("window");

const SellerProductCard = (props) => {
  const { product, refetchCatalog } = props;

  console.log("props seller", props);

  return (
    <Card
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("Edit Seller Product", {
          product: props.product,
          refetchCatalog: props.refetchCatalog,
        })
      }
    >
      <Card.Cover source={{ uri: product.images[0].downloadUrl }} />

      <Text
        style={{
          textAlign: "center",
          backgroundColor: "gainsboro",
        }}
      >
        Tersisa <Text>{product.stock}</Text> pack
      </Text>
      <Card.Title title={product.name} />
      <Card.Content>
        <Title style={styles.price}>
          Rp. {product.price} <Text style={{ color: "orange" }}> / pack</Text>
        </Title>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: width / 2 - 20,
    // height: width / 1.5,
    // padding: 10,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    marginRight: 2,
    // elevation: 4,
    // backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 + 20,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 50,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "green",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default SellerProductCard;
