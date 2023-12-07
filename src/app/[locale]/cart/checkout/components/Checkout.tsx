"use client";

import { useCart } from "@/app/context/CartContext";
import { useTranslations } from "next-intl";

export default async function Checkout() {
  const context = useCart();
  const cartItems = context.cartItems;
  const t = useTranslations("Checkout");

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
    </div>
  );
}
