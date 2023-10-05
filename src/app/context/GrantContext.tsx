"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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

    // // todo: remove this shit
    // data.map((grant: any) => {
    //   grant.approved = true;
    //   return grant;
    // });

    if (data) setGrants(data);
    if (error) console.error(error);

    console.log("grants", data);
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

export const useGrantContext = () => {
  const context = useContext(GrantsContext);
  if (context === undefined)
    throw new Error(
      `useGrantContext must be used within a GrantContextProvider`
    );

  return context;
};
