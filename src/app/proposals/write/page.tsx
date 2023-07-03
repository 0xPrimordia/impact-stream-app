"use client";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { Proposal } from "@/app/types";

interface MilestoneProps {
	index: string;
}

export default function WriteProposal() {
	const { user, ready, authenticated } = usePrivy();
	const router = useRouter();
	if (!ready) return null;
	if (ready && !authenticated) {
		router.push("/");
	}
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Proposal>();
	const onSubmit: SubmitHandler<Proposal> = async (formData) => {
		try {
			console.log(formData);
			const { data: proposalData, error: proposalError } = await supabase
				.from("proposals")
				.insert({
					author_id: user?.id,
					title: formData.title,
					description: formData.description,
					timeline: formData.timeline,
					affected_locations: formData.affected_locations,
					community_problem: formData.community_problem,
					proposed_solution: formData.proposed_solution,
					minimum_budget: formData.minimum_budget,
					key_players: formData.key_players,
					project_milestones: formData.milestones,
				})
				.select();
			if (proposalError) {
				throw proposalError;
			}
			const { error } = await supabase.from("proposal_collaborators").insert({
				proposal_id: proposalData.id,
				collaborator_id: user?.id,
			});
			if (error) {
				throw error;
			}
			router.push(`/proposals/`);
		} catch (error) {
			console.log(error);
		}
	};
	const [rows, setRows] = useState([{ key: "default" }]);
	const [currentStep, setCurrentStep] = useState(1);
	const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6";
	const textareaClasses =
		"w-full border border-slate-300 rounded h-20 pl-2 mb-6";

	function removeRow(index: string) {
		if (index !== "default")
			setRows((current) => current.filter((_) => _.key !== index));
	}

	function setStep(direction: string) {
		console.log(currentStep);
		if (direction === "next") {
			setCurrentStep(currentStep + 1);
		}
		if (direction === "previous") {
			setCurrentStep(currentStep - 1);
		}
		console.log(currentStep);
	}

	const StepControls = () => {
		return (
			<div className="flex mb-10 mt-10">
				{currentStep !== 1 && (
					<button
						className="border border-slate-400 rounded leading-10 font-bold px-10"
						onClick={() => setStep("previous")}
					>
						Previous
					</button>
				)}

				{currentStep !== 6 && (
					<button
						className="border border-slate-400 rounded leading-10 font-bold px-10 ml-auto"
						onClick={() => setStep("next")}
					>
						Next
					</button>
				)}
			</div>
		);
	};

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
			{currentStep === 1 && (
				<>
					<h3 className="font-bold mb-6">Basic Information</h3>
					<input
						className={inputClasses}
						placeholder="Title"
						{...register("title")}
					/>
					<input
						className={inputClasses}
						placeholder="Location"
						{...register("location")}
					/>
					<input className={inputClasses} placeholder="Add Collaborator" />
					<StepControls />
				</>
			)}
			{currentStep === 2 && (
				<>
					<h3 className="font-bold mb-6">Grant Information</h3>
					<textarea
						className={textareaClasses}
						placeholder="Description"
						{...register("description")}
					/>
					<input
						className={inputClasses}
						placeholder="Locations Affected"
						{...register("affected_locations")}
					/>
					<StepControls />
				</>
			)}
			{currentStep === 3 && (
				<>
					<h3 className="font-bold mb-6">Community Problem</h3>
					<textarea
						className={textareaClasses}
						placeholder="Community Problem to Address"
						{...register("community_problem")}
					/>
					<p className="text-sm center italic">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<StepControls />
				</>
			)}
			{currentStep === 4 && (
				<>
					<h3 className="font-bold mb-6">Proposed Solution</h3>
					<textarea
						className={textareaClasses}
						placeholder="Proposed Solution"
						{...register("proposed_solution")}
					/>
					<p className="text-sm text-center italic">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<StepControls />
				</>
			)}
			{currentStep === 5 && (
				<>
					<h3 className="font-bold mb-6">Project Details</h3>
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
					<StepControls />
				</>
			)}
			{currentStep === 6 && (
				<>
					<h3 className="font-bold mb-6">Milestones</h3>
					{rows.map((row, index) => (
						<MilestoneRow key={row.key} index={row.key} />
					))}
					<p
						className="text-right underline mb-8 text-sky-600 mt-2"
						onClick={addRow}
					>
						Add Milestone
					</p>
					<p
						className="underline mb-8 text-sky-600"
						onClick={() => setStep("previous")}
					>
						Previous
					</p>
					<button
						className="w-full border border-slate-400 rounded leading-10 font-bold"
						type="submit"
					>
						Submit
					</button>
				</>
			)}
		</form>
	);
}
