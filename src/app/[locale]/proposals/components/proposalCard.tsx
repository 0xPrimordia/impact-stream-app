import React from "react";
import { truncate } from "@/app/utils";
import { MapPinIcon } from "@heroicons/react/24/outline";

function ProposalCard({proposal}) {
  return (
    <div>
      <h3 className="font-bold mb-1 text-lg">{proposal.title}</h3>
      <div className="text-sm align-middle">
       <MapPinIcon className="h-4 inline-block" /> {proposal.location}
      </div>
      <p className="text-sm mt-2 mb-1 leading-1">
       {proposal.summary ? truncate(proposal.summary, 200) : ""}
      </p>
      <span className="text-sm">
        { `${proposal?.author.name} ${proposal?.author.family_name},` }
       {proposal?.collaborators &&
        proposal?.collaborators
         // @ts-ignore
         .map((user) => user?.name + " " + user?.family_name)
         .join(", ")}
      </span>
    </div>
  );
}

export default ProposalCard;