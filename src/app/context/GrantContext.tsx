"use client";

import React, { createContext, useEffect, useState } from "react";
import { SummaryProposal } from "../types";
import { getSupabaseClient } from "../../../lib/supabase";
import useCheckTokens from "../[locale]/hooks/useCheckTokens";

export const GrantsContext = createContext({
  grants: [] as SummaryProposal[],
  setGrants: (grants: SummaryProposal[]) => {},
});

export const GrantsProvider = ({ children }: { children: any[] }) => {
  const { isAccessTokenValid } = useCheckTokens();
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  async function getGrants() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setGrants(data);
    if (error) console.error(error);

    console.log("grants", grants);
  }

  useEffect(() => {
    if (isAccessTokenValid) getGrants();
  }, [isAccessTokenValid]);

  return (
    <GrantsContext.Provider
      value={{
        grants,
        setGrants,
      }}
    >
      {children}
    </GrantsContext.Provider>
  );
};
