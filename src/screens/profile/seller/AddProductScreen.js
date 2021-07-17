import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useMutation } from "@apollo/react-hooks";
import { storage } from "../../../firebase";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadMultipleImage } from "../../../../Redux/actions/imagePickerAction";
import { CommonActions } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Toast from "react-native-toast-message";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import { useForm } from "../../../util/hooks";
import { ADD_PRODUCT } from "../../../util/graphql";

const AddProductScreen = (props) => {
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const { onChange, onSubmit, values } = useForm(addProduct, {
    name: "",
    description: "",
    price: 0,
    weight: 0,
    benefits: "",
    method: "",
    category: "",
    stock: 0,
  });

  const { colors } = useTheme();

  const [image, setImage] = useState([]);

  console.log("edit seller", props.photos);

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
              setImageCount(image.length);
            });
        }
      );
    }
  };

  useEffect(() => {
    console.log(image.length, "here");
    if (props.photos && image.length == props.photos.length) {
      let downloadUrlImages = [];
      image.forEach((img) => {
        downloadUrlImages.push({
          downloadUrl: img,
        });
      });
      values.images = downloadUrlImages;
      submitProduct();
    }
  }, [image]);

  const [submitProduct, { loading }] = useMutation(ADD_PRODUCT, {
    update(_, { data: { addProduct: products } }) {
      setSave(true);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Product Added",
      });
      setErrors({});
      console.log("data", addProduct);
      props.navigation.dispatch(CommonActions.goBack());
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
      setSave(true);
    },
    variables: values,
  });

  function addProduct() {
    props.photos.forEach((pic) => {
      uploadImage(pic.uri, `product-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    values.price = parseInt(values.price);
    values.stock = parseInt(values.stock);
    values.weight = parseInt(values.weight);
  }
  console.log(values);

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
    <View>
      <KeyboardAvoidingView
        enabled={true}
        contentContainerStyle={styles.container}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          {props.photos ? (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
                {props.photos.map((pic) => (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 15,
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: pic.uri,
                      }}
                      style={{ height: 100, width: 100 }}
                      imageStyle={{ borderRadius: 15 }}
                    ></ImageBackground>
                  </View>
                ))}
              </TouchableOpacity>
            </View>
          ) : (
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
                    <IconButton
                      icon="plus"
                      color="gray"
                      size={30}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
        </Animated.ScrollView>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={bottomSheet}
        snapPoints={[330, -80]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false}
      />
    </View>
  );
};

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

AddProductScreen.propTypes = {
  uploadMultipleImage: PropTypes.func.isRequired,
  photos: PropTypes.array,
};
const mapStateToProps = (state) => ({
  photos: state.imagePicker.photos,
});

export default connect(mapStateToProps, { uploadMultipleImage })(
  AddProductScreen
);
