import React from "react";
import { View, Dimensions, TouchableHighlight } from "react-native";
import { TouchableRipple } from "react-native-paper";

import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;
  return (
    <View style={{ flexDirection: "column", width: width / 2 }}>
      <TouchableHighlight
        onPress={() =>
          props.navigation.navigate("Product Detail", { item: item })
        }
      >
        <View style={{ width: width / 2, backgroundColor: "white" }}>
          <ProductCard {...item} />
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default ProductList;
