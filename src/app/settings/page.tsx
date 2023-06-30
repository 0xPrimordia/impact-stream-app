"use client";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

export default function Settings() {
	const { disconnect } = useDisconnect();
	const router = useRouter();
	const handleDisconnect = () => {
		disconnect();
		router.push("/");
	};
	return (
		<>
			<p>User Settings</p>
			<button onClick={handleDisconnect}>Logout</button>
		</>
	);
}
