import { useState } from "react";
import { useTranslations } from "next-intl";
import copy from "clipboard-copy";
import Donate from "../components/Donate/Donate";

export default function DonatePage() {
  const [buttonText, setButtonText] = useState<string>("togo.impactstream.eth");
  const [isClicked, setIsClicked] = useState(false);
  const t = useTranslations("Donate");
  const handleClick = () => {
    copy(buttonText);
    setButtonText(t("copied"));
    setIsClicked(true);
  };

  return <Donate />;
}
