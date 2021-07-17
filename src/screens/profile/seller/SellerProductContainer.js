import React, { useContext } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { TouchableRipple, FAB } from "react-native-paper";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { GET_SELLER_PRODUCTS } from "../../../util/graphql";

import SellerProductList from "./SellerProductList";

const SellerProductContainer = (props) => {
  const context = useContext(AuthContext);

  const { loading, data, refetch } = useQuery(GET_SELLER_PRODUCTS, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getSellerProducts: sellerProducts } = data ? data : [];

  console.log("ini seller product", sellerProducts);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.listContainer}>
          {sellerProducts &&
            sellerProducts.map((product, index) => (
              <TouchableRipple>
                <SellerProductList
                  key={index}
                  product={product}
                  navigation={props.navigation}
                  refetchCatalog={refetch}
                />
              </TouchableRipple>
            ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() =>
          props.navigation.navigate("Add Product", {
            refetchCatalog: refetch,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "green",
  },
});
export default SellerProductContainer;
