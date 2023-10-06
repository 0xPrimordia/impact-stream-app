"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import useCheckTokens from "../../hooks/useCheckTokens";
import { useContext } from "react";
import { GrantsContext } from "@/app/context/GrantContext";
import { logoutSupabase } from "../../../../../lib/supabase";
import ProposalList from "./ProposalList";

export default function Proposal() {
  const { ready, authenticated, logout, user } = usePrivy();
  const { isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const { grants } = useContext(GrantsContext);
  
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
    <div>
      <ProposalList grants={grants} />
    </div>
  );
}
