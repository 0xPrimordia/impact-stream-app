import { GrantItemProps } from "@/app/types";
import { truncateDescription } from "@/app/utils";
import { useRouter } from "next/navigation";
import AddRemoveCartButton from "./AddRemoveCartButton";

export const GrantItem = ({
  grant,
  showStatus,
  showAction = false,
}: GrantItemProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-x-4 border rounded-md shadow-sm bg-gray-50 p-2 mt-2">
      <div
        className="flex flex-row items-center justify-between cursor-pointer"
        onClick={() => {
          router.push(`/proposals/${grant.id}`);
        }}
      >
        <div className="flex text-sm font-medium leading-6 text-gray-900 border-b-sky-600">
          {grant.title}
        </div>
        <img
          src={grant.author?.profile_image_url ?? "https://i.pravatar.cc/300"}
          alt={grant.title ?? "title"}
          className="h-12 w-12 rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />
      </div>
      <div className="mt-1">
        {grant.summary
          ? truncateDescription(grant.summary)
          : "No summary provided."}
      </div>
      <div
        className={`flex flex-row items-center justify-${
          !showStatus ? "end" : "between"
        } p-2 mt-2`}
      >
        {showStatus && (
          <span>{grant.approved ? "Approved ✅" : "Pending 🟡"}</span>
        )}
        {showAction && <AddRemoveCartButton grantId={grant.id} />}
      </div>
    </div>
  );
};
