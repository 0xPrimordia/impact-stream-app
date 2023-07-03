"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase-client";

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
		<button
			className="bg-slate-100 p-20 rounded block m-auto font-bold text-slate-400"
			onClick={login}
		>
			Sign-In
		</button>
	);
}
