import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Card } from "react-native-paper";

import data from "../../assets/data/products.json";
import ProductList from "./ProductList";
import SearchBar from "../common/SearchBar";
import SearchedProducts from "./SearchedProducts";
import Carousel from "../carousel/Carousel";
import TitleComponent from "../common/TitleComponent";
import SubtitleComponent from "../common/SubtitleComponent";

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
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

  return (
    <View>
      <SearchBar
        onChangeText={(text) => searchProduct(text)}
        onFocus={openList}
        clearIconPressed={onBlur}
      />
      <Carousel />
      <TitleComponent title="Best seller" />
      <SubtitleComponent subtitle="Produk yang sering dibeli" />
      {focus == true ? (
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductList key={item.id} item={item} />}
          keyExtractor={(item) => item.name}
          key={2}
          numColumns={2}
        />
      )}
    </View>
  );
};
export default ProductContainer;
