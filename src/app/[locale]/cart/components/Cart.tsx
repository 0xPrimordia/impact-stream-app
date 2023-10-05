"use client";

import { SummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "../../components/AddRemoveCartButton";
import { usePrivy } from "@privy-io/react-auth";
import { getChain, getChainId } from "../../config/network.config";
import { getMaxVoiceCreditsPerAllocator } from "../../utils/alloContract";

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

const CartList = async ({ cartItems }: { cartItems: SummaryProposal[] }) => {
  const { user, authenticated, ready, logout } = usePrivy();

  if (!ready || !user || !user.wallet) return null;
  const chainId = getChainId();

  console.log("chainId", chainId);

  const voiceCreditsLeft = await getMaxVoiceCreditsPerAllocator(chainId);

  console.log("voiceCreditsLeft", voiceCreditsLeft);
  console.log("address", user?.wallet!.address!);

  return (
    <div className="text-center">
      <p className="text-sm text-center italic mb-4">
        You have {cartItems.length}
        {cartItems.length > 1 ? " items " : " item "} in your cart.
      </p>
      <p>You have x voice credits left</p>
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
