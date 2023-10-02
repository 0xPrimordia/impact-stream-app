"use client";

import { SummaryProposal } from "@/app/types";
import router from "next/router";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, usePrivy } from "@privy-io/react-auth";
import useCheckTokens from "../../hooks/useCheckTokens";
import { useEffect, useState } from "react";
import { getSupabaseClient, logoutSupabase } from "../../../../../lib/supabase";
import ProposalCard from "./ProposalCard";

export default function Proposal() {
  const { user, ready, authenticated, logout } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const [proposals, setProposals] = useState<SummaryProposal[]>([]);
  useEffect(() => {
    if (isAccessTokenValid) getProposals();
  }, [isAccessTokenValid]);

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
    <div>
      <ProposalList proposals={proposals} user={user} />
    </div>
  );
}

const ProposalList = ({
  proposals,
  user,
}: {
  proposals: SummaryProposal[];
  user: User | null;
}) => {
  const t = useTranslations("Proposals");

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      <div className="mb-14">
        <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
        {/* filter out by author/status and then map the cards */}
        {proposals &&
          proposals
            .filter((p) => user?.id === p.author.id || p.approved === true)
            .map((proposal) => (
              <div className="border rounded-md p-2 m-1 shadow-sm mb-2" key={proposal.id}>
                <ProposalCard key={proposal.id} proposal={proposal} />
              </div>
            ))}
        {proposals.length === 0 && (
          <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
        )}
        {/* Botton button to add new proposal */}
        <div className="fixed bottom-10 right-0 left-0 bg-white p-5 z-0">
          <button
            onClick={() => router.push("/proposals/write")}
            className="w-full border border-slate-400 rounded leading-10 font-bold"
          >
            {t("addProposalButton")}
          </button>
        </div>
      </div>
    </ul>
  );
};
