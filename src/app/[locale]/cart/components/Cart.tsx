"use client";

import { SummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "../../components/AddRemoveCartButton";

const Cart = ({ cartItems }: { cartItems: SummaryProposal[] }) => {
  const t = useTranslations("My Cart");

  return (
    <div>
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

const CartItem = ({ item }: { item: SummaryProposal }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-x-4 border rounded-md shadow-sm bg-gray-50 p-2 mt-2">
      <div className="flex flex-row items-center justify-between cursor-pointer">
        <div
          className="flex text-sm font-medium leading-6 text-gray-900 border-b-sky-600"
          onClick={() => {
            router.push(`/proposals/${item.id}`);
          }}
        >
          {item.title}
        </div>
        <input
          type="number"
          className="border rounded-md shadow-sm bg-gray-50 p-2 mt-2"
          placeholder="0"
        />
        <AddRemoveCartButton grantId={item.id} />
      </div>
    </div>
  );
};

const CartList = ({ cartItems }: { cartItems: SummaryProposal[] }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-center italic mb-4">
        You have {cartItems.length}
        {cartItems.length > 1 ? " items " : " item "} in your cart.
      </p>
      {cartItems.map((item, index) => (
        <div
          key={"cartItem-" + index}
          className="border rounded-md p-2 m-1 shadow-sm mb-2"
        >
          <CartItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default Cart;
