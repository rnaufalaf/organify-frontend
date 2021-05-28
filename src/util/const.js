export const categoryOptions = [
  {
    key: "all",
    text: "All Categories",
    value: "all",
  },
  {
    key: "sayur",
    text: "Sayur",
    value: "sayur",
  },
  {
    key: "buah",
    text: "Buah",
    value: "buah",
  },
];

export const initialFilter = {
  filter: {
    keyword: "",
    category: "",
    city: "",
    minPrice: -1,
    maxPrice: -1,
  },
};

export const initialOrderList = {
  checkoutOrders: [],
  isChange: false,
  isChecked: false,
};
