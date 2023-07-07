"use client";
import React, { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Navbar = () => {
	const [overlay, setOverlay] = useState(false);
	const t = useTranslations("Navigation");
	return (
		<div className="fixed top-0 left-0 right-0 bg-white p-8 pb-4 z-50">
			<div className="z-50 relative inline-block">
				<Image
					src="/impact-stream-logo.svg"
					alt="Impact Stream"
					width={114}
					height={45}
					priority
				/>
			</div>
			{overlay && (
				<nav className="brand-bg-color text-3xl font-bold fixed top-0 bottom-0 right-0 left-0 p-10 pt-28 z-40">
					<ul>
						<li className="mb-6">
							<a href="/proposals">{t("link1")}</a>
						</li>
						<li className="mb-6">
							<a href="/settings">{t("link2")}</a>
						</li>
					</ul>
					<XMarkIcon
						onClick={() => setOverlay(false)}
						className="h-8 absolute right-12 top-10"
					/>
				</nav>
			)}
			{!overlay && (
				<div onClick={() => setOverlay(true)}>
					<Bars3Icon className="h-8 absolute right-12 top-10" />
				</div>
			)}
		</div>
	);
};
