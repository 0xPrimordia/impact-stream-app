"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  MapPinIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { FullProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { EditProposalForm } from "../../components/EditProposalForm";

export default function Page({ params }: { params: { slug: string } }) {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const [proposal, setProposal] = useState<FullProposal>();
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const t = useTranslations("Proposal Details");

  useEffect(() => {
    getProposal();
  }, [user]);

  useEffect(() => {
    if (user?.id === proposal?.author?.id) {
      setIsAuthor(true);
    }
  }, [user, proposal]);

  async function getProposal() {
    const { data, error } = await supabase
      .rpc("get_proposal_with_collaborators", { proposal_id: params.slug })
      .single();
    if (data) setProposal(data);
    if (error) console.log(error);
  }

  if (!ready) return null;
  if (ready && !authenticated) {
    router.push("/");
  }
  return (
    <>
      {isEditing && proposal && (
        <EditProposalForm
          reloadData={getProposal}
          setIsEditing={setIsEditing}
          proposalId={params.slug}
          proposal={proposal}
        />
      )}

      {!isEditing && (
        <div>
          <div className="font-bold mb-6">
            <a className="text-sky-600" href="/proposals">
              {t("heading")}
            </a>{" "}
            / {proposal?.title}{" "}
            {isAuthor && (
              <>
                <PencilSquareIcon
                  onClick={() => setIsEditing(true)}
                  className="h-5 inline-block ml-2"
                />
              </>
            )}
          </div>
          <div className="text-sm align-middle mb-4">
            <MapPinIcon className="h-4 inline-block" /> {proposal?.location}
          </div>
          <div className="text-sm mb-4">
            <UserCircleIcon className="h-4 inline-block" />{" "}
            {proposal?.author?.name + " " + proposal?.author?.family_name}
          </div>
          <div>
            <span className="text-sm">
              {proposal?.collaborators.length > 0 && (
                <UserGroupIcon className="h-4 inline-block" />
              )}{" "}
              {proposal?.collaborators &&
                proposal?.collaborators
                  .map((user) => user.name + " " + user.family_name)
                  .join(", ")}
            </span>
            <h3 className="font-bold mt-6 text-sm">{t("summary")}</h3>
            <p className="text-sm leading-1 mt-4">{proposal?.summary}</p>

            <h3 className="font-bold mt-6 text-sm">{t("locationsAffected")}</h3>
            <p className="text-sm leading-1 mt-2">
              {proposal?.affected_locations}
            </p>

            <h3 className="font-bold mt-6 text-sm">{t("communityProblem")}</h3>
            <p className="text-sm leading-1 mt-2">
              {proposal?.community_problem}
            </p>

            <h3 className="font-bold mt-6 text-sm">{t("proposedSolution")}</h3>
            <p className="text-sm leading-1 mt-2">
              {proposal?.proposed_solution}
            </p>

            <h3 className="font-bold mt-6 text-sm">{t("keyPlayers")}</h3>
            <p className="text-sm leading-1 mt-2">{proposal?.key_players}</p>
          </div>
          <h3 className="font-bold mt-6 mb-5">{t("milestones")}</h3>
          {proposal?.project_milestones &&
            Object.values(proposal.project_milestones).map((milestone) => (
              <>
                {milestone.title && (
                  <div key={milestone.title} className="mt-3 mb-3">
                    {milestone.title}: ${milestone.budget}
                  </div>
                )}
              </>
            ))}
          <div className="italic mt-6">
            {t("minimumBudget") + ": " + proposal?.minimum_budget}
          </div>
          <div className="italic mt-6">
            {t("totalBudget") + ": " + proposal?.minimum_budget}
          </div>
        </div>
      )}
    </>
  );
}
