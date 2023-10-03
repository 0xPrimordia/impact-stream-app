"use client";

import { useTranslations } from "next-intl";
import { getSupabaseClient } from "../../../../../lib/supabase";
import { useEffect, useState } from "react";
import { SummaryProposal } from "@/app/types";
import useCheckTokens from "../../hooks/useCheckTokens";
import { GrantItem } from "../../components/GrantItem";

const Vote = () => {
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  const t = useTranslations("My Votes");

  async function getGrants() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setGrants(data);
    if (error) console.error(error);
  }

  useEffect(() => {
    if (isAccessTokenValid) getGrants();
  }, [isAccessTokenValid]);

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      <div className="flex flex-col">
        {/* filter out the grants the user voted for? */}
        {grants.map(
          (grant) =>
            grant.approved === true && (
              <GrantItem
                key={grant.id}
                grant={grant}
                showStatus={false}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Vote;
