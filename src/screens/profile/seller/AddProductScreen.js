import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
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

  const [avatar, setAvatar] = useState(
    "https://react.semantic-ui.com/images/avatar/large/molly.png"
  );

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uploadImage = async (uri, imageName) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storage.ref(`images/avatar/${imageName}`).put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/avatar")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              setAvatar(url);
              console.log("this is the avatar " + url);
            });
        }
      );
    }
    // const response = await fetch(uri);
    // console.log("masuk uploadimages");
    // const blob = await response.blob();

    // var ref = storage
    //   .ref()
    //   .child("images/" + imageName)
    //   .getDownloadURL()
    //   .then((url) => {
    //     setAvatar(url);
    //     console.log(url);
    //   });
    // return ref.put(blob);
  };

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
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
      setSave(true);
    },
    variables: values,
  });

  function addProduct() {
    values.price = parseInt(values.price);
    values.stock = parseInt(values.stock);
    values.weight = parseInt(values.weight);
    submitProduct();
  }
  console.log(values);

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Image Pictures</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
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
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
