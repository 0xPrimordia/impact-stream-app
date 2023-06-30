"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

async function supabaseAuth(address: string, userId: string) {
	await fetch("/api/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ address, userId }),
	});
}

export function Wallet() {
	const router = useRouter();
	const { login, authenticated, user } = usePrivy();

	if (authenticated && user && user.wallet?.address) {
		supabaseAuth(user.wallet?.address, user.id);
		router.push(`/onboarding/`);
	}

	return <button className="bg-slate-100 p-20 rounded block m-auto font-bold text-slate-400" onClick={login}>Sign-In</button>;
}
