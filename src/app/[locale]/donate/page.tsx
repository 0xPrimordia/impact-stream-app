"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import copy from "clipboard-copy";
import Link from 'next/link'

export default function Donate() {
 const [buttonText, setButtonText] = useState<string>("togo.impactstream.eth");
 const [isClicked, setIsClicked] = useState(false);
 const t = useTranslations("Donate");
 const handleClick = () => {
  copy(buttonText);
  setButtonText(t("copied"));
  setIsClicked(true);
 }

 return (
  <div className="mb-14">
   <h3 className="font-bold mb-6">{t("heading")}</h3>
   <button
    className="w-full border border-slate-400 rounded leading-10 font-bold disabled:opacity-50"
    onClick={handleClick}
    disabled={isClicked}
   >
    {buttonText}
   </button>
   <p className="text-sm text-center italic my-5">{t("disclaimer")}<Link className="text-blue-800" target="_blank" rel="noopener noreferrer" href="https://app.ribbon.giving/r/campaigns/camp_OAZVmcEnj0bnPVtS">{t("link")}</Link></p>
  </div>)
}



