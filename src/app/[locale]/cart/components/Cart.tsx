"use client";

import { IAllocationParams, TSummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "../../components/AddRemoveCartButton";
import { usePrivy } from "@privy-io/react-auth";
import { getChainId } from "../../config/network.config";
import {
  allocate,
  getMaxVoiceCreditsPerAllocator,
  getVoiceCreditsCastByAllocator,
  getVoiceCreditsCastByAllocatorToRecipient,
} from "../../utils/alloContract";
import { useCart } from "@/app/context/CartContext";
import { useContext, useState } from "react";
import { GrantsContext } from "@/app/context/GrantContext";

const Cart = () => {
  const { isInCart } = useCart();
  const { grants } = useContext(GrantsContext);
  const cartItems = grants.filter((grant) => isInCart(grant.id));

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

const CartItem = ({
  item,
  handler,
}: {
  item: TSummaryProposal;
  handler: (id: string, votes: number) => void;
}) => {
  const router = useRouter();

  const onChangeHandler = (e: any) => {
    e.preventDefault();
    handler(item.allo_recipient_id!, e.target.value);
  };

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
            min="0"
            className="w-24 border rounded-md shadow-sm bg-gray-50 p-2 mt-2"
            placeholder="0"
            onChange={onChangeHandler}
          />
          <AddRemoveCartButton grantId={item.id} />
        </div>
      </div>
    </div>
  );
};

const CartList = async ({ cartItems }: { cartItems: TSummaryProposal[] }) => {
  const t = useTranslations("My Cart");
  const chainId = getChainId();
  const { user, ready, sendTransaction } = usePrivy();
  const allocations: IAllocationParams = {};
  const [error, setError] = useState<string | null>(null);

  if (!ready || !user || !user.wallet) return null;

  const maxVoiceCreditsPerAllocator = await getMaxVoiceCreditsPerAllocator(
    chainId,
  );

  const voiceCreditsUsedByAllocator = 5;
  const voiceCreditsLeftByAllocator =
    maxVoiceCreditsPerAllocator - voiceCreditsUsedByAllocator;

  const handleAllocationChange = (recipientId: string, value: number) => {
    allocations[recipientId] = value;
    const allocationSum = Object.values(allocations)
      .map((value) => Number(value))
      .reduce((a, b) => a + b, 0);

    if (allocationSum > voiceCreditsLeftByAllocator) {
      setError(
        `You cannot allocate more than ${voiceCreditsLeftByAllocator} voice credits`,
      );
    } else {
      setError(null);
    }
  };

  const onButtonClick = async () => {
    const unsignedTx = allocate(allocations);
    await sendTransaction(unsignedTx);
  };

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
            <CartItem item={item} handler={handleAllocationChange} />
          </div>
        ))}
      </div>
      <div>
        <button
          disabled={error !== null}
          onClick={onButtonClick}
          className="w-full border border-slate-400 hover:bg-sky-600 rounded-md leading-10 font-bold"
        >
          {t("checkoutButton")}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Cart;
