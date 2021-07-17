import React from "react";
import { View, ScrollView } from "react-native";
import { Card, Avatar, Text, Divider } from "react-native-paper";
import { Rating } from "react-native-ratings";

const ProductReviewCard = (props) => {
  const review = props.review;
  console.log(props);

  return (
    <View>
      <Divider />
      <Card>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Card.Content
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Avatar.Image source={{ uri: review.user.buyer.avatar }} />
            <Card.Title
              title={review.user.buyer.name}
              titleStyle={{ fontSize: 18, fontWeight: "bold" }}
            />
            <Rating
              startingValue={review.score}
              type="star"
              readonly={true}
              imageSize={18}
            />
          </Card.Content>
          <Card.Content style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 18 }}>{review.body}</Text>
          </Card.Content>
        </View>
      </Card>
      <Divider />
    </View>
  );
};

export default ProductReviewCard;
