"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase-client";
import { useTranslations } from "next-intl";
import {
  useStore,
  useCreateQueries,
  useCreatePersister,
} from "tinybase/ui-react";
import {
  createLocalPersister,
  Persister,
} from "tinybase/persisters/persister-browser";

async function supabaseAuth(address: string, userId: string) {
  await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, userId }),
  });
}

async function checkOnboardingStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("onboarded")
      .eq("id", userId)
      .single();
    if (error) {
      throw error;
    }
    return data.onboarded;
  } catch (error) {
    console.log(error);
  }
}

async function persistDataLocally(local: Persister) {
  await local.save();
  console.log("Data persisted!");
}

export function Wallet() {
  const router = useRouter();
  const { login, authenticated, user, ready } = usePrivy();
  const t = useTranslations("Sign-In");
  const store = useStore();
  const localPersister = useCreatePersister(store, (store) => {
    return createLocalPersister(store, "users");
  });
  if (ready && authenticated && user && user.wallet?.address) {
    checkOnboardingStatus(user.id).then((onboarded) => {
      if (!onboarded) {
        supabaseAuth(user.wallet?.address as string, user.id);
        store.setPartialRow("users", user.id, {
          address: user.wallet?.address as string,
        });
        console.log(store.getTables());
        persistDataLocally(localPersister);
        localPersister.destroy();
        router.push(`/onboarding/`);
      } else {
        router.push(`/proposals/`);
      }
    });
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
