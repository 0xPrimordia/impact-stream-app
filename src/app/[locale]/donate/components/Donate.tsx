"use client";

import { useTranslations } from "next-intl";

const Donate = () => {
  const t = useTranslations("Donate");
  // Add implementation using `fundPool()`
  return (
    <div className="text-center">
      <h3 className="font-bold mb-6">{t("heading")}</h3>
      <button className="mt-2 p-2 border rounded-md shadow-md bg-gray-50 hover:bg-sky-600 hover:text-white">
        Fund the Pool
      </button>
    </div>
  );
};

export default Donate;
