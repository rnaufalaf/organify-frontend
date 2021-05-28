import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      buyer {
        id
        name
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        email: $email
        name: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      buyer {
        id
        name
      }
      seller {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      buyer {
        id
        name
        avatar
      }
      seller {
        id
        username
        avatar
        description
      }
    }
    getCities {
      city_id
      city_name
      postal_code
      type
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateBuyerProfile(
    $avatar: String
    $name: String!
    $email: String!
    $phone: String!
    $cityName: String!
    $cityId: String!
    $district: String!
    $postalCode: String!
    $detail: String!
  ) {
    updateBuyerProfile(
      updateBuyerInput: {
        avatar: $avatar
        name: $name
        email: $email
        phone: $phone
        address: {
          cityName: $cityName
          cityId: $cityId
          district: $district
          postalCode: $postalCode
          detail: $detail
        }
      }
    ) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      token
      buyer {
        id
        name
        avatar
      }
    }
  }
`;

export const UPDATE_SELLER_PROFILE = gql`
  mutation updateSellerProfile(
    $avatar: String
    $username: String!
    $description: String!
  ) {
    updateSellerProfile(
      updateSellerInput: {
        avatar: $avatar
        username: $username
        description: $description
      }
    ) {
      id
      token
      seller {
        id
        avatar
        username
        description
        createdAt
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($productId: ID!) {
    getProduct(productId: $productId) {
      id
      name
      price
      description
      category
      benefits
      method
      stock
      images {
        downloadUrl
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    getProducts {
      id
      name
      price
      category
      description
      benefits
      method
      stock
      images {
        downloadUrl
      }
      user {
        id
        seller {
          id
          username
        }
      }
      wishlistedBy {
        id
        userId
        createdAt
      }
    }
  }
`;

export const GET_SELLER_PRODUCTS = gql`
  query ($userId: ID!) {
    getSellerProducts(userId: $userId) {
      id
      name
      price
      stock
      createdAt
      description
      category
      method
      benefits
      weight
      images {
        id
        downloadUrl
      }
      wishlistedBy {
        id
        userId
        createdAt
      }
      user {
        id
        seller {
          id
          username
          avatar
        }
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $benefits: String!
    $method: String!
    $category: String!
    $price: Int!
    $weight: Int!
    $stock: Int!
  ) {
    addProduct(
      productInput: {
        name: $name
        description: $description
        benefits: $benefits
        method: $method
        category: $category
        price: $price
        weight: $weight
        stock: $stock
        images: [{ downloadUrl: "" }]
      }
    ) {
      id
      name
      category
      benefits
      description
      method
      price
      stock
      weight
      images {
        downloadUrl
      }
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $name: String!
    $category: String!
    $description: String!
    $method: String!
    $benefits: String!
    $price: Int!
    $stock: Int!
    $weight: Int!
    $productId: ID!
  ) {
    updateProduct(
      productId: $productId
      productInput: {
        name: $name
        category: $category
        description: $description
        method: $method
        benefits: $benefits
        price: $price
        stock: $stock
        weight: $weight
        images: [{ downloadUrl: "" }]
      }
    ) {
      id
      name
      category
      description
      benefits
      method
      price
      stock
      weight
      images {
        downloadUrl
      }
      createdAt
      wishlistedBy {
        id
        userId
        createdAt
      }
      user {
        id
        seller {
          username
          avatar
          description
          createdAt
          id
        }
      }
    }
  }
`;

export const GET_WISHLIST = gql`
  {
    getWishlist {
      id
      name
      price
      createdAt
      description

      images {
        id
        downloadUrl
      }
      wishlistedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityId
          cityName
        }
        seller {
          id
          username
        }
      }
    }
  }
`;

export const ADD_PRODUCT_TO_WISHLIST = gql`
  mutation addToWishlist($productId: ID!) {
    addToWishlist(productId: $productId) {
      id
      wishlistedBy {
        id
        userId
        createdAt
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart(
    $productId: ID!
    $productQty: Int!
    $isChecked: Boolean!
  ) {
    addProductToCart(
      productId: $productId
      productQty: $productQty
      isChecked: $isChecked
    ) {
      id
      productQty
      createdAt
      isChecked
    }
  }
`;
export const EDIT_PRODUCTS_IN_CART = gql`
  mutation editProductsInCart(
    $productId: ID!
    $productQty: Int!
    $isChecked: Boolean!
  ) {
    editProductsInCart(
      productId: $productId
      productQty: $productQty
      isChecked: $isChecked
    ) {
      productQty
      createdAt
      isChecked
    }
  }
`;

export const DELETE_PRODUCT_FROM_CART = gql`
  mutation deleteProductFromCart($cartId: ID!) {
    deleteProductFromCart(cartId: $cartId)
  }
`;

export const ADD_CHECKLIST_TO_CART = gql`
  mutation addChecklistToCart($productIds: [ID]!, $isChecked: Boolean!) {
    addChecklistToCart(
      checkedCart: { productIds: $productIds, isChecked: $isChecked }
    )
  }
`;

export const GET_PRODUCT_IN_CART = gql`
  query ($productId: ID!) {
    getProductInCart(productId: $productId) {
      id
      createdAt
      productQty
      product {
        id
        user {
          id
          seller {
            id
            username
          }
        }
      }
      isChecked
      user {
        id
        buyer {
          id
          name
        }
        seller {
          id
          username
        }
      }
    }
  }
`;

export const GET_PRODUCTS_CART = gql`
  {
    getProductsCart {
      id
      product {
        id
        name
        price
        stock
        images {
          downloadUrl
        }
        user {
          id
          seller {
            id
            username
          }
        }
      }
      user {
        id
        buyer {
          id
          name
        }
        seller {
          id
          username
        }
      }
      isChecked
      productQty
      createdAt
    }
  }
`;

export const GET_USER_CHATS = gql`
  {
    getChats {
      id
      users {
        id
        seller {
          id
          username
        }
      }
      lastMsg
    }
  }
`;

export const GET_USER_MESSAGES = gql`
  query ($chatId: ID!) {
    getMessages(chatId: $chatId) {
      id
      content
      sentAt
      user {
        id
        buyer {
          id
          name
        }
      }
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription ($chatId: ID!) {
    newMessage(chatId: $chatId) {
      id
      content
      sentAt
      user
      item {
        id
        name
        price
        image
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $recipientUserId: ID!, $content: String!) {
    addMessage(
      messageInput: {
        chatId: $chatId
        recipientUserId: $recipientUserId
        content: $content
      }
    ) {
      id
      user
      content
      images {
        id
        downloadUrl
      }
      sentAt
    }
  }
`;
