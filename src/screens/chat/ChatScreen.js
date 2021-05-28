import React, { useContext, useState } from "react";
import { FlatList, View, Text } from "react-native";

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../../styles/MessagesStyles";

import { GET_USER_CHATS, ADD_MESSAGE } from "../../util/graphql";
import { AuthContext } from "../../context/auth";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useForm } from "../../util/hooks";

const ChatScreen = (props) => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { loading, data } = useQuery(GET_USER_CHATS);
  const { getChats: chats } = data ? data : [];
  const [currentChat, setCurrentChat] = useState({
    id: "",
    users: [{ seller: { username: "" } }],
  });
  const [isChange, setIsChange] = useState(false);

  // const setChat = (chat) => {
  //   setCurrentChat(chat);
  //   setIsChange(true);
  // };
  // if (
  //   props.selectedChat.id &&
  //   currentChat.id !== props.selectedChat.id &&
  //   !isChange
  // )

  const receiver = (users) => {
    let userReceiver;
    if (users[0].id !== user.id) {
      userReceiver = users[0];
    } else {
      userReceiver = users[1];
    }
    return userReceiver;
  };

  let markup = (
    <Container>
      <View>
        <Text>Loading Chats...</Text>
      </View>
    </Container>
  );

  if (!loading) {
    console.log("chat", chats);
    markup = (
      <Container>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                props.navigation.navigate("Message Screen", {
                  username: receiver(item.users).seller.username,
                  chatId: item.id,
                })
              }
            >
              <UserInfo>
                <UserImgWrapper>
                  <UserImg
                    source={{
                      uri: receiver(item.users).seller.avatar
                        ? receiver(item.users).seller.avatar
                        : "https://react.semantic-ui.com/images/avatar/large/molly.png",
                    }}
                  />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{receiver(item.users).seller.username}</UserName>
                    {/* <PostTime>{item.sentAt}</PostTime> */}
                  </UserInfoText>
                  <MessageText>{item.lastMsg}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
  }
  return markup;
};

export default ChatScreen;
