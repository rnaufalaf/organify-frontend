import React from "react";
import { View, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";

import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { product } = props;
  return (
    <View style={{ flexDirection: "column", width: width / 2 }}>
      <ProductCard product={product} navigation={props.navigation} />
    </View>
  );
};
export default ProductList;
