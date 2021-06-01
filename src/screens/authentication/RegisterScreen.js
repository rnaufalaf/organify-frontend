import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useMutation } from "@apollo/react-hooks";
import { List } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Paragraph from "../../components/common/Paragraph";
import Background from "../../components/common/Background";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";
import { theme } from "../../constants/Theme";
import { REGISTER_USER } from "../../util/graphql";

const RegisterScreen = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };
  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log("succeeded register - userData: ", userData);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Login",
            },
          ],
        })
      );
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    register();
  };
  return (
    <Background>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Logo />
          <Paragraph>Organify</Paragraph>
          <TextInput
            label="Email"
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
            label="Username"
            returnKeyType="next"
            value={values.username}
            error={errors.username ? true : false}
            onChangeText={(val) => onChange("username", val)}
            autoCapitalize="none"
            autoCompleteType="username"
            textContentType="username"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            value={values.password}
            error={errors.password ? true : false}
            onChangeText={(val) => onChange("password", val)}
            secureTextEntry
          />

          <TextInput
            label="Confirm Password"
            returnKeyType="done"
            value={values.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChangeText={(val) => onChange("confirmPassword", val)}
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
            Create Account
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Login</Text>
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

export default memo(RegisterScreen);
