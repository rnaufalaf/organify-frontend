import React, { useState, useContext, useEffect } from "react";
import ImagePicker from "react-native-image-crop-picker";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useTheme, Button } from "react-native-paper";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { storage } from "../../../firebase";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Toast from "react-native-toast-message";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import { useForm } from "../../../util/hooks";
import {
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_SELLER_PRODUCTS,
} from "../../../util/graphql";
import { AuthContext } from "../../../context/auth";

const EditSellerProductScreen = (props) => {
  const productId = props.route.params.product.id;
  const productData = props.route.params.product;
  const productImg = props.route.params.product.images;
  const photos = props.route.params.photos;
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const [photosExists, setPhotosExists] = useState([]);
  const [image, setImage] = useState([]);

  const context = useContext(AuthContext);

  console.log("edit product", props);
  console.log("sini jon", photos);

  if (productImg) {
    productImg.forEach((img) => {
      image.push({
        downloadUrl: img.downloadUrl,
      });
    });
  }

  console.log("lol", image);

  useEffect(() => {
    if (photos) {
      photos.forEach((pic) => {
        uploadImage(pic.uri, `product-${new Date().toISOString()}`)
          .then(() => {
            console.log("Success");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [photos]);

  const uploadImage = async (uri, imageName) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storage
        .ref(`images/productImg/${imageName}`)
        .put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/productImg")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              // setImages(url);
              setImage((img) => [...img, url]);
              console.log("test", url);
            });
        }
      );
    }
  };

  let productObj;

  if (productData) {
    productObj = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      weight: productData.weight,
      benefits: productData.benefits,
      method: productData.method,
      category: productData.category,
      stock: productData.stock,
      productId: productId,
      //   images: productData.images
    };
  } else {
    productObj = {
      name: "",
      description: "",
      price: 0,
      weight: 0,
      benefits: "",
      method: "",
      category: "",
      stock: 0,
      productId: productId,
      // images: ""
    };
  }

  const { onChange, onSubmit, values } = useForm(editProduct, productObj);

  const { colors } = useTheme();

  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    update(_, { data: { updateProduct: updatedProduct } }) {
      setSave(true);
      setErrors({});
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Product Updated",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
      setSave(true);
    },
    variables: values,
  });

  console.log(context.user);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update() {
      props.refetchCatalog();
    },
    variables: { productId: productId },
  });

  function productDelete() {
    deleteProduct();
  }

  function editProduct() {
    values.price = parseInt(values.price);
    values.stock = parseInt(values.stock);
    values.weight = parseInt(values.weight);
    // values.images.downloadUrl = image;
    updateProduct();
  }
  console.log("ini values", values);

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Image Pictures</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => props.navigation.navigate("Image Picker")}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bottomSheet.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bottomSheet = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <KeyboardAvoidingView
      enabled={true}
      contentContainerStyle={styles.container}
    >
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                }}
              >
                <ImageBackground
                  source={{
                    uri: "https://react.semantic-ui.com/images/avatar/large/molly.png",
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                ></ImageBackground>
              </View>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  paddingHorizontal: 10,
                }}
              >
                <ImageBackground
                  source={{
                    uri: "https://react.semantic-ui.com/images/avatar/large/molly.png",
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                ></ImageBackground>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 20 }}>Product Details</Text>
        </View>
        <View style={styles.action}>
          <TextInput
            name="name"
            placeholder="Name"
            placeholderTextColor="#666666"
            value={values.name}
            onChangeText={(val) => onChange("name", val)}
            autoCorrect={false}
            error={errors.name ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="category"
            placeholder="Category"
            value={values.category}
            onChangeText={(val) => onChange("category", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            error={errors.category ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="method"
            placeholder="Planting method / technique"
            multiline={true}
            numberOfLines={3}
            value={values.method}
            onChangeText={(val) => onChange("method", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            error={errors.method ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="description"
            placeholder="Product Description"
            multiline={true}
            numberOfLines={5}
            value={values.description}
            onChangeText={(val) => onChange("description", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            error={errors.description ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="benefits"
            placeholder="Benefits"
            value={values.benefits}
            onChangeText={(val) => onChange("benefits", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            error={errors.benefits ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="price"
            placeholder="Price"
            value={values.price}
            onChangeText={(val) => onChange("price", val)}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            error={errors.price ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="stock"
            placeholder="Stock"
            value={values.stock}
            onChangeText={(val) => onChange("stock", val)}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            error={errors.stock ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            name="weight"
            placeholder="Weight"
            value={values.weight}
            onChangeText={(val) => onChange("weight", val)}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            error={errors.weight ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={onSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.redCommandButton}
          onPress={productDelete}
        >
          <Text style={styles.panelButtonTitle}>Delete Product</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditSellerProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginTop: 10,
  },
  redCommandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 15,
    color: "#05375a",
  },
  pickerStyle: {
    borderColor: "gainsboro",
    alignSelf: "center",
    flex: 1,
    marginLeft: 5,
  },
});
