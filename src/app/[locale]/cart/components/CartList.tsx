"use client";

import { TSummaryProposal } from "@/app/types";
import {
  allocate,
  getMaxVoiceCreditsPerAllocator,
  getVoiceCreditsCastByAllocator,
} from "../../utils/alloContract";
import CartItem from "./CartItem";
import { useTranslations } from "next-intl";
import { useCart } from "@/app/context/CartContext";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect } from "react";

const CartList = ({ cartItems }: { cartItems: TSummaryProposal[] }) => {
  const t = useTranslations("My Cart");
  const { user, ready, sendTransaction } = usePrivy();
  const { allocations } = useCart();

  const [maxVoiceCreditsPerAllocator, setMaxVoiceCreditsPerAllocator] =
    useState(0);
  const [voiceCreditsUsedByAllocator, setVoiceCreditsUsedByAllocator] =
    useState(0);

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
  }, []); // Dependencies array - re-run when user.wallet.address changes

  if (!ready || !user || !user.wallet) return null;

  const onButtonClick = async () => {
    const unsignedTx = allocate(allocations);
    await sendTransaction(unsignedTx);

    window.location.reload();
  };

  return (
    <div className="text-center">
      <p className="text-sm text-center italic mb-4">
        You have {cartItems.length}
        {cartItems.length > 1 ? " items " : " item "} in your cart.
      </p>
      <p>
        You have {maxVoiceCreditsPerAllocator - voiceCreditsUsedByAllocator}{" "}
        voice credits left
      </p>
      <div>
        {cartItems.map((item, index) => (
          <div
            key={"cartItem-" + index}
            className=" border rounded-md shadow-sm bg-gray-50 mb-2"
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
          .reduce((a, b) => a + b, 0) >
          maxVoiceCreditsPerAllocator - voiceCreditsUsedByAllocator && (
          <p className="text-red-500">Error: Not enough voice credits left.</p>
        )}
      </div>
    </div>
  );
};

export default CartList;
