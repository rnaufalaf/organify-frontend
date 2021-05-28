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
import { AuthContext } from "../../context/auth";
import { GET_SELLER_PRODUCTS, GET_USER } from "../../util/graphql";

import ProductList from "./ProductList";

const StoreCatalogScreen = (props) => {
  const context = useContext(AuthContext);

  const { data } = useQuery(GET_SELLER_PRODUCTS, {
    variables: {
      userId: context.user.id,
    },
  });

  const { loading, data: userdata } = useQuery(GET_USER, {
    variables: {
      userId: context.user.id,
    },
  });

  const { getUser: sellerData } = userdata ? userdata : [];

  const { getSellerProducts: sellerProducts } = data ? data : [];

  return (
    <>
      {loading ? (
        <View>
          <Text>Loading Store Catalog.....</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Card>
              <Card.Content>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <Left>
                    <Avatar.Image source={{ uri: sellerData.seller.avatar }} />
                  </Left>
                  <Left style={{ position: "absolute", left: 100, top: 5 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "green",
                        marginBottom: 5,
                      }}
                    >
                      {sellerData.seller.username}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Icon name="location-outline" size={17} />
                      <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
                        {sellerData.address.cityName}
                      </Text>
                    </View>
                  </Left>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: "bold", color: "green" }}>
                    Store Description
                  </Text>
                  <Paragraph style={{ fontSize: 15 }}>
                    {sellerData.seller.description}
                  </Paragraph>
                </View>
              </Card.Content>
            </Card>
            <View style={styles.listContainer}>
              {sellerProducts &&
                sellerProducts.map((product, index) => (
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
export default StoreCatalogScreen;
