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
import { useQuery } from "@apollo/react-hooks";

const ChatScreen = (props) => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_USER_CHATS);
  const { getChats: chats } = data ? data : [];
  const receiver = (users) => {
    let userReceiver;
    if (users[0].id !== user.id) {
      userReceiver = users[0];
    } else {
      userReceiver = users[1];
    }
    return userReceiver;
  };
  console.log(chats, "chats");
  return (
    <>
      {!loading ? (
        <View>
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
                      <UserName>
                        {receiver(item.users).seller.username}
                      </UserName>
                      {/* <PostTime>{item.sentAt}</PostTime> */}
                    </UserInfoText>
                    <MessageText>{item.lastMsg}</MessageText>
                  </TextSection>
                </UserInfo>
              </Card>
            )}
          />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text>No chats detected</Text>
        </View>
      )}
    </>
  );
};

export default ChatScreen;
