"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { FullProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { CreateProposal } from "@/app/types";

interface EditProposalProps {
    proposal: FullProposal;
    proposalId: string;
    setIsEditing: Function;
}

export const EditProposalForm = ({
    setIsEditing,
    proposal,
    proposalId,
    ...props
}: EditProposalProps) => {
    const t = useTranslations("Create Proposal");
    const router = useRouter();

    const {
		register,
		formState,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProposal>({
		mode: "onBlur",
		defaultValues: {
			title: proposal.title,
			location: proposal.location,
			summary: proposal.summary,
			affected_locations: proposal.affected_locations,
            community_problem: proposal.community_problem,
            proposed_solution: proposal.proposed_solution,
			minimum_budget: proposal.minimum_budget,
			key_players: proposal.key_players,
			timeline: proposal.timeline,
		},
	});

    const onSubmit: SubmitHandler<CreateProposal> = async (formData) => {
        try {
            const { error } = await supabase
                .from('proposals')
                .update({ 
                    title: formData.title,
					summary: formData.summary,
					timeline: formData.timeline,
					location: formData.location,
					affected_locations: formData.affected_locations,
					community_problem: formData.community_problem,
					proposed_solution: formData.proposed_solution,
					minimum_budget: formData.minimum_budget,
					key_players: formData.key_players,
					//project_milestones: formData.milestones, add this
                 })
                .eq('id', proposalId)
                setIsEditing(false)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold mb-4">
                <a className="text-sky-600" href={`/proposals/${proposalId}`}>
                Cancel Edit
                </a>
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.title && errors.title.message}
                </span>
                <input {...register("title", { required: t("titleValidationMessage") })} className="w-full border border-slate-300 rounded h-10 pl-2 mt-4" placeholder={t("title")} />
            </div>

            <label className="text-xs">{t("location")}</label>
            <input className="w-full border border-slate-300 rounded h-10 pl-2 mb-2" placeholder={t("location")} value={proposal.location ? proposal.location : ''} />
            
            <label className="text-xs">{t("summaryPlaceholder")}</label>
            <textarea
                className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
                placeholder={t("summaryPlaceholder")}
                value={proposal.summary ? proposal.summary:''}
            />

            <label className="text-xs">{t("locationsAffectedPlaceholder")}</label>
            <input
                className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                placeholder={t("locationsAffectedPlaceholder")}
                value={proposal.affected_locations?proposal.affected_locations:''}
            />

            <label className="text-xs">{t("communityProblemPlaceholder")}</label>
            <textarea
                className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
                placeholder={t("communityProblemPlaceholder")}
                value={proposal.community_problem?proposal.community_problem:''}
            />

            <label className="text-xs">{t("proposedSolutionPlaceholder")}</label>
            <textarea
                className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
                placeholder={t("proposedSolutionPlaceholder")}
                value={proposal.proposed_solution?proposal.proposed_solution:''}
            />

            <label className="text-xs">{t("minimumBudgetPlaceholder")}</label>
            <input
                className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                placeholder={t("minimumBudgetPlaceholder")}
                value={proposal.minimum_budget?proposal.minimum_budget:''}
            />

            <label className="text-xs">{t("keyPlayersPlaceholder")}</label>
            <input
                className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                placeholder={t("keyPlayersPlaceholder")}
                value={proposal.key_players?proposal.key_players:''}
            />

            <label className="text-xs">{t("timelinePlaceholder")}</label>
            <input
                className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                placeholder={t("timelinePlaceholder")}
                value={proposal.timeline?proposal.timeline:''}
            />
            <button
                className="w-full border border-slate-400 rounded leading-10 font-bold mt-4"
                type="submit"
            >
                {t("updateButton")}
            </button>
        </form>
    )
}