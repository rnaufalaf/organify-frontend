import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import { ListItem, Icon } from "native-base";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_REVIEWS } from "../../util/graphql";
import ProductReviewCard from "./ProductReviewCard";

const ProductReviewScreen = (props) => {
  const product = props.route.params.product;
  const [activeChip, setActiveChip] = useState("All");
  const [active, setActive] = useState(-1);
  const { loading, data } = useQuery(GET_PRODUCT_REVIEWS, {
    variables: {
      productId: product.id,
    },
  });

  console.log(product.id);

  const { getProductReviews: reviews } = data ? data : [];

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  var reviewList = [];

  if (reviews && activeChip === "All") {
    reviewList.push(reviews);
  } else if (
    reviews &&
    activeChip === "1" &&
    reviews.find((review) => review.score === 1)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 1));
  } else if (
    reviews &&
    activeChip === "2" &&
    reviews.find((review) => review.score === 2)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 2));
  } else if (
    reviews &&
    activeChip === "3" &&
    reviews.find((review) => review.score === 3)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 3));
  } else if (
    reviews &&
    activeChip === "4" &&
    reviews.find((review) => review.score === 4)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 4));
  } else if (
    reviews &&
    activeChip === "5" &&
    reviews.find((review) => review.score === 5)
  ) {
    reviewList.push(reviews.filter((review) => review.score === 5));
  }

  console.log(reviewList);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Card>
          <Card.Content>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ListItem
                style={{
                  margin: 5,
                  padding: 0,
                  borderRadius: 3,
                  flexDirection: "row",
                }}
              >
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("All")}
                >
                  All
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("1")}
                >
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("2")}
                >
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("3")}
                >
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("4")}
                >
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                </Chip>
                <Chip
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleChip("5")}
                >
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                  <Icon name="star" style={{ color: "yellow", fontSize: 20 }} />
                </Chip>
              </ListItem>
            </ScrollView>
          </Card.Content>
          <Card.Content>
            {!loading ? (
              reviewList.length > 0 ? (
                <Card.Content>
                  {reviewList[0] &&
                    reviewList[0].map((review, index) => (
                      <ProductReviewCard key={index} review={review} />
                    ))}
                </Card.Content>
              ) : (
                <View style={[styles.center]}>
                  <Text>No products found</Text>
                </View>
              )
            ) : (
              <Card>
                <Card.Content>
                  <Text>Loading</Text>
                </Card.Content>
              </Card>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  active: {
    backgroundColor: "green",
  },
  inactive: {
    backgroundColor: "lightgreen",
  },
});

export default ProductReviewScreen;
