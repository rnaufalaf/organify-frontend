import {
  CHECKOUT_ORDER,
  ADD_ORDER,
  SET_SHIPPING_ORDER,
  ADD_ORDER_IDS,
} from "./types";

export const checkoutItems = (carts, isChange, isChecked) => (dispatch) => {
  dispatch({
    type: CHECKOUT_ORDER,
    payload: {
      carts: carts,
      isChange: isChange,
      isChecked: isChecked,
    },
  });
};
export const setAddOrder = (isAddOrder) => (dispatch) => {
  dispatch({
    type: ADD_ORDER,
    payload: {
      isAddOrder: isAddOrder,
    },
  });
};

export const setShippingOrder = (filter) => (dispatch) => {
  dispatch({
    type: SET_SHIPPING_ORDER,
    payload: filter,
  });
};

export const setOrderIdsWillBePaid = (orderIds) => (dispatch) => {
  dispatch({
    type: ADD_ORDER_IDS,
    payload: {
      orderIds: orderIds,
    },
  });
};
