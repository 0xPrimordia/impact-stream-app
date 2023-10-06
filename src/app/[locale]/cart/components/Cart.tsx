"use client";

import { IAllocationParams, TSummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "../../components/AddRemoveCartButton";
import { usePrivy } from "@privy-io/react-auth";
import {
  allocate,
  getMaxVoiceCreditsPerAllocator,
  getVoiceCreditsCastByAllocator,
  getVoiceCreditsCastByAllocatorToRecipient,
} from "../../utils/alloContract";
import { useCart } from "@/app/context/CartContext";
import { useContext, useEffect, useState } from "react";
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

const CartItem = ({ item }: { item: TSummaryProposal }) => {
  const router = useRouter();
  const { user } = usePrivy();
  const [votes, setVotes] = useState<number>(0);
  const { handleAllocationChange } = useCart();
  const [castedVoiceCredits, setCastedVoiceCredits] = useState<number>(0);
  const onChangeHandler = (e: any) => {
    e.preventDefault();
    setVotes(Number(e.target.value));
    handleAllocationChange(item.allo_recipient_id!, e.target.value);
  };

  if (!user) return null;

  useEffect(() => {
    async () => {
      setVotes(
        await getVoiceCreditsCastByAllocatorToRecipient(
          user!.wallet!.address,
          item.allo_recipient_id!
        )
      );
    };
  }, []);
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
      <div className="flex flex-col sm:flex-row sm:gap-x-4 items-center justify-between">
        <span className="text-sm">
          Casted Voice Credits:{" "}
          <span className="font-semibold">{castedVoiceCredits}</span>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-x-4 items-center justify-between">
        <span className="text-sm">
          Votes casted:{" "}
          <span className="font-semibold">
            {Math.sqrt(castedVoiceCredits).toFixed(2)}
          </span>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-x-4 items-center justify-between">
        <span className="text-sm">
          Votes casted after vote:{" "}
          <span className="font-semibold">
            {Math.sqrt(castedVoiceCredits + votes).toFixed(2)}
          </span>
        </span>
      </div>
    </div>
  );
};

const CartList = ({ cartItems }: { cartItems: TSummaryProposal[] }) => {
  const t = useTranslations("My Cart");
  const { user, ready, sendTransaction } = usePrivy();
  const { allocations } = useCart();

  const [maxVoiceCreditsPerAllocator, setMaxVoiceCreditsPerAllocator] =
    useState(0);
  const [voiceCreditsUsedByAllocator, setVoiceCreditsUsedByAllocator] =
    useState(0);

  if (!ready || !user || !user.wallet) return null;

  useEffect(() => {
    // Fetch maxVoiceCreditsPerAllocator data
    async function fetchMaxVoiceCreditsPerAllocator() {
      try {
        const data = await getMaxVoiceCreditsPerAllocator();
        setMaxVoiceCreditsPerAllocator(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching maxVoiceCreditsPerAllocator:", error);
      }
    }

    // Fetch voiceCreditsUsedByAllocator data
    async function fetchVoiceCreditsUsedByAllocator() {
      try {
        const data = await getVoiceCreditsCastByAllocator(
          user!.wallet!.address
        );
        setVoiceCreditsUsedByAllocator(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching voiceCreditsUsedByAllocator:", error);
      }
    }

    // Call both functions to fetch data
    fetchMaxVoiceCreditsPerAllocator();
    fetchVoiceCreditsUsedByAllocator();
  }, [user.wallet.address]); // Dependencies array - re-run when user.wallet.address changes

  const voiceCreditsLeftByAllocator =
    maxVoiceCreditsPerAllocator - voiceCreditsUsedByAllocator;

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
            <CartItem item={item} />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={onButtonClick}
          className="w-full border border-slate-400 hover:bg-sky-600 rounded-md leading-10 font-bold"
        >
          {t("checkoutButton")}
        </button>
        {Object.values(allocations)
          .map((value) => Number(value))
          .reduce((a, b) => a + b, 0) > voiceCreditsLeftByAllocator && (
          <p className="text-red-500">Error: Not enough voice credits left.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
