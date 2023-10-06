import { IGrantItemProps } from "@/app/types";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { truncateDescription } from "@/app/utils";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "../../cart/components/AddRemoveCartButton";

export const GrantItem = ({
  grant,
  showStatus,
  showAction = false,
}: IGrantItemProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-x-4 p-2 mt-2">
      <div
        className="justify-between cursor-pointer mb-2"
        onClick={() => {
          router.push(`/proposals/${grant.id}`);
        }}
      >
        <div className="flex">
          <h3 className="text-lg font-bold leading-6 text-gray-900">
            {grant.title}
          </h3>
          <div className="ml-auto">
            {showAction && <AddRemoveCartButton grantId={grant.id} />}
          </div>
        </div>
        
        <span className="text-sm"><MapPinIcon className="h-5 inline-block" /> {grant.location}</span>
      </div>
      <div className="mt-1 text-sm">
        {grant.summary
          ? truncateDescription(grant.summary)
          : "No summary provided."}
      </div>
      {showStatus && (
        <div
          className={`flex flex-row items-center justify-${
            !showStatus ? "end" : "between"
          } p-2 mt-2`}
        >
          <span>{grant.approved ? "Approved ✅" : "Pending 🟡"}</span>
        </div>
      )}
      <div className="mt-2">
        <span className="text-sm font-bold">{grant.author.name} {grant.author.family_name}</span>
        {grant.collaborators  && grant.collaborators?.map((user) => (
          <span key={grant.id + '-' + user.family_name} className="text-sm font-bold">, {user.name} {user.family_name}</span>
        ))}
      </div>
    </div>
  );
};
