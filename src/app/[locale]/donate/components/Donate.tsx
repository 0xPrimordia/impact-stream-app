"use client";

import { useTranslations } from "next-intl";

const Donate = () => {
  const t = useTranslations("Donate");
  // Add button to donate to the pool using `fundPool()`
  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
    </div>
  );
};

export default Donate;
