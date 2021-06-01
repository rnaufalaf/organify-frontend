import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { ADD_MESSAGE, GET_USER_MESSAGES } from "../../util/graphql";

const MessageScreen = (props) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const { loading, data, refetch } = useQuery(GET_USER_MESSAGES, {
    variables: {
      chatId: props.route.params.chatId,
    },
  });
  let { getMessages: messages } = data ? data : [];
  let messagesList = [];
  let msgObj = {};

  const [addMessage] = useMutation(ADD_MESSAGE, {
    update() {
      refetch();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
    variables: {
      chatId: props.route.params.chatId,
      recipientUserId: user.id,
      content: content,
    },
  });

  useEffect(() => {
    if (content !== "") {
      console.log("content:", content);
      console.log("userId:", user.id);
      console.log("chatId:", props.route.params.chatId);
      addMessage();
    }
  }, [content]);

  const onSend = useCallback((messages = []) => {
    GiftedChat.append(messagesList, messages);
    setContent(messages[messages.length - 1].text);
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

  const getMessageGiftedChat = () => {
    if (!loading && messages) {
      messagesList = messages.map((msg) => {
        let userId = msg.user.id == user.id ? 1 : 2;
        msgObj = {
          _id: msg.id,
          text: msg.content,
          createdAt: Date.parse(msg.sentAt),
          user: {
            _id: userId,
            name: msg.user.buyer.name,
            avatar: "https://placeimg.com/140/140/any",
          },
        };
        return msgObj;
      });
      messagesList.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.createdAt - a.createdAt;
      });
    }
    return messagesList;
  };

  return (
    <GiftedChat
      scrollToBottom
      renderBubble={renderBubble}
      renderSend={renderSend}
      messages={getMessageGiftedChat()}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      alwaysShowSend
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
