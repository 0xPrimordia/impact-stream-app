"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import { GrantItem } from "../../components/GrantItem";
import { GrantsContext } from "@/app/context/GrantContext";

const Vote = () => {
  const { grants } = useContext(GrantsContext);

  const t = useTranslations("My Votes");

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      <div className="flex flex-col">
        {/* filter out the grants the user voted for? */}
        {grants.map(
          (grant) =>
            grant.approved === true && (
              <GrantItem key={grant.id} grant={grant} showStatus={false} />
            )
        )}
      </div>
    </div>
  );
};

export default Vote;
