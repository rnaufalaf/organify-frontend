import React from "react";
import { ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import { List, Avatar, Card, Divider } from "react-native-paper";
import { Content } from "native-base";

var { width } = Dimensions.get("window");

const SearchedProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((product) => (
          <Card>
            <Divider />
            <List.Item
              onPress={() => {
                props.navigation.navigate("Product Detail", {
                  product: product,
                });
              }}
              key={product.id}
              left={() => (
                <Avatar.Image
                  source={{
                    uri: product.images[0].downloadUrl
                      ? product.images[0].downloadUrl
                      : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                  }}
                />
              )}
              title={product.name}
              description={product.description}
            />
          </Card>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Content>
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
