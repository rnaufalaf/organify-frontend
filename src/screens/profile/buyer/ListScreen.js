import React, { useContext } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import {
  TouchableRipple,
  Card,
  Title,
  Button,
  Avatar,
  Paragraph,
} from "react-native-paper";
import { Left, Right, Body } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { GET_WISHLIST } from "../../../util/graphql";

import ProductList from "../../product/ProductList";

const ListScreen = (props) => {
  const context = useContext(AuthContext);

  const { loading, data, refetch } = useQuery(GET_WISHLIST, {
    variables: {
      userId: context.user.id,
    },
  });

  const { getWishlist: wishlist } = data ? data : [];

  return (
    <>
      {loading ? (
        <View>
          <Text>Loading your Wishlist.....</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.listContainer}>
              {wishlist &&
                wishlist.map((product, index) => (
                  <TouchableRipple>
                    <ProductList
                      key={index}
                      product={product}
                      navigation={props.navigation}
                    />
                  </TouchableRipple>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
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
export default ListScreen;
