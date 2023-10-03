import { GrantItemProps } from "@/app/types";
import { truncateDescription } from "@/app/utils";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export const GrantItem = ({
  grant,
  showStatus,
  showAction,
  handleCartClick,
}: GrantItemProps) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-x-4 border-b border-gray-900/5 bg-gray-50 p-2"
      onClick={() => {
        if (showAction) {
          return;
        } else {
          router.push(`/proposals/${grant.id}`);
        }
      }}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex text-sm font-medium leading-6 text-gray-900 border-b-sky-600">
          {grant.title}
        </div>
        <img
          src={grant.author?.profile_image_url ?? "https://i.pravatar.cc/300"}
          alt={grant.title ?? "title"}
          className="h-12 w-12 rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />
      </div>
      <div>
        <div className="mt-1">
          {grant.summary
            ? truncateDescription(grant.summary)
            : "No summary provided."}
        </div>
        {showStatus && (
          <div className="flex flex-row items-center justify-between border bg-gray-200 rounded-md shadow-sm p-2 mt-2">
            <span>Status: </span>
            <span>{grant.approved ? "Approved ✅" : "Pending 🟡"}</span>
          </div>
        )}
        {showAction && (
          <div className="border bg-gray-200 rounded-md shadow-sm p-2 mt-2">
            {/* <CheckIcon className="h-4 w-4" /> */}
            <div
              className="flex flex-row items-center justify-between hover:text-sky-600 text-center"
              onClick={() => handleCartClick(grant.id)}
            >
              {/* todo: finish up the button display based on whether grant is in the cart or not */}
              <span className="text-center">Add/Remove to/from Cart</span>
              <span>{}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
