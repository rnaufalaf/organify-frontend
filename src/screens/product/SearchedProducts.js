import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { List, Avatar } from "react-native-paper";

var { width } = Dimensions.get("window");

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <View style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <List.Item
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item._id.$oid}
            left={() => (
              <Avatar.Image
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            )}
            title={item.name}
            description={item.description}
          />
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default SearchedProducts;
