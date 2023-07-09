"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { FullProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { CreateProposal } from "@/app/types";
import { MilestoneForm } from "./MilestoneForm";

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

    const methods = useForm<CreateProposal>({
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
            milestones: proposal.project_milestones
		},
	});

    const { register, formState, handleSubmit, formState: { errors } } = methods

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
					project_milestones: formData.milestones
                 })
                .eq('id', proposalId)
                setIsEditing(false)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font-bold mb-4">
                    <a className="text-sky-600" href={`/proposals/${proposalId}`}>
                    Cancel Edit
                    </a>
                    <input {...register("title", { required: t("titleValidationMessage") })} className="w-full border border-slate-300 rounded h-10 pl-2 mt-4" placeholder={t("title")} />
                    <span className="text-red-600 text-xs">
                        {" "}
                        {errors.title && errors.title.message}
                    </span>
                </div>

                <label className="text-xs">{t("location")}</label>
                <input {...register("location", {
              required: t("locationValidationMessage"),
            })} className="w-full border border-slate-300 rounded h-10 pl-2 mb-2" placeholder={t("location")} />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.location && errors.location.message}
                </span>
                
                <label className="text-xs">{t("summaryPlaceholder")}</label>
                <textarea
                    className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
                    placeholder={t("summaryPlaceholder")}
                    {...register("summary", {
                        required: t("summaryValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.summary && errors.summary.message}
                </span>

                <label className="text-xs">{t("locationsAffectedPlaceholder")}</label>
                <input
                    className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                    placeholder={t("locationsAffectedPlaceholder")}
                    {...register("affected_locations", {
                        required: t("locationsAffectedValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.affected_locations && errors.affected_locations.message}
                </span>

                <label className="text-xs">{t("communityProblemPlaceholder")}</label>
                <textarea
                    className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
                    placeholder={t("communityProblemPlaceholder")}
                    {...register("community_problem", {
                        required: t("communityProblemValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.community_problem && errors.community_problem.message}
                </span>

                <label className="text-xs">{t("proposedSolutionPlaceholder")}</label>
                <textarea
                    className="w-full border border-slate-300 rounded h-20 pl-2 mb-2"
                    placeholder={t("proposedSolutionPlaceholder")}
                    {...register("proposed_solution", {
                        required: t("proposedSolutionValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.proposed_solution && errors.proposed_solution.message}
                </span>

                <label className="text-xs">{t("minimumBudgetPlaceholder")}</label>
                <input
                    className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                    placeholder={t("minimumBudgetPlaceholder")}
                    {...register("minimum_budget", {
                        required: t("minimumBudgetValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.minimum_budget && errors.minimum_budget.message}
                </span>

                <label className="text-xs">{t("keyPlayersPlaceholder")}</label>
                <input
                    className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                    placeholder={t("keyPlayersPlaceholder")}
                    {...register("key_players", {
                        required: t("keyPlayersValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.key_players && errors.key_players.message}
                </span>

                <label className="text-xs">{t("timelinePlaceholder")}</label>
                <input
                    className="w-full border border-slate-300 rounded h-10 pl-2 mb-2"
                    placeholder={t("timelinePlaceholder")}
                    {...register("timeline", {
                        required: t("timelineValidationMessage"),
                      })}
                />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.timeline && errors.timeline.message}
                </span>

                <label className="text-xs mt-4 block">{t("heading6")}</label>
                <MilestoneForm milestones={proposal.project_milestones} />
                <span className="text-red-600 text-xs">
                    {" "}
                    {errors.milestones && errors.milestones.message}
                </span>

                <button
                    className="w-full border border-slate-400 rounded leading-10 font-bold mt-4"
                    type="submit"
                >
                    {t("updateButton")}
                </button>
            </form>
        </FormProvider>
    )
}