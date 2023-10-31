import { DraftListProps } from "@/app/types";
import { useRouter } from "next/navigation";

export const DraftList = ({ drafts }: DraftListProps) => {
    const router = useRouter();

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-8"
    >
      {drafts.map((draft) => (
        <li
          key={draft.id}
          className="overflow-hidden"
          onClick={
            () => {
                router.push(`/grants/write/${draft.id}`);
              }
          }
        >
          {draft.title}
        </li>
      ))}
    </ul>
  );
};
