import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Card } from "react-native-paper";

import TitleComponent from "../../components/common/TitleComponent";
import SubtitleComponent from "../../components/common/SubtitleComponent";
import TileComponent from "../../components/common/TileComponent";
import ProductContainer from "../../components/product/ProductContainer";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Card>
        <TitleComponent title="Mau beli apa hari ini, Rakha?" />
        <SubtitleComponent subtitle="Pilih berdasarkan kategori berikut" />
      </Card>
      <Card>
        <ProductContainer />
      </Card>
    </View>
  );
};

export default HomeScreen;
