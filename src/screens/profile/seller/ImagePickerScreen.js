import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import { ImageBrowser } from "expo-image-picker-multiple";

import { storage } from "../../../firebase";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadMultipleImage } from "../../../../Redux/actions/imagePickerAction";

const ImagePickerScreen = (props) => {
  const getHeaderLoader = () => (
    <ActivityIndicator size="small" color={"#0580FF"} />
  );

  const imagesCallback = (callback) => {
    const { navigation } = props;
    navigation.setOptions({
      headerRight: () => getHeaderLoader(),
    });

    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          cPhotos.push({
            uri: photo.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        props.uploadMultipleImage(cPhotos);
        props.navigation.goBack(null);
        // if (cPhotos) {
        //   cPhotos.forEach((pic) => {
        //     uploadImage(pic.uri, `product-${new Date().toISOString()}`)
        //       .then(() => {
        //         console.log("Success");
        //       })
        //       .catch((error) => {
        //         console.log(error);
        //       });
        //   });
        // }
      })
      .catch((e) => console.log(e));
  };

  //   const imgProcess = async () => {
  //     const file = await ImageManipulator.manipulateAsync(
  //       uri,
  //       [{ resize: { width: 1000 } }],
  //       { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  //     );
  //     return file;
  //   };

  //   const uploadImage = async (uri, imageName) => {
  //     if (uri) {
  //       const response = await fetch(uri);
  //       const blob = await response.blob();
  //       const uploadTask = storage.ref(`images/products/${imageName}`).put(blob);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {},
  //         (error) => {
  //           console.log(error);
  //         },
  //         () => {
  //           storage.ref("images/products").child(imageName).getDownloadURL();
  //           console.log("finally");
  //           // .then((url) => {
  //           //   setAvatar(url);
  //           //   console.log("this is the avatar " + url);
  //           // });
  //         }
  //       );
  //     }
  //   };

  const renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity title={"Done"} onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count, onSubmit) => {
    props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => renderDoneButton(count, onSubmit),
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = () => <Text style={styles.emptyStay}>Empty</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});

ImagePickerScreen.propTypes = {
  uploadMultipleImage: PropTypes.func.isRequired,
  photos: PropTypes.array,
};
const mapStateToProps = (state) => ({
  photos: state.imagePicker.photos,
});

export default connect(mapStateToProps, { uploadMultipleImage })(
  ImagePickerScreen
);
