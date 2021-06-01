import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@apollo/react-hooks";
// import { IconButton } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";

import { ADD_PRODUCT_TO_WISHLIST, GET_WISHLIST } from "../../util/graphql";

function WishlistButton({ user, product }) {
  const [wishlisted, setWishlisted] = useState(false);

  console.log("here", product.wishlistedBy);

  useEffect(() => {
    if (
      user.user &&
      product.wishlistedBy.find((wishlist) => wishlist.userId === user.user.id)
    ) {
      setWishlisted(true);
    } else {
      setWishlisted(false);
    }
  }, [user.user, product.wishlistedBy]);

  const [errors, setErrors] = useState({});

  const { loading, data, refetch } = useQuery(GET_WISHLIST);
  let { getWishlist: wishlist } = data ? data : [];

  const [wishlistProduct] = useMutation(ADD_PRODUCT_TO_WISHLIST, {
    variables: { productId: product.id },
    update() {
      refetch();
      // console.log("ini result", result.data);
      // const data = proxy.readQuery({
      //   query: GET_PRODUCTS_CART,
    },

    //   proxy.writeQuery({
    //     query: GET_PRODUCTS_CART,
    //     data: {
    //       getProductsCart: [
    //         result.data.editProductsInCart,
    //         ...data.getProductsCart,
    //       ],
    //     },
    //   });
    //   setEditProductQty(false);
    // },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  const wishlistButton = user.user ? (
    wishlisted ? (
      <Entypo name="heart" size={30} color="red" />
    ) : (
      <Entypo name="heart-outlined" size={30} color="red" />
    )
  ) : (
    <Entypo name="heart-outlined" size={30} color="red" />
  );
  return (
    <TouchableOpacity onPress={user.user ? wishlistProduct : ""}>
      {/* <TouchableOpacity onPress={() => console.log("pressed")}> */}
      {wishlistButton}
    </TouchableOpacity>
  );
}

export default WishlistButton;
