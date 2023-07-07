"use client";
import React, { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase-client";
import { SummaryProposal } from "@/app/types";
import { usePrivy } from "@privy-io/react-auth";
import { useTranslations } from "next-intl";
import { truncate } from "@/app/utils";

export default function Proposals() {
	const { user, ready, authenticated } = usePrivy();
	const router = useRouter();
	const [proposals, setProposals] = useState<SummaryProposal[]>([]);
	useEffect(() => {
		getProposals();
	}, []);
	const t = useTranslations("Proposals");

	async function getProposals() {
		const { data, error } = await supabase
			.from("proposals")
			.select(`id, title, location, summary, users(name, family_name)`);
		if (data) setProposals(data);
		if (error) console.log(error);
	}

	if (!ready) return null;
	if (ready && !authenticated) {
		router.push("/");
	}

	return (
		<div className="mb-14">
			<h3 className="font-bold mb-6">{t("heading")}</h3>
			{proposals &&
				proposals.map((grant) => (
					<div
						key={grant.id}
						onClick={() => router.push(`/proposals/${grant.id}`)}
						className="mb-6"
					>
						<h3 className="font-bold mb-1 text-lg">{grant.title}</h3>
						<div className="text-sm align-middle">
							<MapPinIcon className="h-4 inline-block" /> {grant.location}
						</div>
						<p className="text-sm mt-2 mb-1 leading-1">
							{grant.summary ? truncate(grant.summary, 200)                                                           : ''}
							{grant.summary ? truncate(grant.summary, 200):''}
						<span className="text-sm">
							{Array.isArray(grant?.users) &&
								//@ts-ignore
								grant?.users.name &&
								//@ts-ignore
								grant?.users.family_name
								? grant.users
									.map(
										(user) =>
											//@ts-ignore
											user.name + " " + user.family_name
									)
									.join(", ")
								: //@ts-ignore
								grant?.users.name + " " + grant?.users.family_name}
						</span>
					</div>
				))}
			{proposals.length === 0 && (
				<p className="text-sm text-center italic my-10">{t("nullMessage")}</p>
			)}
			<div className="fixed bottom-4 right-0 left-0 bg-white p-5 z-0">
				<button
					onClick={() => router.push("/proposals/write")}
					className="w-full border border-slate-400 rounded leading-10 font-bold"
				>
					{t("addProposalButton")}
				</button>
			</div>
		</div>
	);
}
