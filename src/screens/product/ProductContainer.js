import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";
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
  // const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const { loading, data: productData } = useQuery(GET_PRODUCTS);
  const { getProducts: productList } = productData ? productData : [];

  console.log(productList);

  // useEffect(() => {
  //   // setProducts(data);
  //   // setProductsFiltered(data);
  //   // // setProductsCtg(data);
  //   // setActive(-1);
  //   // setInitialState(data);

  //   return () => {
  //     setProducts([]);
  //     setProductsFiltered([]);
  //     setFocus();
  //     // setCategories([]);
  //     setActive();
  //     setInitialState();
  //   };
  // }, []);

  // Search

  // const searchProduct = (text) => {
  //   setProductsFiltered(
  //     products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
  //   );
  // };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Category Filter

  // const changeCtg = (ctg) => {
  //   {
  //     ctg === "all"
  //       ? [setProductsCtg(initialState), setActive(true)]
  //       : [
  //           setProductsCtg(products.filter((i) => i.category.$oid == ctg)),
  //           setActive(true),
  //         ];
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <Card>
        <TitleComponent title="Mau beli apa hari ini?" />
        <SubtitleComponent subtitle="Pilih berdasarkan kategori berikut" />
      </Card>
      <Card>
        <SearchBar
          onChangeText={(text) => searchProduct(text)}
          onFocus={openList}
          clearIconPressed={onBlur}
        />
      </Card>
      {focus == true ? (
        <View>
          {/* {productList.map((productsFiltered) => {
            return (
              <SearchedProducts
                navigation={props.navigation}
                productsFiltered={productsFiltered}
              />
            );
          })} */}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <Card>
            <TitleComponent title="Best seller" />
            <SubtitleComponent subtitle="Produk yang sering dibeli" />
            <View>
              {/* <CategoryFilter
                  categories={data.category}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                /> */}
            </View>
          </Card>
          {!loading ? (
            <View style={styles.listContainer}>
              {productList.map((product, index) => {
                return (
                  <ProductList
                    navigation={props.navigation}
                    key={index}
                    product={product}
                  />
                );
              })}
            </View>
          ) : (
            <View style={[styles.center]}>
              <Text>No products found</Text>
            </View>
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
});

export default ProductContainer;
