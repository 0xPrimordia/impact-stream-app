"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import copy from "clipboard-copy";

const Donate = () => {
  const [buttonText, setButtonText] = useState<string>("togo.impactstream.eth");
  const [isClicked, setIsClicked] = useState(false);
  const t = useTranslations("Donate");
  const handleClick = () => {
    copy(buttonText);
    setButtonText(t("copied"));
    setIsClicked(true);
  };

  return <div>Donate</div>;
};

export default Donate;
