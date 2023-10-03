"use client";

import { useTranslations } from "next-intl";

const Donate = () => {
  const t = useTranslations("Donate");

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      {/* Add donate button for fundPool */}
    </div>
  );
};

export default Donate;
