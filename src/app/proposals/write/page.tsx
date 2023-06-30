"use client";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "../../../../lib/supabase-client";
import { useRouter } from "next/navigation";

interface MilestoneProps {
	index: string;
}

type Milestone = {
	proposal: string;
	title: string;
	budget: number;
};

type User = {
	id: string;
	givenName: string;
	familyName: string;
};

type Proposal = {
	authorId: string;
	title: string;
	collaboratorIds: string[];
	description: string;
	timeline: string;
	affected_locations: string;
	community_problem: string;
	proposed_solution: string;
	minimum_budget: number;
	key_players: string;
	milestones: Milestone[];
};

export default function WriteProposal() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Proposal>();
	const { user } = usePrivy();
	const onSubmit: SubmitHandler<Proposal> = async (data) => {
		try {
			console.log(data);
			const { error } = await supabase.from("proposals").insert({
				author_id: user?.id,
				title: data.title,
				description: data.description,
				timeline: data.timeline,
				affected_locations: data.affected_locations,
				community_problem: data.community_problem,
				proposed_solution: data.proposed_solution,
				minimum_budget: data.minimum_budget,
				key_players: data.key_players,
				project_milestones: data.milestones,
			});
			router.push(`/proposals/`);
			if (error) {
				throw error;
			}
		} catch (error) {
			console.log(error);
		}
	};
	const [rows, setRows] = useState([{ key: "default" }]);
	const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6";

	function removeRow(index: string) {
		if (index !== "default")
			setRows((current) => current.filter((_) => _.key !== index));
	}

	const MilestoneRow = ({ index, ...props }: MilestoneProps) => {
		return (
			<div className="flex mb-2">
				<input
					{
					// @ts-ignore
					...register(`milestones.${index}.title`)
					}
					className="w-1/2 border border-slate-300 rounded h-10 pl-2 mb-2"
					placeholder="Title"
				/>
				{index !== "default" && (
					<input
						{
						// @ts-ignore
						...register(`milestones.${index}.budget`)
						}
						className="w-2/5 border border-slate-300 rounded h-10 pl-2 mb-2 ml-2"
						placeholder="Budget"
					/>
				)}
				{index === "default" && (
					<input
						{
						// @ts-ignore
						...register(`milestones.${index}.budget`)
						}
						className="w-1/2 border border-slate-300 rounded h-10 pl-2 mb-2 ml-2"
						placeholder="Budget"
					/>
				)}
				{index !== "default" && (
					<XMarkIcon
						onClick={() => removeRow(index)}
						className="h-6 ml-2 mt-2.5"
					/>
				)}
			</div>
		);
	};

	function addRow() {
		const key = "milestone-" + (rows.length + 2);
		setRows([...rows, { key }]);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h3 className="font-bold mb-6">Grant Information</h3>
			<input
				className={inputClasses}
				placeholder="Title"
				{...register("title")}
			/>
			<input className={inputClasses} placeholder="Add Collaborator" />
			<textarea
				className={inputClasses}
				placeholder="Description"
				{...register("description")}
			/>
			<input
				className={inputClasses}
				placeholder="Locations Affected"
				{...register("affected_locations")}
			/>
			<input
				className={inputClasses}
				placeholder="Community Problem to Address"
				{...register("community_problem")}
			/>
			<input
				className={inputClasses}
				placeholder="Proposed Solution"
				{...register("proposed_solution")}
			/>
			<input
				className={inputClasses}
				placeholder="Minimum Total Budget"
				{...register("minimum_budget")}
			/>
			<input
				className={inputClasses}
				placeholder="Key Players (Including Vendors)"
				{...register("key_players")}
			/>
			<input
				className={inputClasses}
				placeholder="Timeline"
				{...register("timeline")}
			/>
			<h3 className="font-bold mb-4">Milestones</h3>
			{rows.map((row, index) => (
				<MilestoneRow key={row.key} index={row.key} />
			))}
			<p
				className="text-right underline mb-8 text-sky-600 mt-2"
				onClick={addRow}
			>
				Add Milestone
			</p>
			<button
				className="w-full border border-slate-400 rounded leading-10 font-bold"
				type="submit"
			>
				Submit
			</button>
		</form>
	);
}
