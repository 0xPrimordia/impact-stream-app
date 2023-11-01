"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/app/context/CartContext";
import { useContext } from "react";
import { ProposalContext } from "@/app/context/ProposalContext";
import CartList from "./CartList";

const Cart = () => {
  const { isInCart } = useCart();
  const { proposals } = useContext(ProposalContext);
  const cartItems = proposals.filter((proposal) => isInCart(proposal.id));

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
