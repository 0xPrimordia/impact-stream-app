"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";

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
	const { login, authenticated, user } = usePrivy();

	if (authenticated && user && user.wallet?.address) {
		supabaseAuth(user.wallet?.address, user.id);
		return <p>User: {user.wallet?.address}</p>;
	}

	return <button onClick={login}>Log In</button>;
}
