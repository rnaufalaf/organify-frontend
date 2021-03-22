import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";

const ProductDetailScreen = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    padding: 0,
    margin: 0,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 250,
  },
});
