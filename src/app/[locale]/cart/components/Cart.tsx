"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/app/context/CartContext";
import { useContext } from "react";
import { GrantsContext } from "@/app/context/GrantContext";
import CartList from "./CartList";

const Cart = () => {
  const { isInCart } = useCart();
  const { grants } = useContext(GrantsContext);
  const cartItems = grants.filter((grant) => isInCart(grant.id));

  const t = useTranslations("My Cart");

  return (
    <div className="mb-10">
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      {cartItems.length == 0 ? (
        <div className="text-center">
          <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
        </div>
      ) : (
        <CartList cartItems={cartItems} />
      )}
    </div>
  );
};

export default Cart;
