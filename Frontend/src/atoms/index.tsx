import { atom } from "recoil";
import { CartItem } from "../types/cart";
import { shippingaddress } from "../types/shippingAddress";

export const cartItems = atom<CartItem[]>({
  key: "Items",
  default: [],
});

export const progress = atom<string>({
  key: "ProgressKey",
  default: "25%",
});

const defaultShippingAddress: shippingaddress = {
  fullname: "",
  address: "",
  city: "",
  country: "",
  postalcode: "",
};

export const shippingAddress = atom<shippingaddress>({
  key: "shippingAddressKey",
  default: defaultShippingAddress,
});

export const paymentMethod = atom<string>({
  key: "paymentMethodKey",
  default: "",
});
