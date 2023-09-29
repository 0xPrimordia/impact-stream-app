"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";
import { SummaryProposal } from "@/app/types";
import { usePrivy } from "@privy-io/react-auth";
import { useTranslations } from "next-intl";
import useCheckTokens from "../hooks/useCheckTokens";
import ProposalCard from "./components/proposalCard";

export default function Proposals() {
  const { user, ready, authenticated, logout } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const [proposals, setProposals] = useState<SummaryProposal[]>([]);
  useEffect(() => {
    if (isAccessTokenValid) getProposals();
  }, [isAccessTokenValid]);
  const t = useTranslations("Proposals");

  async function getProposals() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setProposals(data);
    if (error) console.log(error);
  }

  if (!ready) return null;
  if (ready && !authenticated) {
    router.push("/");
  }
  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  return (
    <div className="mb-14">
      <h3 className="font-bold mb-6">{t("heading")}</h3>
      {proposals &&
        proposals
          .filter((p) => user?.id === p.author.id || p.approved === true)
          .map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
      {proposals.length === 0 && (
        <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
      )}
      <div className="fixed bottom-4 right-0 left-0 bg-white p-5 z-0">
        <button
          onClick={() => router.push("/proposals/write")}
          className="w-full border border-slate-400 rounded leading-10 font-bold"
        >
          {t("addProposalButton")}
        </button>
      </div>
    </div>
  );
}
