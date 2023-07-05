"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function Settings() {
	const { logout } = usePrivy();
	const router = useRouter();
	const handleDisconnect = () => {
		logout();
		router.push("/");
	};
	return (
		<>
			<p>User Settings</p>
			<button onClick={handleDisconnect}>Logout</button>
		</>
	);
}
