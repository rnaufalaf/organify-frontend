import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;
  return (
    <View style={{ flexDirection: "column", width: width / 2 }}>
      <TouchableOpacity
        style={{ width: "50%" }}
        onPress={() =>
          props.navigation.navigate("Product Detail", { item: item })
        }
      >
        <View style={{ width: width / 2, backgroundColor: "white" }}>
          <ProductCard {...item} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ProductList;
