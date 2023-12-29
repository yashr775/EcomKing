import { atom } from "recoil";
import { CartItem } from "../types/cart";

export const cartItems = atom<CartItem[]>({
  key: "Items",
  default: [],
});
