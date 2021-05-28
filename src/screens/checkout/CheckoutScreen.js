import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker, Form, Item } from "native-base";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ScrollContainer from "../../components/common/ScrollContainer";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";

import { connect } from "react-redux";

const CheckoutScreen = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [subdistrict, setSubdistrict] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [additionalInfo, setAdditionalInfo] = useState();
  const [name, setName] = useState();

  const checkOut = () => {
    let order = {
      city,
      district,
      subdistrict,
      createdAt: Date.now(),
      orderItems,
      phone,
      name,
      address,
      zip,
      additionalInfo,
    };

    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <Card>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <ScrollContainer title={"Shipping Address"}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder={"Name"}
            name={"Name"}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            placeholder={"Phone"}
            name={"Phone"}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
            }}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder={"Address"}
            name={"Address"}
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
          />

          {/* <Picker
          mode="dropdown"
          style={{ width: undefined }}
          selectedValue={district}
          placeholder={"Select your district..."}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(district) => setDistrict(district)}
        />
        <Picker
          mode="dropdown"
          style={{ width: undefined }}
          selectedValue={subdistrict}
          placeholder={"Select your subdistrict..."}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(subdistrict) => setSubdistrict(subdistrict)}
        /> */}
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            placeholder={"Zip"}
            name={"Zip"}
            value={zip}
            onChangeText={(text) => {
              setZip(text);
            }}
          />
          <Text style={styles.label}>Additional Information</Text>
          <TextInput
            placeholder={"Additional Info"}
            name={"Additional Info"}
            value={additionalInfo}
            onChangeText={(text) => {
              setAdditionalInfo(text);
            }}
          />
          <Text style={styles.label}>City</Text>
          <Item picker style={[styles.inputStyle, { marginTop: 6 }]}>
            <Picker
              mode="dropdown"
              style={[styles.inputmain, { height: 60 }]}
              onValueChange={(city) => setCity(city)}
            >
              <Picker.Item label="City 1" value="city1" />
              <Picker.Item label="City 2" value="city2" />
              <Picker.Item label="City 3" value="city3" />
            </Picker>
          </Item>
          <Text style={styles.label}>District</Text>
          <Item picker style={[styles.inputStyle, { marginTop: 6 }]}>
            <Picker
              mode="dropdown"
              style={[styles.inputmain, { height: 60 }]}
              onValueChange={(district) => setDistrict(district)}
            >
              <Picker.Item label="District 1" value="district1" />
              <Picker.Item label="District 2" value="district2" />
              <Picker.Item label="District 3" value="district3" />
            </Picker>
          </Item>
          <Text style={styles.label}>Subdistrict</Text>
          <Item picker style={[styles.inputStyle, { marginTop: 6 }]}>
            <Picker
              mode="dropdown"
              style={[styles.inputmain, { height: 44 }]}
              onValueChange={(subdistrict) => setSubdistrict(subdistrict)}
            >
              <Picker.Item label="Subdistrict 1" value="subdistrict1" />
              <Picker.Item label="Subdistrict 2" value="subdistrict2" />
              <Picker.Item label="Subdistrict 3" value="subdistrict3" />
            </Picker>
          </Item>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button
              mode="contained"
              style={{ marginTop: 40 }}
              onPress={() => checkOut()}
            >
              Confirm
            </Button>
          </View>
        </ScrollContainer>
      </KeyboardAwareScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: "gainsboro",
    alignSelf: "center",
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 6,
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(CheckoutScreen);
