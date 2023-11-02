"use client";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";
import { TUser } from "@/app/types";
import { shortenAddress } from "../../utils";
import { useTranslations } from "next-intl";
import useCheckTokens from "../hooks/useCheckTokens";

export default function Settings() {
  const { logout, user, ready, authenticated } = usePrivy();
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const router = useRouter();
  const t = useTranslations("Settings");
  const handleDisconnect = () => {
    logout();
    logoutSupabase();
    router.push("/");
  };
  const [currentUser, setCurrentUser] = useState<TUser>();

  useEffect(() => {
    async function getUser() {
      if (!user) return;
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", user.id);
      if (data) setCurrentUser(data[0]);
    }
    if (isAccessTokenValid) getUser();
  }, [user, isAccessTokenValid]);

  if (!ready) return null;
  if (ready && !authenticated) {
    router.push("/");
  }
  if (!isRefreshTokenValid) {
    logoutSupabase();
    logout();
    router.push("/");
  }

  const navigateToSettingPage = () => {
    router.push("/onboarding?update=true");
  };

  return (
    <>
      {currentUser && (
        <>
          <h3 className="font-bold mb-6">{t("heading")}</h3>
          <p>
            {currentUser.name} {currentUser?.family_name}
          </p>
          <p>{currentUser.village_neighborhood}</p>
          <p>{currentUser.phone_number}</p>
          {currentUser.address && <p>{shortenAddress(currentUser.address)}</p>}
          <button className="border border-slate-400 rounded leading-6 text-xs font-bold px-2 my-4">
            Edit Profile
          </button>
          <p className="italic text-xs">
            Profile created {currentUser.created_at}
          </p>
          <button
            className="w-full border border-slate-400 rounded leading-10 font-bold mt-20"
            onClick={handleDisconnect}
          >
            {t("logoutButton")}
          </button>
        </>
      )}
    </>
  );
}
