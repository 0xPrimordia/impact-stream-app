"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import {
  MapPinIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { FullProposal } from "@/app/types";

export default function Page({ params }: { params: { slug: string } }) {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [proposal, setProposal] = useState<FullProposal>();

  useEffect(() => {
    getProposal();
  }, []);

  async function getProposal() {
    const { data, error } = await supabase
      .from("proposals")
      .select(
        `title,
        location,
        author_id(name, family_name),
        description, 
        affected_locations, 
        community_problem, 
        proposed_solution, 
        project_milestones, 
        key_players, 
        minimum_budget, 
        timeline, 
        users(name, family_name)`
      )
      .eq("id", params.slug)
      .single();
    console.log(data);
    if (data) setProposal(data);
    if (error) console.log(error);
  }

  if (!ready) return null;
  if (ready && !authenticated) {
    router.push("/");
  }

  return (
    <div>
      <div className="font-bold mb-6">
        <a className="text-sky-600" href="/proposals">
          Proposed Grants
        </a>{" "}
        / {proposal?.title}
      </div>
      <div className="text-sm align-middle mb-4">
        <MapPinIcon className="h-4 inline-block" /> {proposal?.location}
      </div>
      <div className="text-sm mb-4">
        <UserCircleIcon className="h-4 inline-block" />{" "}
        {proposal?.author_id?.name + " " + proposal?.author_id?.family_name}
      </div>
      <div>
        <span className="text-sm">
          <UserGroupIcon className="h-4 inline-block" />{" "}
          {proposal?.users && Array.isArray(proposal?.users)
            ? proposal?.users
                .map((user) => user.name + " " + user.family_name)
                .join(", ")
            : proposal?.users.name + " " + proposal?.users.family_name}
        </span>
        <h3 className="font-bold mt-6 text-sm">Description</h3>
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
      {proposal?.project_milestones &&
        Object.values(proposal.project_milestones).map((milestone) => (
          <div key={milestone.title} className="mt-3 mb-3">
            {milestone.title}: ${milestone.budget}
          </div>
        ))}
      <div className="italic mt-6">
        Minimum Budget: {proposal?.minimum_budget}
      </div>
      <div className="italic mt-6">
        Total Budget: {proposal?.minimum_budget}
      </div>
    </div>
  );
}
