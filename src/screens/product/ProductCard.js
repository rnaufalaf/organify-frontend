import React from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Card } from "react-native-paper";
import { connect } from "react-redux";
import * as actions from "../../../Redux/actions/cartActions";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />

      <Text
        style={{
          textAlign: "center",
          bottom: -120,
          backgroundColor: "gainsboro",
        }}
      >
        Tersisa 2 pack
      </Text>
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>
        Rp. {price} <Text style={{ color: "orange" }}> / pack</Text>
      </Text>

      {countInStock > 0 ? (
        <View style={{ marginTop: 10 }}>
          <Button
            title="Add"
            color="green"
            onPress={() => {
              props.addItemToCart(props);
            }}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.5,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    elevation: 8,
    backgroundColor: "white",
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
    marginTop: 5,
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
