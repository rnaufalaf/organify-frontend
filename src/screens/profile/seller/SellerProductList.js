import React from "react";
import { View, Dimensions } from "react-native";
import { TouchableRipple } from "react-native-paper";

import SellerProductCard from "./SellerProductCard";

var { width } = Dimensions.get("window");

const SellerProductList = (props) => {
  const { product } = props;
  console.log("list props", props);
  return (
    <View style={{ flexDirection: "column", width: width / 2 }}>
      <SellerProductCard product={product} navigation={props.navigation} />
    </View>
  );
};
export default SellerProductList;
