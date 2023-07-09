"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase-client";
import { useTranslations } from "next-intl";
import {
  createQueries,
  createLocalPersister,
  createCustomPersister,
} from "tinybase";
import {
  useCreateQueries,
  useStore,
  useResultRow,
  useCreatePersister,
} from "tinybase/ui-react";

async function supabaseAuth(address: string, userId: string) {
  await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, userId }),
  });
}

// async function checkOnboardingStatus(userId: string) {
// 	try {
// 		const { data, error } = await supabase
// 			.from("users")
// 			.select("onboarded")
// 			.eq("id", userId)
// 			.single();
// 		if (error) {
// 			throw error;
// 		}
// 		return data.onboarded;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

export function Wallet() {
  const router = useRouter();
  const { login, authenticated, user, ready } = usePrivy();
  const t = useTranslations("Sign-In");
  const store = useStore();
  const localPersister = useCreatePersister(store, (store) => {
    return createLocalPersister(store, "users");
  });
  const supabasePersister = useCreatePersister(store, (store) => {
    return createCustomPersister(
	  store,
	  async () => {
		const { data, error } = await supabase
		  .from("users")
		  .select("onboarded")
		  .eq("id", user ? user.id : "")
		  .single();
		if (error) {
		  throw error;
		}
		return data;
	 },
	 async (getContent) => {
	  const { users } = getContent();
		const onboardingStatus = users[user.id]["onboarded"];
		const { data, error } = await supabase
		  .from("users")
		  .update(onboardingStatus)
		  .eq("id", user ? user.id : "");
		if (error) {
		  throw error;
		}
	 },
		 (listener) => setInterval(listener, 1000),
		 (interval) => clearInterval(interval),
	);
  const queries = useCreateQueries(store!, (store) =>
    createQueries(store).setQueryDefinition(
      "onboardingStatus",
      "users",
      ({ select, where }) => {
        select("onboarded");
        where("id", user ? user.id : "");
      }
    )
  );
  const onboarded = useResultRow("onboardingStatus", "users", queries);
  if (ready && authenticated && user && user.wallet?.address && !onboarded) {
    supabaseAuth(user.wallet?.address as string, user.id);
    store?.setPartialRow("users", user.id, {
      address: user.wallet?.address,
      onboarded: true,
    });
    await localPersister.save();
		localPersister.destroy();
  } else {
    router.push(`/proposals/`);
  }

  return (
    <>
      <p className="text-sm text-center italic my-10">{t("disclaimer")}</p>
      <button
        className="w-full border border-slate-400 rounded leading-10 font-bold"
        onClick={login}
      >
        {t("signInButton")}
      </button>
    </>
  );
}
