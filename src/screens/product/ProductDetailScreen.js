import React, { useState, useContext } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";

import NumericInput from "react-native-numeric-input";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

import { Card, Divider, Avatar, IconButton } from "react-native-paper";
import { Body, Left, Right } from "native-base";
import Toast from "react-native-toast-message";

import { AuthContext } from "../../context/auth";
import Button from "../../components/common/Button";
import TitleComponent from "../../components/common/TitleComponent";
import Paragraph from "../../components/common/Paragraph";
import WishlistButton from "../../components/common/WishlistButton";
import ImageSlideComponent from "../../components/common/ImageSlideComponent";

import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCTS_CART,
  GET_PRODUCT_IN_CART,
} from "../../util/graphql";

const ProductDetailScreen = (props) => {
  const [product, setProduct] = useState(props.route.params.product);
  const [productQty, setProductQty] = useState(1);
  const [addProductQty, setAddProductQty] = useState(false);
  const [errors, setErrors] = useState({});

  console.log(props.route.params.product);
  const user = useContext(AuthContext);

  const [addToCart] = useMutation(ADD_PRODUCT_TO_CART, {
    variables: {
      productId: product.id,
      isChecked: false,
      productQty: productQty,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_PRODUCTS_CART,
      });

      proxy.writeQuery({
        query: GET_PRODUCTS_CART,
        data: {
          getProductsCart: [
            result.data.addProductToCart,
            ...data.getProductsCart,
          ],
        },
      });

      console.log("Sampe sini");

      // const productInCart = proxy.readQuery({
      //   query: GET_PRODUCT_IN_CART,
      // });
      // proxy.writeQuery({
      //   query: GET_PRODUCT_IN_CART,
      //   data: {
      //     getProductInCart: productInCart.getProductInCart,
      //   },
      // });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  const { loading, data: userCart } = useQuery(GET_PRODUCT_IN_CART, {
    variables: {
      productId: product.id,
    },
  });
  const { getProductInCart: productInCart } = userCart ? userCart : [];
  let productAmountInCart = 0;

  if (productInCart) {
    productAmountInCart = productInCart.productQty;
  }
  const AnimatedView = Animated.View;

  const changeQty = (val) => {
    console.log(val);
    setProductQty(val);
  };

  function addProductCart() {
    addToCart();
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 320,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "green",
        }}
      >
        How much would you want to buy ?
      </Text>
      <Divider style={{ marginVertical: 20 }} />
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.bottomSheetImage}
          source={{
            uri: product.images[0].downloadUrl
              ? product.images[0].downloadUrl
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 20,
              paddingVertical: 5,
            }}
          >
            {product.name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
              paddingVertical: 5,
              color: "red",
            }}
          >
            Rp. {product.price} <Text style={{ color: "black" }}> / pack</Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              paddingVertical: 5,
              color: "black",
            }}
          >
            Stock : {product.stock}
          </Text>
        </View>
      </View>
      <Divider style={{ marginVertical: 20 }} />
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
          Jumlah :{" "}
        </Text>
        <NumericInput
          containerStyle={{ position: "absolute", right: 0 }}
          value={productQty}
          onChange={(val) => changeQty(val)}
          step={1}
          totalWidth={120}
          totalHeight={30}
          rounded
          rightButtonBackgroundColor="green"
          leftButtonBackgroundColor="green"
          iconStyle={{ color: "white" }}
          inputStyle={{ fontSize: 16 }}
        />
      </View>
      <Button
        mode="contained"
        style={{ marginTop: 15 }}
        onPress={addProductCart}
      >
        Add
      </Button>
    </View>
  );
  const renderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });

    return (
      <AnimatedView
        pointerEvents="none"
        style={[
          styles.shadowContainer,
          {
            opacity: animatedShadowOpacity,
          },
        ]}
      />
    );
  };

  const bottomSheet = React.createRef();
  const fall = new Animated.Value(1);

  // if (addProductQty) {
  //   addToCart();
  // }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Card>
            <View style={styles.imageContainer}>
              <ImageSlideComponent images={product.images} />
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "gainsboro",
                  fontSize: 20,
                }}
              >
                Tersisa <Text>{product.stock}</Text> pack
              </Text>
            </View>
          </Card>
          <Card style={{ borderColor: "black" }}>
            <View style={styles.contentContainer}>
              <TitleComponent
                title={product.name}
                style={styles.contentHeader}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Store Catalog")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Avatar.Image
                    size={35}
                    source={{ uri: product.user.seller.avatar }}
                  />
                  <Text style={styles.contentText}>
                    {product.user.seller.username}
                  </Text>
                  {/* <View style={{ position: "absolute", right: -80 }}> */}
                  <WishlistButton user={user} product={product} />
                  {/* </View> */}
                </View>
              </TouchableOpacity>
            </View>
            <Divider style={{ marginTop: 10 }} />
            <TitleComponent
              title="Deskripsi"
              style={{ color: "green", fontWeight: "bold" }}
            />
            <View>
              <Paragraph>{product.description}</Paragraph>
            </View>
            <TitleComponent
              title="Khasiat"
              style={{ color: "green", fontWeight: "bold" }}
            />
            <View>
              <Paragraph>{product.benefits}</Paragraph>
            </View>
            <TitleComponent
              title="Metode Penanaman"
              style={{ color: "green", fontWeight: "bold" }}
            />
            <View>
              <Paragraph>{product.method}</Paragraph>
            </View>
          </Card>
        </ScrollView>
        <Divider></Divider>
        <View style={styles.bottomContainer}>
          <Left style={{ paddingLeft: 5 }}>
            <Text style={styles.price}>
              Rp. {product.price}{" "}
              <Text style={{ color: "black" }}> / pack</Text>
            </Text>
          </Left>
          <Right style={{ marginRight: 10 }}>
            <Button
              mode="contained"
              onPress={() => bottomSheet.current.snapTo(0)}
            >
              Add to Cart
            </Button>
          </Right>
          {/* <Right style={{ paddingRight: 15 }}>
            <Button mode="contained" onPress={addProductToCart}>
              Add to Cart
            </Button>
          </Right> */}
        </View>
        <View style={{ flex: 1 }}>
          <BottomSheet
            ref={bottomSheet}
            snapPoints={[320, 0]}
            initialSnap={1}
            enabledGestureInteraction={true}
            enabledContentTapInteraction={false}
            callbackNode={fall}
            borderRadius={10}
            renderContent={renderContent}
          />
        </View>
        {renderShadow()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
  },
  bottomSheetImage: {
    width: 100,
    height: 100,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
    marginLeft: 20,
    color: "green",
    paddingRight: 30,
  },
  bottomContainer: {
    flexDirection: "row",
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
