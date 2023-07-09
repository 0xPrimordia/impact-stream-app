"use client";
import React, { useState, useEffect } from "react";
import Select from "react-tailwindcss-select";
import "react-tailwindcss-select/dist/index.css";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "../../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { User, CreateProposal } from "@/app/types";
import { MilestoneForm } from "../../components/MilestoneForm";

interface UserOption {
	id: string;
	name: string | null;
	family_name: string | null;
}

interface SelectOption {
	value: string;
	label: string;
}

export default function WriteProposal() {
	const { user, authenticated, ready } = usePrivy();
	const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
	const [users, setUsers] = useState<UserOption[]>([]);
	const [summaryValue, setSummaryValue] = useState("");
	const router = useRouter();
	const methods = useForm<CreateProposal>({
		mode: "onBlur",
		defaultValues: {
			title: "",
			location: "",
			summary: "",
			affected_locations: "",
			minimum_budget: undefined,
			key_players: "",
			timeline: "",
		},
	});
  const {
		register,
		formState,
		handleSubmit,
		formState: { errors },
	} = methods
	const { isValid } = formState;
	const [currentStep, setCurrentStep] = useState(1);
	const t = useTranslations("Create Proposal");
	useEffect(() => {
		getUsers();
	}, []);
	useEffect(() => {
		let options: SelectOption[] = [];
		users.forEach((u) => {
			if (u.id !== user?.id) {
				console.log(u.id);
				let userOption = {
					value: u.id,
					label: u.name + " " + u.family_name,
				};
				options.push(userOption);
			}
		});
		setUserOptions([...userOptions, ...options]);
	}, [users, user]);
	if (!ready) return null;
	if (ready && !authenticated) {
		router.push("/");
	}

	async function getUsers() {
		const { data } = await supabase
			.from("users")
			.select(`id, name, family_name`);
		if (data) setUsers(data);
		console.log(data);
	}

	const selectUser = (user: SelectValue) => {
		if (user)
			setUserOptions((current) =>
				// @ts-ignore
				current.filter((option) => option.value !== user.value)
			);
		setSelectedUsers([...selectedUsers, user]);
	};

	const removeCollaborator = (user: SelectValue) => {
		setSelectedUsers((current) =>
			// @ts-ignore
			current.filter((option) => option.value !== user.value)
		);
		// @ts-ignore
		setUserOptions([...userOptions, user]);
	};

	const onSubmit: SubmitHandler<CreateProposal> = async (formData) => {
		try {
			const { data: proposalData, error: proposalError } = await supabase
				.from("proposals")
				.insert({
					author_id: user?.id,
					title: formData.title,
					summary: formData.summary,
					timeline: formData.timeline,
					location: formData.location,
					affected_locations: formData.affected_locations,
					community_problem: formData.community_problem,
					proposed_solution: formData.proposed_solution,
					minimum_budget: formData.minimum_budget,
					key_players: formData.key_players,
					project_milestones: formData.milestones,
				})
				.select()
				.single();
			if (proposalError) {
				throw proposalError;
			}
			let inserts: any = [];
			selectedUsers.map(async (selectedUser) => {
				inserts.push({
					id: {
						user_id: selectedUser?.value as string,
						proposal_id: proposalData.id,
					},
					proposal_id: proposalData.id,
					user_id: selectedUser?.value,
				});
			});

			const { error } = await supabase
				.from("proposal_collaborators")
				.insert(inserts);
			if (error) {
				throw error;
			}

			router.push(`/proposals/${proposalData.id}`);
		} catch (error) {
			console.log(error);
		}
	};
	const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6";
	const textareaClasses =
		"w-full border border-slate-300 rounded h-20 pl-2 mb-6";

  function setStep(direction: string) {
    if (direction === "next") {
      setCurrentStep(currentStep + 1);
    }
    if (direction === "previous") {
      setCurrentStep(currentStep - 1);
    }
  }

	const StepControls = () => {
		return (
			<div className="flex mb-10 mt-10">
				{currentStep !== 1 && (
					<button
						className="border border-slate-400 rounded leading-10 font-bold px-10"
						onClick={() => setStep("previous")}
					>
						{t("previousButton")}
					</button>
				)}

				{currentStep !== 6 && (
					<button
						className="border border-slate-400 rounded leading-10 font-bold px-10 ml-auto disabled:opacity-50"
						onClick={() => {
							setStep("next");
						}}
						disabled={isValid ? false : true}
					>
						{t("nextButton")}
					</button>
				)}
			</div>
		);
	};

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      {currentStep === 1 && (
        <>
          <h3 className="font-bold mb-6">{t("heading1")}</h3>
          <span className="text-red-600 text-xs">
            {" "}
            {errors.title && errors.title.message}
          </span>
          <input
            className={inputClasses}
            placeholder={t("title")}
            {...register("title", { required: t("titleValidationMessage") })}
          />
          <span className="text-red-600 text-xs">
            {" "}
            {errors.location && errors.location.message}
          </span>
          <input
            className={inputClasses}
            placeholder={t("location")}
            {...register("location", {
              required: t("locationValidationMessage"),
            })}
          />
          <h3 className="font-bold mb-6">{t("collaborators")}</h3>
          {selectedUsers.length > 0 &&
            selectedUsers.map((user) => (
              <div
                key={user.id}
                className="border border-slate-400 rounded leading-8 text-xs px-2 font-bold inline-block mb-3"
              >
                <input type="hidden" value={selectedUsers} />
                <div className="flex">
                  {user?.label}
                  <XMarkIcon
                    onClick={() => removeCollaborator(user)}
                    className="h-3 ml-2 mt-2.5 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          {userOptions.length > 0 && (
            <Select
              primaryColor={"blue"}
              onChange={selectUser}
              value={null}
              isSearchable={true}
              placeholder={t("collaboratorsPlaceholder")}
              options={userOptions}
            />
          )}

          <StepControls />
        </>
      )}
      {currentStep === 2 && (
        <>
          <h3 className="font-bold mb-6">{t("heading2")}</h3>
          <span className="text-red-600 text-xs">
            {" "}
            {errors.summary && errors.summary.message}
          </span>
          <textarea
            className={textareaClasses}
            placeholder={t("summaryPlaceholder")}
            maxLength={200}
            {...register("summary", {
              required: t("summaryValidationMessage"),
            })}
          />
          <span className="text-red-600 text-xs">
            {" "}
            {errors.affected_locations && errors.affected_locations.message}
          </span>
          <input
            className={inputClasses}
            placeholder={t("locationsAffectedPlaceholder")}
            {...register("affected_locations", {
              required: t("locationsAffectedValidationMessage"),
            })}
          />
          <StepControls />
        </>
      )}
      {currentStep === 3 && (
        <>
          <h3 className="font-bold mb-6">{t("heading3")}</h3>
          <textarea
            className={textareaClasses}
            placeholder={t("communityProblemPlaceholder")}
            {...register("community_problem", {
              required: t("communityProblemValidationMessage"),
            })}
          />
          <p className="text-sm center italic">
            {t("communityProblemContext")}
          </p>
          <StepControls />
        </>
      )}
      {currentStep === 4 && (
        <>
          <h3 className="font-bold mb-6">{t("heading4")}</h3>
          <textarea
            className={textareaClasses}
            placeholder={t("proposedSolutionPlaceholder")}
            {...register("proposed_solution", {
              required: t("proposedSolutionValidationMessage"),
            })}
          />
          <p className="text-sm center italic">
            {t("proposedSolutionContext")}
          </p>
          <StepControls />
        </>
      )}
      {currentStep === 5 && (
        <>
          <h3 className="font-bold mb-6">{t("heading5")}</h3>
          <input
            type="number"
            className={inputClasses}
            placeholder={t("minimumBudgetPlaceholder")}
            {...register("minimum_budget", {
              required: t("minimumBudgetValidationMessage"),
            })}
          />
          <input
            className={inputClasses}
            placeholder={t("keyPlayersPlaceholder")}
            {...register("key_players", {
              required: t("keyPlayersValidationMessage"),
            })}
          />
          <input
            className={inputClasses}
            placeholder={t("timelinePlaceholder")}
            {...register("timeline", {
              required: t("timelineValidationMessage"),
            })}
          /> 
          <StepControls />
        </>
      )}
      {currentStep === 6 && (
        <>
          <MilestoneForm />
          <span className="text-red-600 text-xs">
                {" "}
                {errors.milestones && errors.milestones.message}
            </span>
        <p
            className="underline mb-8 text-sky-600"
            onClick={() => setStep("previous")}
          >
            {t("previousButton")}
          </p>
          <button
            className="w-full border border-slate-400 rounded leading-10 font-bold"
            type="submit"
          >
            {t("submitButton")}
          </button>
        </>
      )}
    </form>
    </FormProvider>
  );
}
