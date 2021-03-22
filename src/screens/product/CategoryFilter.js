import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { ListItem } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView horizontal={true} style={{ backgroundColor: "#f2f2f2" }}>
      <ListItem style={{ margin: 5, padding: 0, borderRadius: 3 }}>
        <Chip
          key={1}
          textStyle={styles.text}
          style={[
            styles.center,
            { margin: 5 },
            props.active == -1 ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            props.categoryFilter("all"), props.setActive(-1);
          }}
        >
          All
        </Chip>
        {props.categories.map((item) => (
          <Chip
            key={item._id}
            textStyle={styles.text}
            style={[
              styles.center,
              { margin: 5 },
              props.active == props.categories.indexOf(item)
                ? styles.active
                : styles.inactive,
            ]}
            onPress={() => {
              props.categoryFilter(item._id.$oid);
              props.setActive(props.categories.indexOf(item));
            }}
          >
            {item.name}
          </Chip>
        ))}
      </ListItem>
    </ScrollView>
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

export default CategoryFilter;
