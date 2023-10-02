"use client";

import { SummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import useCheckTokens from "../../hooks/useCheckTokens";
import { getSupabaseClient } from "../../../../../lib/supabase";
import { GrantList } from "../../components/GrantList";

// todo: list all grants for user to select from and add to cart

const Grant = () => {
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  useEffect(() => {
    if (isAccessTokenValid) getGrants();
  }, [isAccessTokenValid]);

  async function getGrants() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setGrants(data);
    if (error) console.error(error);
  }
  const t = useTranslations("My Grants");

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      <GrantList grants={grants} />
    </div>
  );
};

export default Grant;
