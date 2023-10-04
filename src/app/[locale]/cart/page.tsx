"use client";
import { useCart } from "@/app/context/CartContext";
import Cart from "./components/Cart";
import { useContext } from "react";
import { GrantsContext } from "@/app/context/GrantContext";

export default async function CartPage() {
  const { isInCart } = useCart();
  const { grants } = useContext(GrantsContext);

  const filteredGrants = grants.filter((grant) => isInCart(grant.id));
  return <Cart cartItems={filteredGrants} />;
}
