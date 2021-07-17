import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card, Chip } from "react-native-paper";
import { ListItem, Header, Item, Icon, Input } from "native-base";
import Constants from "expo-constants";

import ProductList from "./ProductList";
import SearchBar from "../../components/common/SearchBar";
import SearchedProducts from "./SearchedProducts";
import Carousel from "../../components/carousel/Carousel";
import TitleComponent from "../../components/common/TitleComponent";
import SubtitleComponent from "../../components/common/SubtitleComponent";
import CategoryFilter from "./CategoryFilter";

import { GET_PRODUCTS } from "../../util/graphql";
import { useQuery } from "@apollo/client";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  let data;
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();
  const [activeChip, setActiveChip] = useState();
  const { loading, data: productData } = useQuery(GET_PRODUCTS);
  const { getProducts: productList } = productData ? productData : [];

  useEffect(() => {
    setProducts(productList);
    setProductsFiltered(productList);
    setFocus(false);
    setActive(-1);
    setActiveChip("All");

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setActive();
      setActiveChip();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  var productsToFilter = [];

  if (productList && activeChip === "All") {
    productsToFilter.push(productList);
  } else if (
    productList &&
    activeChip === "Sayur" &&
    productList.find((product) => product.category === "Sayur")
  ) {
    productsToFilter.push(
      productList.filter((product) => product.category === "Sayur")
    );
  } else if (
    productList &&
    activeChip === "Buah" &&
    productList.find((product) => product.category === "Buah")
  ) {
    productsToFilter.push(
      productList.filter((product) => product.category === "Buah")
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <TitleComponent title="Mau beli apa hari ini?" />
        <SubtitleComponent subtitle="Pilih berdasarkan kategori berikut" />
      </Card>
      <Card>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Card>
      {focus == true ? (
        <SearchedProducts
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <Card>
            <TitleComponent title="Best seller" />
            <SubtitleComponent subtitle="Produk yang sering dibeli" />
          </Card>
          <Card>
            <View>
              <ListItem
                style={{
                  margin: 5,
                  padding: 0,
                  borderRadius: 3,
                  flexDirection: "row",
                }}
              >
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("All")}
                >
                  All
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Sayur")}
                >
                  Sayur
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("Buah")}
                >
                  Buah
                </Chip>
              </ListItem>
            </View>
          </Card>
          {!loading ? (
            productsToFilter.length > 0 ? (
              <View style={styles.listContainer}>
                {productsToFilter[0] &&
                  productsToFilter[0].map((product, index) => (
                    <ProductList
                      navigation={props.navigation}
                      key={index}
                      product={product}
                    />
                  ))}
              </View>
            ) : (
              <View style={[styles.center]}>
                <Text>No products found</Text>
              </View>
            )
          ) : (
            <Card>
              <Card.Content>
                <Text>Loading</Text>
              </Card.Content>
            </Card>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  listContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  active: {
    backgroundColor: "green",
  },
  inactive: {
    backgroundColor: "lightgreen",
  },
});

export default ProductContainer;
