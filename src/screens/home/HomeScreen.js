import React from "react";
import { ScrollView, View } from "react-native";
import { Card } from "react-native-paper";

import TitleComponent from "../../components/common/TitleComponent";
import SubtitleComponent from "../../components/common/SubtitleComponent";
import ProductContainer from "../../components/product/ProductContainer";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <Card>
        <TitleComponent title="Mau beli apa hari ini, Rakha?" />
        <SubtitleComponent subtitle="Pilih berdasarkan kategori berikut" />
      </Card>
      <Card>
        <ProductContainer />
      </Card>
    </ScrollView>
  );
};

export default HomeScreen;
