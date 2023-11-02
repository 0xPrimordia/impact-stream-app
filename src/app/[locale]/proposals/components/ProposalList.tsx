import { TSummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ProposalCard from "./ProposalCard";

const ProposalList = ({ proposals }: { proposals: TSummaryProposal[] }) => {
  const t = useTranslations("Proposals");
  const router = useRouter();

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      <div className="mb-14">
        <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
        {/* filter out by status and then map the cards */}
        {proposals ? (
          proposals
            .filter((p) => p.approved === true)
            .map((proposal) => (
              <div className="p-2" key={proposal.id}>
                <ProposalCard proposal={proposal} showStatus={false} />
              </div>
            ))
        ) : (
          <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
        )}
        {/* Botton button to add new proposal */}
        <div className="fixed bottom-10 right-0 left-0 bg-white p-5 z-0">
          <button
            onClick={() => router.push("/proposals/me/write")}
            className="w-full border border-slate-400 hover:bg-sky-600 rounded-md leading-10 font-bold"
          >
            {t("addProposalButton")}
          </button>
        </div>
      </div>
    </ul>
  );
};

export default ProposalList;
