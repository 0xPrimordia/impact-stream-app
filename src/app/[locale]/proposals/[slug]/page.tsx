"use client";
import React, { useState, useEffect } from "react";
import { getSupabaseClient, logoutSupabase } from "../../../../../lib/supabase";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
 MapPinIcon,
 UserCircleIcon,
 UserGroupIcon,
} from "@heroicons/react/24/outline";
import { FullProposal, Milestone } from "@/app/types";
import { useTranslations } from "next-intl";
import { EditProposalForm } from "../../components/EditProposalForm";
import useCheckTokens from "../../hooks/useCheckTokens";
import Link from 'next/link'

export default function Page({ params }: { params: { slug: string } }) {
 const { ready, authenticated, user, logout } = usePrivy();
 const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
 const router = useRouter();
 const [proposal, setProposal] = useState<FullProposal>();
 const [isAuthor, setIsAuthor] = useState<boolean>(false);
 const [isEditing, setIsEditing] = useState<boolean>(false);
 const [totalBudget, setTotalBudget] = useState<number>();
 const t = useTranslations("Proposal Details");

 useEffect(() => {
  if (isAccessTokenValid) getProposal();
 }, [user, isAccessTokenValid]);

 useEffect(() => {
  if (user?.id === proposal?.author?.id) {
   setIsAuthor(true);
  }
 }, [user, proposal]);

 useEffect(() => {
  if (proposal && proposal.project_milestones) {
   let calculatedTotalBudget = 0;
   Object.values(proposal.project_milestones).forEach(
    (milestone: Milestone) => {
     calculatedTotalBudget += Number(milestone.budget);
    }
   );
   setTotalBudget(calculatedTotalBudget);
  }
 }, [proposal]);

 function convertShape(obj: any) {
  const convertedObj = {
   title: obj.title || null,
   author: {
    id: obj.author.id || null,
    name: obj.author.name || null,
    family_name: obj.author.family_name || null,
   },
   location: obj.location || null,
   summary: obj.summary || null,
   timeline: obj.timeline || null,
   affected_locations: obj.affected_locations || null,
   community_problem: obj.community_problem || null,
   proposed_solution: obj.proposed_solution || null,
   sustainability: obj.sustainability || null,
   minimum_budget: obj.minimum_budget || null,
   key_players: obj.key_players || null,
   project_milestones: obj.project_milestones || null,
   collaborators: null,
  };

  if (obj.collaborators && Array.isArray(obj.collaborators)) {
   convertedObj.collaborators = obj.collaborators.map(
    (collaborator: any) => ({
     name: collaborator.name || null,
     family_name: collaborator.family_name || null,
    })
   );
  }

  return convertedObj;
 }

 async function getProposal() {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
   .rpc("get_proposal_with_collaborators", { proposal_id: params.slug })
   .single();
  //ts-ignore
  if (data) setProposal(convertShape(data));
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
      <Link className="text-sky-600" href="/proposals">
       {t("heading")}
      </Link>{" "}
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
       {proposal?.collaborators &&
        proposal?.collaborators.length !== 0 && (
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

      <h3 className="font-bold mt-6 text-sm">{t("sustainability")}</h3>
      <p className="text-sm leading-1 mt-2">{proposal?.sustainability}</p>

      <h3 className="font-bold mt-6 text-sm">{t("keyPlayers")}</h3>
      <p className="text-sm leading-1 mt-2">{proposal?.key_players}</p>
     </div>
     <h3 className="font-bold mt-6 mb-5">{t("milestones")}</h3>
     {proposal?.project_milestones &&
      Object.values(proposal.project_milestones).map(
       (milestone: Milestone) => (
        <>
         {milestone.title && (
          <div key={milestone.title} className="mt-3 mb-3">
           {milestone.title}: ${milestone.budget}
          </div>
         )}
        </>
       )
      )}
     <div className="italic mt-6">
      {t("minimumBudget") + ": $" + proposal?.minimum_budget}
     </div>
     <div className="italic mt-6">
      {t("totalBudget") + ": $" + totalBudget}
     </div>
    </div>
   )}
  </>
 );
}
