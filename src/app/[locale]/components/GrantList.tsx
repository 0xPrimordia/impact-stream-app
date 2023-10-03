import { GrantListProps } from "@/app/types";
import { GrantItem } from "./GrantItem";

export const GrantList = ({ grants }: GrantListProps) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {grants.map((grant) => (
        <li
          key={grant.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <GrantItem
            grant={grant}
            showStatus={true}
            showAction={false}
          />
        </li>
      ))}
    </ul>
  );
};
