import React from "react";
import { Image, View } from "react-native";
import Swiper from "react-native-swiper";

const ImageSlideComponent = ({ images }) => {
  console.log("the images", images);
  return (
    <View>
      <Swiper style={{ height: 250 }}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.downloadUrl }}
            style={{ width: "100%", height: 250 }}
          />
        ))}
      </Swiper>
    </View>
  );
};

export default ImageSlideComponent;
