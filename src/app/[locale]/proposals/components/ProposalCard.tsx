"use client";

import React, { useEffect, useState } from "react";
import {
  collaborator_names_with_author,
  truncateDescription,
} from "@/app/utils";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { IProposalCardProps, TSummaryProposal } from "@/app/types";
import AddRemoveCartButton from "../../cart/components/AddRemoveCartButton";
import { getVoiceCreditsCastByAllocatorToRecipient } from "../../utils/alloContract";
import { usePrivy } from "@privy-io/react-auth";

// function ProposalCard({ proposal }: { proposal: TSummaryProposal }) {
//   const router = useRouter();

//   return (
//     <div
//       className="flex flex-col gap-x-4 bg-gray-50 p-2"
//       onClick={() => router.push(`/proposals/${proposal.id}`)}
//     >
//       <div className="flex flex-row items-center justify-between">
//         <h3 className="font-bold mb-1 text-lg">{proposal.title}</h3>{" "}
//       </div>
//       <div className="text-sm align-middle">
//         <MapPinIcon className="h-4 inline-block" /> {proposal.location}
//       </div>
//       <div className="mt-2">
//         {proposal.summary
//           ? truncateDescription(proposal.summary)
//           : "No summary provided."}
//       </div>
// <span className="text-sm mt-2">
//   {proposal?.collaborators &&
//     collaborator_names_with_author(proposal?.collaborators, proposal?.author)}
// </span>
//     </div>
//   );
// }

const ProposalCard = ({
  proposal,
  showStatus,
  showAction = false,
  showAllocation,
}: IProposalCardProps) => {
  const router = useRouter();
  const { user } = usePrivy();
  const [votesCastedToRecipient, setVotesCastedToRecipient] =
    useState<number>(0);

  useEffect(() => {
    const load = async () => {
      setVotesCastedToRecipient(
        await getVoiceCreditsCastByAllocatorToRecipient(
          user?.wallet?.address!,
          proposal.allo_recipient_id!
        )
      );
    };
    load();
  }, [user?.wallet!]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-x-4 p-2 mt-2">
      <div
        className="justify-between cursor-pointer mb-2"
        onClick={() => {
          router.push(`/proposals/${proposal.id}`);
        }}
      >
        <div className="flex">
          <h3 className="text-lg font-bold leading-6 text-gray-900">
            {proposal.title}
          </h3>
          <div className="ml-auto">
            {showAction && <AddRemoveCartButton grantId={proposal.id} />}
          </div>
        </div>

        <span className="text-sm">
          <MapPinIcon className="h-5 inline-block" /> {proposal.location}
        </span>
      </div>
      <div className="mt-1 text-sm">
        {proposal.summary
          ? truncateDescription(proposal.summary)
          : "No summary provided."}
      </div>
      <div>
        <span className="text-sm mt-2">
          {proposal?.collaborators &&
            collaborator_names_with_author(proposal?.collaborators, proposal?.author)}
        </span>
      </div>
      <div>
        <span className="text-xs mt-2">
          Allocations: {votesCastedToRecipient ?? 0}
        </span>
      </div>
      {showStatus && (
        <div
          className={`flex flex-row items-center justify-${
            !showStatus ? "end" : "between"
          } p-2 mt-2`}
        >
          <span>{proposal.approved ? "Approved ✅" : "Pending 🟡"}</span>
        </div>
      )}
      <div className="mt-2">
        <span className="text-sm font-bold">
          {proposal.author.name} {proposal.author.family_name}
        </span>
        {proposal.collaborators &&
          proposal.collaborators?.map((user) => (
            <span
              key={proposal.id + "-" + user.family_name}
              className="text-sm font-bold"
            >
              , {user.name} {user.family_name}
            </span>
          ))}
        <div className="flex justify-end">
          {showAction && <AddRemoveCartButton grantId={proposal.id} />}
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
