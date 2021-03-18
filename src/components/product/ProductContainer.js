import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";

import data from "../../assets/data/products.json";
import ProductList from "./ProductList";
import SearchBar from "../common/SearchBar";
import SearchedProducts from "./SearchedProducts";

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
