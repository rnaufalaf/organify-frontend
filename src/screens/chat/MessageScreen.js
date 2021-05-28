import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ADD_MESSAGE, GET_USER_MESSAGES } from "../../util/graphql";

const MessageScreen = (props) => {
  console.log("const", props.route.params.chatId);
  const [content, setContent] = useState("");
  const { loading, data, subscribeToMore, refetch } = useQuery(
    GET_USER_MESSAGES,
    {
      variables: {
        chatId: props.route.params.chatId,
      },
    }
  );
  let { getMessages: messages } = data ? data : [];

  const [addMessage] = useMutation(ADD_MESSAGE, {
    update(_, { data: { addMessage: message } }) {
      refetch();
      console.log("succsess");
      // values.content = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
    variables: {
      chatId: props.route.params.chatId,
      recipientUserId: "",
      content: content,
    },
  });

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "Hello world",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages) =>
    // {
    // GiftedChat.append(previousMessages, messages)
    console.log("here", messages[messages.length - 1].text);
    setContent(messages[messages.length - 1].text);
    addMessage();
    // }
    // );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  let messagesList = [];
  let msgObj = {};
  if (!loading && messages) {
    console.log("messages", messages);
    messagesList = messages.map((msg) => {
      msgObj = {
        _id: msg.id,
        text: msg.content,
        user: {
          _id: msg.user.id,
          name: "React",
          avatar: "https://facebook.github.io/react/img/logo_og.png",
        },
      };
      return msgObj;
    });
  }

  return (
    <GiftedChat
      messages={messagesList}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
