"use client";

import { useTranslations } from "next-intl";
import { GrantList } from "./GrantList";
import { useProposalContext } from "@/app/context/ProposalContext";
import { usePrivy } from "@privy-io/react-auth";
import ProposalList from "../../components/ProposalList";

const Proposal = () => {
  const t = useTranslations("My Proposals");
  const grantsList = useProposalContext().proposals;
  const { user } = usePrivy();

  // filter proposals by proposal.author.id === user.id
  if (!user) return;
  const filteredGrants = grantsList.filter(
    (proposal) => proposal.author.id === user!.id
  );

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      {filteredGrants.length > 0 ? (
        <ProposalList grants={filteredGrants} />
      ) : (
        <div className="text-center">{t("nullMessage")}</div>
      )}
    </div>
  );
};

export default Proposal;
