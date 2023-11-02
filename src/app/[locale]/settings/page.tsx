"use client";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { getSupabaseClient, logoutSupabase } from "../../../../lib/supabase";
import { TUser } from "@/app/types";
import { useTranslations } from "next-intl";
import useCheckTokens from "../hooks/useCheckTokens";
import { shortenAddress } from "@/app/utils";

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

  return (
    <>
      {currentUser && (
        <>
          <h3 className="font-bold mb-6">{t("heading")}</h3>

          <div className="sm:col-span-4 mt-2">
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Address
            </label>
            <p>
              {shortenAddress(currentUser.address!)}
            </p>
          </div>

          <div className="sm:col-span-4 mt-2">
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Phone
            </label>
            <p>
              {currentUser.phone_number!}
            </p>
          </div>

          <div className="sm:col-span-4 mt-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  defaultValue={currentUser.name!}
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 mt-2">
            <label htmlFor="familyName" className="block text-sm font-medium leading-6 text-gray-900">
              Family Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="familyName"
                  id="familyName"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  defaultValue={currentUser.family_name!}
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4 mt-2">
            <label htmlFor="neighborhood" className="block text-sm font-medium leading-6 text-gray-900">
              Neighborhood
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  defaultValue={currentUser.village_neighborhood!}
                />
              </div>
            </div>
          </div>

          <button className="w-full border border-slate-400 rounded leading-10 font-bold mt-5">
            Update Profile
          </button>

          <button
            className="w-full border border-slate-400 rounded leading-10 font-bold mt-2"
            onClick={handleDisconnect}
          >
            {t("logoutButton")}
          </button>
        </>
      )}
    </>
  );
}
