"use client";

import { GrantsContext } from "@/app/context/GrantContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { GrantItem } from "../../components/GrantItem";

const Donate = () => {
  const t = useTranslations("Donate");
  const { grants } = useContext(GrantsContext);
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      <div>
        <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
        {/* Add donate button for fundPool */}
        {grants ? (
          grants
            .filter((p) => p.approved === true)
            .map((proposal) => (
              <div className="p-2" key={proposal.id}>
                <GrantItem
                  key={proposal.id}
                  grant={proposal}
                  showStatus={false}
                  showAction={true}
                />
              </div>
            ))
        ) : (
          <p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
        )}
      </div>
    </ul>
  );
};

export default Donate;
