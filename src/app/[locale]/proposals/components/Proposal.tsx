"use client";

import { SummaryProposal } from "@/app/types";
import router from "next/router";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, usePrivy } from "@privy-io/react-auth";
import useCheckTokens from "../../hooks/useCheckTokens";
import { useContext } from "react";
import { GrantItem } from "../../components/GrantItem";
import { GrantsContext } from "@/app/context/GrantContext";
import { logoutSupabase } from "../../../../../lib/supabase";

export default function Proposal() {
  // todo: move this to another file
  const { user, ready, authenticated, logout } = usePrivy();
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
      <ProposalList grants={grants} user={user} />
    </div>
  );
}

const ProposalList = ({
  grants,
  user,
}: {
  grants: SummaryProposal[];
  user: User | null;
}) => {
  const t = useTranslations("Proposals");

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      <div className="mb-14">
        <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
        {/* filter out by author/status and then map the cards */}
        {grants &&
          grants
            .filter((p) => user?.id === p.author.id || p.approved === true)
            .map((proposal) => (
              <div className="p-2" key={proposal.id}>
                <GrantItem
                  key={proposal.id}
                  grant={proposal}
                  showStatus={false}
                />
              </div>
            ))}
        {grants.length === 0 && (
          <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
        )}
        {/* Botton button to add new proposal */}
        <div className="fixed bottom-10 right-0 left-0 bg-white p-5 z-0">
          <button
            onClick={() => router.push("/grants/write")}
            className="w-full border border-slate-400 rounded leading-10 font-bold"
          >
            {t("addProposalButton")}
          </button>
        </div>
      </div>
    </ul>
  );
};
