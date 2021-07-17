import React, { useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { GET_USER } from "../../../util/graphql";

const BuyerProfileScreen = (props) => {
  const { user, logout } = useContext(AuthContext);
  console.log("this is the logged user", user.id);
  const { loading, data: data } = useQuery(GET_USER, {
    variables: {
      userId: user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];

  console.log("user@profileCard: ", currentUser);

  const [avatar] = useState(
    "https://react.semantic-ui.com/images/avatar/large/molly.png"
  );
  return (
    <>
      {loading ? (
        <Text>Loading Profile.....</Text>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{ uri: currentUser.buyer.avatar }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[styles.title, { marginTop: 15, marginBottom: 5 }]}
                >
                  {currentUser.buyer.name}
                </Title>
                <Caption>Buyer Account</Caption>
              </View>
            </View>
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {currentUser.address.detail}, {currentUser.address.district},{" "}
                {currentUser.address.cityName}, {currentUser.address.postalCode}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {currentUser.phone}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {currentUser.email}
              </Text>
            </View>
          </View>
          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Title>Rp. {currentUser.balance}</Title>
              <Caption>Balance</Caption>
            </View>
            <TouchableOpacity
              style={styles.infoBox}
              onPress={() => props.navigation.navigate("Chat")}
            >
              <Title>12</Title>
              <Caption>Messages</Caption>
            </TouchableOpacity>
          </View>
          <View style={styles.menuWrapper}>
            <TouchableRipple
              onPress={() => props.navigation.navigate("Wishlist Screen")}
            >
              <View style={styles.menuItem}>
                <Icon name="heart" color="gray" size={25} />
                <Text style={styles.menuItemText}>Your Wishlist</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="map" color="gray" size={25} />
                <Text style={styles.menuItemText}>Change Password</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => props.navigation.navigate("Edit Buyer Profile")}
            >
              <View style={styles.menuItem}>
                <Icon name="account-settings" color="gray" size={25} />
                <Text style={styles.menuItemText}>Change User Profile</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                logout;
                props.navigation.navigate("Authentication", {
                  screen: "Login",
                });
              }}
            >
              <View style={styles.menuItem}>
                <Icon name="logout" color="gray" size={25} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default BuyerProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
