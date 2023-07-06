"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { MapPinIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { Proposal } from "@/app/types";

export default function Page({ params }: { params: { slug: string } }) {
  const { user, ready, authenticated } = usePrivy();
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal>();

  useEffect(() => {
		getProposal();
	}, []);

  async function getProposal() {
		const { data, error } = await supabase.from("proposals").select().eq("id", params.slug);
		if (data) setProposal(data[0]);
    if(error)
		console.log(error);
	}

  const grant = {
    id: 1,
    author: "Jane Doe",
    title: "Well Project",
    location: "Nammpoak, Togo",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    collaborators: ["John Doe", "Ted Doe"],
    milestones: [
      {
        id: 1,
        title: "Milestone 1 title",
        budget: 2000
      },
      {
        id: 2,
        title: "Milestone 2 title",
        budget: 3000
      },
      {
        id: 3,
        title: "Milestone 3 title",
        budget: 1000
      }
    ],
    budget: 6000
  }

  if (!ready) return null;
	if (ready && !authenticated) {
		router.push("/");
	}

  
  return(
    <div>
      <div className="font-bold mb-6"><a className="text-sky-600" href="/proposals">Proposed Grants</a> / {proposal?.title}</div>
      <div className="text-sm align-middle mb-4"><MapPinIcon className="h-4 inline-block" /> {proposal?.location}</div>
      <div className="text-sm mb-4"><UserCircleIcon className="h-4 inline-block" /> {grant.author}</div>
      <div>
        <span className="text-sm"><UserGroupIcon className="h-4 inline-block" /> list collaborators </span>
        
        <p className="text-sm leading-1 mt-4">{proposal?.description}</p>

        <h3 className="font-bold mt-6 text-sm">Affected Locations</h3>
        <p className="text-sm leading-1 mt-2">{proposal?.affected_locations}</p>

        <h3 className="font-bold mt-6 text-sm">Community Problem</h3>
        <p className="text-sm leading-1 mt-2">{proposal?.community_problem}</p>

        <h3 className="font-bold mt-6 text-sm">Proposed Solution</h3>
        <p className="text-sm leading-1 mt-2">{proposal?.proposed_solution}</p>

        <h3 className="font-bold mt-6 text-sm">Key Players</h3>
        <p className="text-sm leading-1 mt-2">{proposal?.key_players}</p>
      </div>
      <h3 className="font-bold mt-6 mb-5">Milestones</h3>
      {grant.milestones.map((milestone) => (
        <div key={milestone.id} className="mt-3 mb-3">
          {milestone.title}: ${milestone.budget}
        </div>
      ))}
      <div className="italic mt-6">Total Budget: {grant.budget}</div>
    </div>
    
  )
}