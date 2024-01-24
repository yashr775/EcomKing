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
  key: "shippingAddress",
  default: defaultShippingAddress,
});

export const paymentMethod = atom<string>({
  key: "paymentMethod",
  default: "",
});

export const isAuthenticated = atom<boolean>({
  key: "isAuthenticated",
  default: false,
});

export const theme = atom<string>({ key: "theme", default: "Light" });

export interface PaymentAmount {
  itemsAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
}

const defaultPaymentAmount: PaymentAmount = {
  itemsAmount: 0,
  taxAmount: 0,
  shippingAmount: 0,
  totalAmount: 0,
};

export const amountDetails = atom<PaymentAmount>({
  key: "amountDetails",
  default: defaultPaymentAmount,
});
