"use client";

import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { GrantItem } from "../../grants/components/GrantItem";
import { GrantsContext } from "@/app/context/GrantContext";
import { getVoiceCreditsCastByAllocatorToRecipient } from "../../utils/alloContract";
import { usePrivy } from "@privy-io/react-auth";

const Vote = () => {
  const { grants } = useContext(GrantsContext);
  const t = useTranslations("My Votes");
  const { user } = usePrivy();

  // const [votesCastedToRecipient, setVotesCastedToRecipient] =
  //   useState<number>(0);

  // useEffect(() => {
  //   const load = async () => {
  //     setVotesCastedToRecipient(
  //       await getVoiceCreditsCastByAllocatorToRecipient(
  //         user?.wallet?.address!,
  //         grant.allo_recipient_id!
  //       )
  //     );
  //   };
  //   load();
  // }, [user?.wallet!]);

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      <div className="flex flex-col">
        {/* filter out the grants the user voted for? */}
        {grants.map((grant) => {
          if (grant.approved === true) {
            return (
              <GrantItem
                key={grant.id}
                grant={grant}
                showStatus={false}
                showAllocation={true}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Vote;
