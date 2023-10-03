"use client";

import { useTranslations } from "next-intl";
import { useContext } from "react";
import { GrantList } from "../../components/GrantList";
import { GrantsContext } from "@/app/context/GrantContext";

const Grant = () => {
  const t = useTranslations("My Grants");
  const { grants } = useContext(GrantsContext);

  // todo: only show users grant(s)

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      <GrantList grants={grants} />
    </div>
  );
};

export default Grant;
