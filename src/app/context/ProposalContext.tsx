"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TSummaryProposal } from "../types";
import { getSupabaseClient } from "../../../lib/supabase";
import useCheckTokens from "../[locale]/hooks/useCheckTokens";

export const ProposalContext = createContext({
  proposals: [] as TSummaryProposal[],
  setProposals: (proposals: TSummaryProposal[]) => {},
});

export const ProposalsProvider = ({ children }: { children: any[] }) => {
  const { isAccessTokenValid } = useCheckTokens();
  const [proposals, setProposals] = useState<TSummaryProposal[]>([]);

  async function getProposals() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );

    if (data) setProposals(data);
    if (error) console.error(error);

    console.log("proposals", data);
  }

  useEffect(() => {
    if (isAccessTokenValid) getProposals();
  }, [isAccessTokenValid]);

  return (
    <ProposalContext.Provider
      value={{
        proposals,
        setProposals,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposalContext = () => {
  const context = useContext(ProposalContext);
  if (context === undefined)
    throw new Error(
      `useProposalContext must be used within a ProposalContextProvider`
    );

  return context;
};
