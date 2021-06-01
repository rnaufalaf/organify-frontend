import React, { memo, useState, useContext, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useMutation } from "@apollo/react-hooks";
import { List } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Paragraph from "../../components/common/Paragraph";
import Background from "../../components/common/Background";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";
import { theme } from "../../constants/Theme";
import { AuthContext } from "../../context/auth";
import { LOGIN_USER } from "../../util/graphql";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      userData.name == userData.buyer.name;
      login(userData);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "HomeTab",
            },
          ],
        })
      );
      console.log(userData);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Login Succesful",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <Background>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Logo />
          <Paragraph>Organify</Paragraph>
          <TextInput
            label="Email"
            name="email"
            returnKeyType="next"
            value={values.email}
            error={errors.email ? true : false}
            onChangeText={(val) => onChange("email", val)}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Password"
            name="password"
            returnKeyType="done"
            value={values.password}
            error={errors.password ? true : false}
            onChangeText={(val) => onChange("password", val)}
            secureTextEntry
          />

          {Object.keys(errors).length > 0 && (
            <View style={styles.errorContainer}>
              <List.Section style={styles.errorSection}>
                {Object.values(errors).map((value) => (
                  <List.Item
                    key={value}
                    title={value}
                    titleStyle={styles.errorItem}
                    titleNumberOfLines={10}
                    left={() => (
                      <List.Icon
                        color={theme.colors.error}
                        style={{ margin: 0 }}
                        icon="alert-circle"
                      />
                    )}
                  />
                ))}
              </List.Section>
            </View>
          )}

          <Button
            mode="contained"
            style={styles.button}
            onPress={onSubmit}
            loading={loading ? true : false}
          >
            Login
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
  },
  errorSection: {
    borderStyle: "solid",
    borderWidth: 1,
    width: wp(100),
    maxWidth: 320,
    borderRadius: 5,
    borderColor: theme.colors.error,
    marginTop: 12,
  },
  errorHeader: {
    fontSize: wp(3.89),
    color: theme.colors.error,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 5,
  },
  errorItem: {
    fontSize: wp(3.4),
    color: theme.colors.error,
  },
});

export default memo(LoginScreen);
