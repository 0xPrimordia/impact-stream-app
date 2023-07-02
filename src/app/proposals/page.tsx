'use client'
import React, { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline"
import { useRouter } from 'next/navigation'
import { supabase } from "../../../lib/supabase-client";
import { Proposal } from "../types";
import { usePrivy } from "@privy-io/react-auth";

export default function Proposals() {
  const { user, authenticated } = usePrivy();
	const router = useRouter();
	if (!authenticated) {
		router.push("/");
	}
  const [proposals, setProposals] = useState<Proposal[]>([]);
  

    useEffect(() => {
      getProposals();
    }, []);

    async function getProposals() {
      const { data } = await supabase.from("proposals").select();
      if(data)
      setProposals(data);
    }

  return (
    <div className="mb-14">
      <h3 className="font-bold mb-6">Proposed Grants</h3>
      {proposals && proposals.map((grant) => (
        <div onClick={() => router.push(`/proposals/${grant.id}`)} className="mb-4">
          <h3 className="font-bold mb-1 text-lg">{grant.title}</h3>
          <div className="text-sm align-middle"><MapPinIcon className="h-4 inline-block" /> {grant.location}</div>
          <p className="text-sm mt-2 mb-1 leading-1">{grant.description}</p>
          {//grant.collaborators.map((user, index) => (
            <>
              {//(index+1) === grant.collaborators.length && (
                <span className="text-sm"><a className="text-sky-600" href="#">{/*user*/}</a></span>
              /*)*/}
              {//(index+1) !== grant.collaborators.length && (
                <span className="text-sm"><a className="text-sky-600" href="#">{/*user*/}</a>, </span>
              /*)*/}
            </>
          /*))*/}
        </div>
      ))}
      <div className="fixed bottom-4 right-0 left-0 bg-white p-5 z-0">
        <button onClick={() => router.push("/proposals/write")} className="w-full border border-slate-400 rounded leading-10 font-bold">Write Proposal</button>
      </div>
    </div>
  )
}
