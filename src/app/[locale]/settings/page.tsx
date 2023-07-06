"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Settings() {
	const { logout } = usePrivy();
	const router = useRouter();
	const t = useTranslations("Settings");
	const handleDisconnect = () => {
		logout();
		router.push("/");
	};
	return (
		<>
			<p>{t("heading")}</p>
			<button onClick={handleDisconnect}>{t("logoutButton")}</button>
		</>
	);
}
