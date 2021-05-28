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
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Item, Picker } from "native-base";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { useTheme } from "react-native-paper";

import { storage } from "../../../firebase";
import { AuthContext } from "../../../context/auth";
import { useForm } from "../../../util/hooks";
import { GET_USER, UPDATE_USER_PROFILE } from "../../../util/graphql";

const EditBuyerProfileScreen = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [citiesName, setCitiesName] = useState("");
  const [citiesId, setCitiesId] = useState("");
  const [isCitiesSet, setIsCities] = useState(false);

  const [isSaved, setSave] = useState(false);

  console.log("this is the logged user", context.user.id);
  const {
    loading,
    data: data,
    data: cityData,
  } = useQuery(GET_USER, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];
  const { getCities: cities } = cityData ? cityData : [];

  console.log("user@profileCard: ", currentUser);
  const { colors } = useTheme();

  if (!loading && !isCitiesSet) {
    setCitiesName(currentUser.address.cityName);
    setCitiesId(currentUser.address.cityId);
    setIsCities(true);
  }
  const handleChange = (value) => {
    setCitiesName(value.split("-")[0]);
    setCitiesId(value.split("-")[1]);
  };

  console.log(citiesName, citiesId);

  let userObj = {
    avatar: "",
    name: "",
    email: "",
    phone: "",
    // city: "",
  };

  if (currentUser) {
    userObj = {
      // avatar: currentUser.buyer.avatar,
      name: currentUser.buyer.name,
      email: currentUser.email,
      phone: currentUser.phone,
      cityName: currentUser.address.cityName,
      district: currentUser.address.district,
      postalCode: currentUser.address.postalCode,
      detail: currentUser.address.detail,
      // city: kota,
    };
  }

  let { onChange, onSubmit, values } = useForm(updateUserProfile, userObj);

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

  const [updateBuyerProfile] = useMutation(UPDATE_USER_PROFILE, {
    update(_, { data: { updateBuyerProfile: userData } }) {
      userData.name = userData.buyer.name;
      setErrors({});
      props.navigation.dispatch(CommonActions.goBack());
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Profile Saved",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: {
      ...values,
      cityName: citiesName,
      cityId: citiesId,
      avatar: avatar,
    },
  });

  function updateUserProfile() {
    updateBuyerProfile();
  }

  const saveAlert = () =>
    Alert.alert("Confirm Profile", "Do you want to save your profile?", [
      {
        text: "Cancel",
        onPress: () => navigation.navigate("Edit Buyer Profile"),
      },
      {
        text: "Confirm",
        onPress: onSubmit,
      },
    ]);

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
                source={{ uri: loading ? avatar : currentUser.buyer.avatar }}
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
            {currentUser.buyer.name}
          </Text>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 20 }}>Profile</Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            name="name"
            placeholder="Name"
            placeholderTextColor="#666666"
            value={values.name}
            onChangeText={(val) => onChange("name", val)}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            name="phone"
            placeholder="Phone"
            value={values.phone}
            onChangeText={(val) => onChange("phone", val)}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            error={errors.phone ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            name="email"
            placeholder="Email"
            value={values.email}
            onChangeText={(val) => onChange("email", val)}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            error={errors.email ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 20 }}>Address</Text>
        </View>
        <View style={styles.action}>
          <Icon name="city-variant-outline" color={colors.text} size={20} />
          <Item picker style={[styles.pickerStyle]}>
            <Picker
              name="city"
              mode="dialog"
              value={`${citiesName}-${citiesId}`}
              style={{ height: 20 }}
              onValueChange={(val) => handleChange(val)}
            >
              {cities &&
                cities.map((city) => (
                  <Picker.Item
                    label={
                      city.city_name + " - " + city.type + " " + city.city_name
                    }
                    value={
                      city.type + " " + city.city_name + "-" + city.city_id
                    }
                  />
                ))}
            </Picker>
          </Item>
        </View>
        <View style={styles.action}>
          <Icon name="home-city-outline" color={colors.text} size={20} />
          <TextInput
            name="district"
            placeholder="District"
            value={values.district}
            onChangeText={(val) => onChange("district", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="city-variant-outline" color={colors.text} size={20} />
          <TextInput
            name="subdistrict"
            placeholder="Subdistrict"
            value={values.subdistrict}
            onChangeText={(val) => onChange("subdistrict", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="home-edit-outline" color={colors.text} size={20} />
          <TextInput
            name="detail"
            placeholder="Address Detail"
            value={values.detail}
            onChangeText={(val) => onChange("detail", val)}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="mailbox-outline" color={colors.text} size={20} />
          <TextInput
            name="postalCode"
            placeholder="Postal Code"
            value={values.postalCode}
            onChangeText={(val) => onChange("postalCode", val)}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
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
      </Animated.View>
    </ScrollView>
  );
};

export default EditBuyerProfileScreen;

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
