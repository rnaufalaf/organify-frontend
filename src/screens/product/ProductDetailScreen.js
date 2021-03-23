import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Divider } from "react-native-paper";
import { Left, Right } from "native-base";

import Button from "../../components/common/Button";
import TitleComponent from "../../components/common/TitleComponent";
import Paragraph from "../../components/common/Paragraph";

const ProductDetailScreen = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");
  const [availabilityText, setAvailabilityText] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <Card>
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
        </Card>
        <Divider style={{ margin: 1 }} />
        <Card style={{ borderColor: "black" }}>
          <View style={styles.contentContainer}>
            <TitleComponent title={item.name} style={styles.contentHeader} />
            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.contentText}>{item.brand}</Text>
                <Text style={styles.contentText}>{item.brand}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Divider style={{ marginTop: 10 }} />
          <TitleComponent
            title="Deskripsi"
            style={{ color: "green", fontWeight: "bold" }}
          />
          <View>
            <Paragraph>{item.description}</Paragraph>
          </View>
          <TitleComponent
            title="Khasiat"
            style={{ color: "green", fontWeight: "bold" }}
          />
          <View>
            <Paragraph>{item.description}</Paragraph>
          </View>
          <TitleComponent
            title="Aturan Pembelian"
            style={{ color: "green", fontWeight: "bold" }}
          />
          <View>
            <Paragraph>{item.description}</Paragraph>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>Rp. {item.price}</Text>
        </Left>
        <Right>
          <Button mode="contained">Add to Cart</Button>
        </Right>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  availabilityContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tabIndicatorStyle: {
    backgroundColor: "yellow",
  },
  tabBarStyle: {
    backgroundColor: "green",
  },
});
export default ProductDetailScreen;
