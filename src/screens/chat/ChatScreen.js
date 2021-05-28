import React, { useContext, useState } from "react";
import { FlatList, View } from "react-native";

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
  console.log("chats", chats);
  {
    !loading ? (
      <Container>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                props.navigation.navigate("Chat Screen", {
                  userName: item.userName,
                })
              }
            >
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    ) : (
      <Container>
        <View>
          <Text>Loading Chats...</Text>
        </View>
      </Container>
    );
  }
};

export default ChatScreen;
