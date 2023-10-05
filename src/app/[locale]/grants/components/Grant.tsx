"use client";

import { useTranslations } from "next-intl";
import { GrantList } from "../../components/GrantList";
import { useGrantContext } from "@/app/context/GrantContext";
import { usePrivy } from "@privy-io/react-auth";

const Grant = () => {
  const t = useTranslations("My Grants");
  const grantsList = useGrantContext().grants;
  const { user } = usePrivy();

  // filter grants by grant.author.id === user.id
  if (!user) return;
  const filteredGrants = grantsList.filter(
    (grant) => grant.author.id === user!.id
  );

  return (
    <div>
      <h3 className="font-bold mb-6">{t("heading")}</h3>
      <GrantList grants={filteredGrants} />
    </div>
  );
};

export default Grant;
