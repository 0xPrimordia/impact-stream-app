import { GrantItemProps } from "@/app/types";
import { truncateDescription } from "@/app/utils";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const GrantItem = ({
  grant,
  showStatus,
  showAction,
}: GrantItemProps) => {
  const router = useRouter();
  const [isInCart, setIsInCart] = useState({ [grant.id]: false });

  return (
    <div
      className="flex flex-col gap-x-4 border rounded-md shadow-sm bg-gray-50 p-2 mt-2"
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
      <div className="mt-1">
        {grant.summary
          ? truncateDescription(grant.summary)
          : "No summary provided."}
      </div>
      <div className="flex flex-row justify-between items-center">
        {showStatus && (
          <div className="flex flex-row items-center justify-between border rounded-md shadow-sm p-2 mt-2">
            <span>{grant.approved ? "Approved ✅" : "Pending 🟡"}</span>
          </div>
        )}
        {showAction && (
          <div className="flex flex-row items-center justify-between">
            <div
              className=""
              onClick={() => setIsInCart({ [grant.id]: !isInCart[grant.id] })}
            >
              {/* todo: finish up the button display based on whether grant is in the cart or not */}
              <span className="">
                {isInCart[grant.id] ? (
                  <HeartIconSolid color={"red"} className="h-6 w-6 mt-1" />
                ) : (
                  <HeartIconOutline color={"red"} className="h-6 w-6 mt-1" />
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
