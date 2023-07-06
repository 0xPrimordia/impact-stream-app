"use client";
import { useTranslations } from "next-intl";

export const Footer = () => {
	const t = useTranslations("Footer");
	return (
		<footer className="fixed bg-white bottom-0 left-0 right-0 z-0">
			<p className="text-center italic text-sm mb-2 mt-2">{t("message")}</p>
		</footer>
	);
};
