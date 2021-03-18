import * as React from "react";
import { Searchbar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      clearIcon={() => (
        <FontAwesome name="close" onPress={props.clearIconPressed} />
      )}
      style={{ margin: 10, borderColor: "gainsboro" }}
      inputStyle={{ backgroundColor: "white", marginVertical: 3 }}
    />
  );
};

export default SearchBar;
