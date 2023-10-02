"use client";

import { useTranslations } from "next-intl";

const Cart = ({ cartItems }: CartListProps) => {
  const t = useTranslations("My Cart");

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      {cartItems ? (
        <div className="text-center">
          <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
        </div>
      ) : (
        <CartList cartItems={cartItems} />
      )}
    </div>
  );
};

const CartItem = () => {
  return (
    // todo: add grant name, grant amount, and remove button
    <div>Grant to fund</div>
  );
};

const CartList = ({ cartItems }: CartListProps) => {
  return (
    <div className="text-center">
      <p className="text-sm text-center italic mb-4">
        You have 1 item in your cart.
      </p>
      {/* todo: map the cart items here */}
      <div className="border rounded-md p-2 m-1 shadow-sm mb-2">
        <CartItem />
      </div>
    </div>
  );
};

export interface CartListProps {
  cartItems: any[];
}

export default Cart;
