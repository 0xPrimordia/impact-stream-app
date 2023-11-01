import { IProposalCardProps } from "@/app/types";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { truncateDescription } from "@/app/utils";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "./AddRemoveCartButton";

export const GrantItem = ({
  proposal,
  showStatus,
  showAction = false,
}: IProposalCardProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-x-4 p-2 mt-2">
      <div
        className="justify-between cursor-pointer mb-2"
        onClick={() => {
          router.push(`/proposals/${proposal.id}`);
        }}
      >
        <div className="flex">
          <h3 className="text-lg font-bold leading-6 text-gray-900">
            {proposal.title}
          </h3>
          <div className="ml-auto">
            {showAction && <AddRemoveCartButton grantId={proposal.id} />}
          </div>
        </div>
        
        <span className="text-sm"><MapPinIcon className="h-5 inline-block" /> {proposal.location}</span>
      </div>
      <div className="mt-1 text-sm">
        {proposal.summary
          ? truncateDescription(proposal.summary)
          : "No summary provided."}
      </div>
      {showStatus && (
        <div
          className={`flex flex-row items-center justify-${
            !showStatus ? "end" : "between"
          } p-2 mt-2`}
        >
          <span>{proposal.approved ? "Approved ✅" : "Pending 🟡"}</span>
        </div>
      )}
      <div className="mt-2">
        <span className="text-sm font-bold">{proposal.author.name} {proposal.author.family_name}</span>
        {proposal.collaborators  && proposal.collaborators?.map((user) => (
          <span key={proposal.id + '-' + user.family_name} className="text-sm font-bold">, {user.name} {user.family_name}</span>
        ))}
      </div>
    </div>
  );
};
