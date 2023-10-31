"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { DraftProposal } from "../types";
import { getSupabaseClient } from "../../../lib/supabase";
import useCheckTokens from "../[locale]/hooks/useCheckTokens";

export const DraftContext = createContext({
  draft: {} as DraftProposal | undefined,
  setDraft: (draft: DraftProposal) => {},
});

export const DraftProvider = ({ children }: { children: any }) => {
  const { isAccessTokenValid } = useCheckTokens();
  const [draft, setDraft] = useState<DraftProposal>();

  async function getDraft() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposal_draft_with_collaborators"
    );
    if (data) setDraft(data);
    if (error) console.error(error);

    console.log("draft", draft);
  }

  useEffect(() => {
    if (isAccessTokenValid) getDraft();
  }, [isAccessTokenValid]);

  return (
    <DraftContext.Provider
      value={{
        draft,
        setDraft,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
}