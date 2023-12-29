import { atom } from "recoil";
import Product from "../types/products";

export const cartItems = atom<Product[]>({
  key: "Items",
  default: [],
});
