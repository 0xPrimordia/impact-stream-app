"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase-client";

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

export function Wallet() {
	const router = useRouter();
	const { login, authenticated, user, ready } = usePrivy();

	if (ready && authenticated && user && user.wallet?.address) {
		checkOnboardingStatus(user.id).then((onboarded) => {
			if (!onboarded) {
				supabaseAuth(user.wallet?.address as string, user.id);
				router.push(`/onboarding/`);
			} else {
				router.push(`/proposals/`);
			}
		});
	}

	return (
		<>
			<p className="text-sm text-center italic my-10">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et.
			</p>
			<button
				className="w-full border border-slate-400 rounded leading-10 font-bold"
				onClick={login}
			>
				Sign In
			</button>
		</>
	);
}
