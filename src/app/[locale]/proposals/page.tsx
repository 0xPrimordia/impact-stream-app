"use client";
import React, { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "../../../../lib/supabase-client";
import { SummaryProposal } from "@/app/types";
import { usePrivy } from "@privy-io/react-auth";
import { useTranslations } from "next-intl";
import { truncate } from "@/app/utils";

export default function Proposals() {
  const { user, ready, authenticated } = usePrivy();
  const router = useRouter();
  const [proposals, setProposals] = useState<SummaryProposal[]>([]);
  useEffect(() => {
    getProposals();
  }, []);
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

  return (
    <div className="mb-14">
      <h3 className="font-bold mb-6">{t("heading")}</h3>
      {proposals &&
        proposals.map((proposal) => (
          <div
            key={proposal.id}
            onClick={() => router.push(`/proposals/${proposal.id}`)}
            className="mb-6"
          >
            <h3 className="font-bold mb-1 text-lg">{proposal.title}</h3>
            <div className="text-sm align-middle">
              <MapPinIcon className="h-4 inline-block" /> {proposal.location}
            </div>
            <p className="text-sm mt-2 mb-1 leading-1">
              {proposal.summary ? truncate(proposal.summary, 200) : ""}
            </p>
            <span className="text-sm">
              {proposal?.collaborators &&
                proposal?.collaborators
                  // @ts-ignore
                  .map((user) => user?.name + " " + user?.family_name)
                  .join(", ")}
            </span>
          </div>
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
