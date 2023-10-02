"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSupabaseClient } from "../../../../../lib/supabase";
import { SummaryProposal } from "@/app/types";
import useCheckTokens from "../../hooks/useCheckTokens";

type CartItem = {
  grant: SummaryProposal;
  amount: number;
};

const Donate = () => {
  // const [buttonText, setButtonText] = useState<string>("togo.impactstream.eth");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  const t = useTranslations("Donate");

  useEffect(() => {
    if (isAccessTokenValid) getGrants();
  }, [isAccessTokenValid]);

  async function getGrants() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setGrants(data);
    if (error) console.log(error);
  }

  const handleAddToCart = () => {};

  const handleRemoveFromCart = () => {};

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      {/* todo: list out the approved/active grants */}
    </div>
  );
};

export default Donate;
