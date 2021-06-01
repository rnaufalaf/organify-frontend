if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
import React from "react";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import AsyncStorage from "@react-native-community/async-storage";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { Provider } from "react-redux";
import store from "./Redux/store";

import { AuthProvider } from "./src/context/auth";
import MainNavigator from "./src/navigation/MainNavigator";
import { OrganifyProvider } from "./src/context/OrganifyProvider";
import { theme } from "./src/constants/Theme";

const httpLink = createHttpLink({
  // uri: "https://organify-graphql-backend.herokuapp.com/graphql",
  // uri: "http://192.168.100.4:1000/graphql",
  uri: "http://192.168.169.101:1000/graphql",
});

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem("jwtToken");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    client.resetStore();
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    );
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <OrganifyProvider>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <Provider store={store}>
                <NavigationContainer>
                  <MainNavigator />
                  <Toast ref={(ref) => Toast.setRef(ref)} />
                </NavigationContainer>
              </Provider>
            </PaperProvider>
          </SafeAreaProvider>
        </OrganifyProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
