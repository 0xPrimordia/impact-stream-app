import { IProposalListProps } from "@/app/types";
import { GrantItem } from "./GrantItem";

export const GrantList = ({ grants }: IProposalListProps) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-8"
    >
      {grants.map((proposal) => (
        <li
          key={proposal.id}
          className="overflow-hidden"
        >
          <GrantItem
            proposal={proposal}
            showStatus={true}
          />
        </li>
      ))}
    </ul>
  );
};
