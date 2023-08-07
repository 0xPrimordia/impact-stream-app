"use client";
import React from "react";
import { collaborator_names_with_author, truncate } from "@/app/utils";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FullProposal } from "@/app/types";

function ProposalCard({ proposal }: { proposal: FullProposal}) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/proposals/${proposal.id}`)}>
      <h3 className="font-bold mb-1 text-lg">{proposal.title}</h3>
      <div className="text-sm align-middle">
       <MapPinIcon className="h-4 inline-block" /> {proposal.location}
      </div>
      <p className="text-sm mt-2 mb-1 leading-1">
       {proposal.summary ? truncate(proposal.summary, 200) : ""}
      </p>
      <span className="text-sm">
       {proposal?.collaborators &&
        collaborator_names_with_author(proposal?.collaborators, proposal?.author)}
      </span>
    </div>
  );
}

export default ProposalCard;