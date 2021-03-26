import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";

import ProductList from "./ProductList";
import SearchBar from "../../components/common/SearchBar";
import SearchedProducts from "./SearchedProducts";
import Carousel from "../../components/carousel/Carousel";
import TitleComponent from "../../components/common/TitleComponent";
import SubtitleComponent from "../../components/common/SubtitleComponent";
import CategoryFilter from "./CategoryFilter";

import data from "../../assets/data/products.json";
import productCategories from "../../assets/data/categories.json";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState([]);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setCategories(productCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  // Search

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

  // Category Filter

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(products.filter((i) => i.category.$oid == ctg)),
            setActive(true),
          ];
    }
  };

  return (
    <View>
      <Card>
        <TitleComponent title="Mau beli apa hari ini, Rakha?" />
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
        <SearchedProducts
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Carousel />
            </View>
            <Card>
              <TitleComponent title="Best seller" />
              <SubtitleComponent subtitle="Produk yang sering dibeli" />
              <View>
                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>
            </Card>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item.name}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center]}>
                <Text>No products found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: height,
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
