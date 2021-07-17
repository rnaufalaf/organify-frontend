import React, { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Toast from "react-native-toast-message";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CommonActions } from "@react-navigation/native";

import { useTheme } from "react-native-paper";

import { storage } from "../../../firebase";
import { AuthContext } from "../../../context/auth";
import { useForm } from "../../../util/hooks";
import { GET_USER, UPDATE_SELLER_PROFILE } from "../../../util/graphql";

const EditSellerProfileScreen = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);

  console.log("this is the logged user", context.user.id);
  const { loading, data: data } = useQuery(GET_USER, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];
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
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Profile Photo Updated",
      });
    }
  };

  console.log("user@profileCard: ", currentUser);
  const { colors } = useTheme();

  let userObj = {
    avatar: "",
    username: currentUser.seller.username,
    description: currentUser.seller.description,
  };

  if (currentUser) {
    userObj = {
      // avatar: currentUser.seller.avatar,
      username: currentUser.seller.username,
      description: currentUser.seller.description,
    };
  }

  let { onChange, onSubmit, values } = useForm(updateSellerProfile, userObj);

  const [sellerProfileUpdate] = useMutation(UPDATE_SELLER_PROFILE, {
    update(_, { data: { updateSellerProfile: sellerData } }) {
      sellerData.username = sellerData.seller.username;
      context.login(sellerData);
      setSave(true);
      console.log("this is the sellerData" + sellerData);
      props.navigation.navigate("My Profiles");
      setErrors({});
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Seller Profile Saved",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: values,
  });

  function updateSellerProfile() {
    values.avatar = avatar;
    sellerProfileUpdate();
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
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
    <ScrollView contentContainerStyle={styles.container}>
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
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: currentUser.seller.avatar }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {currentUser.seller.username}
          </Text>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 20 }}>Profile</Text>
        </View>
        <View style={styles.action}>
          <FontAwesome5 name="store-alt" color={colors.text} size={20} />
          <TextInput
            name="username"
            placeholder="Store Name"
            placeholderTextColor="#666666"
            value={values.username}
            onChangeText={(val) => onChange("username", val)}
            autoCorrect={false}
            error={
              (errors.username ? true : false,
              console.log("this is the errors" + errors))
            }
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome5
            name="info"
            color={colors.text}
            size={20}
            style={{ paddingLeft: 5, paddingVertical: 50 }}
          />
          <TextInput
            name="description"
            placeholder="Store Description"
            value={values.description}
            onChangeText={(val) => onChange("description", val)}
            autoCorrect={false}
            multiline={true}
            numberOfLines={10}
            error={errors.description ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
                paddingLeft: 25,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={onSubmit}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default EditSellerProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
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
