"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { GrantList } from "../../components/GrantList";
import { DraftList } from "../../components/DraftList";
import { GrantsContext } from "@/app/context/GrantContext";
import { usePrivy } from "@privy-io/react-auth";
import { getSupabaseClient } from "../../../../../lib/supabase";
import { SummaryDraftProposal } from "@/app/types";

const Grant = () => {
  const t = useTranslations("My Grants");
  const { grants } = useContext(GrantsContext);
  const { user } = usePrivy();
  const [drafts, setDrafts] = useState<SummaryDraftProposal[]>([]);

  useEffect(() => {
    getDrafts();
   }, [user]);

  async function getDrafts() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from("proposal_drafts")
      .select()
      .eq("author_id", user?.id);
    if(data)
    setDrafts(data);
  }

  // filter grants by grant.author.id === user.id
  if (!user) return;
  const filteredGrants = grants.filter((grant) => grant.author.id === user!.id);

  return (
    <div>
      <h3 className="font-bold mb-6">{t("heading")}</h3>
      <GrantList grants={filteredGrants} />
      <h3 className="font-bold mb-6">My Draft Proposals</h3>
      <DraftList drafts={drafts} />
    </div>
  );
};

export default Grant;
