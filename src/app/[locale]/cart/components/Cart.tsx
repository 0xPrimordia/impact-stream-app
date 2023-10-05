"use client";

import { ISummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "../../components/AddRemoveCartButton";
import { usePrivy } from "@privy-io/react-auth";
import { getChainId } from "../../config/network.config";
import {
  getMaxVoiceCreditsPerAllocator,
  getVoiceCreditsCastByAllocator,
  getVoiceCreditsCastByAllocatorToRecipient,
} from "../../utils/alloContract";
import { useCart } from "@/app/context/CartContext";
import { useContext } from "react";
import { GrantsContext } from "@/app/context/GrantContext";

const Cart = () => {
  const { isInCart, cartItems } = useCart();
  const { grants } = useContext(GrantsContext);
  // const cartItems = grants.filter((grant) => isInCart(grant.id));
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

const CartItem = ({ item }: { item: ISummaryProposal }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-x-4 border rounded-md shadow-sm bg-gray-50 p-2 mt-2">
      <div className="flex flex-col sm:flex-row items-center justify-between cursor-pointer">
        <div
          className="flex text-sm font-medium leading-6 text-gray-900 border-b-sky-600"
          onClick={() => {
            router.push(`/proposals/${item.id}`);
          }}
        >
          {item.title}
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-x-4 items-center justify-between">
          <span className="text-sm">Vote Credits &nbsp;</span>
          <input
            id="voteCredits"
            type="number"
            className="w-24 border rounded-md shadow-sm bg-gray-50 p-2 mt-2"
            placeholder="0"
          />
          <AddRemoveCartButton grantId={item.id} />
        </div>
      </div>
    </div>
  );
};

const CartList = async ({ cartItems }: { cartItems: ISummaryProposal[] }) => {
  const router = useRouter();
  const t = useTranslations("My Cart");
  const { user, authenticated, ready, logout } = usePrivy();

  if (!ready || !user || !user.wallet) return null;
  const chainId = getChainId();

  console.log("chainId", chainId);

  const maxVoiceCreditsPerAllocator = await getMaxVoiceCreditsPerAllocator(
    chainId
  );
  const voiceCreditsUsedByAllocator = 5;
  const voiceCreditsLeftByAllocator =
    maxVoiceCreditsPerAllocator - voiceCreditsUsedByAllocator;
  // const voiceCreditsCastByAllocator = await getVoiceCreditsCastByAllocator(
  //   chainId,
  //   user?.wallet!.address!
  // );
  // const voiceCreditsCastByAllocatorToRecipient =
  //   getVoiceCreditsCastByAllocatorToRecipient(
  //     chainId,
  //     user?.wallet!.address!,
  //     cartItems[0].allo_recipient_id
  //   );

  console.log("maxVoiceCreditsPerAllocator", {
    maxVoiceCreditsPerAllocator,
    // voiceCreditsCastByAllocator,
  });
  console.log("address", user?.wallet!.address!);

  return (
    <div className="text-center">
      <p className="text-sm text-center italic mb-4">
        You have {cartItems.length}
        {cartItems.length > 1 ? " items " : " item "} in your cart.
      </p>
      <p>You have {voiceCreditsLeftByAllocator} voice credits left</p>
      <div>
        {cartItems.map((item, index) => (
          <div
            key={"cartItem-" + index}
            className="border rounded-md p-2 m-1 shadow-sm mb-2"
          >
            <CartItem item={item} />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => router.push("/cart/checkout")}
          className="w-full border border-slate-400 hover:bg-sky-600 rounded-md leading-10 font-bold"
        >
          {t("checkoutButton")}
        </button>
      </div>
    </div>
  );
};

export default Cart;
