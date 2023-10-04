"use client";

import React from "react";
import {
  collaborator_names_with_author,
  truncate,
  truncateDescription,
} from "@/app/utils";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FullProposal, SummaryProposal } from "@/app/types";

function ProposalCard({ grant }: { grant: SummaryProposal }) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-x-4 bg-gray-50 p-2"
      onClick={() => router.push(`/proposals/${grant.id}`)}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="font-bold mb-1 text-lg">{grant.title}</h3>{" "}
      </div>
      <div className="text-sm align-middle">
        <MapPinIcon className="h-4 inline-block" /> {grant.location}
      </div>
      <div className="mt-2">
        {grant.summary
          ? truncateDescription(grant.summary)
          : "No summary provided."}
      </div>
      <span className="text-sm mt-2">
        {grant?.collaborators &&
          collaborator_names_with_author(
            grant?.collaborators,
            grant?.author
          )}
      </span>
    </div>
  );
}

export default ProposalCard;
