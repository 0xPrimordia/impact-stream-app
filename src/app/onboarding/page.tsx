"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "../../../lib/supabase-client";
import { useRouter } from "next/navigation";

type User = {
	id: string;
	givenName: string;
	familyName: string;
	villageNeighborhood: string;
	phoneNumber: string;
};

export default function Onboarding() {
	const { user, authenticated } = usePrivy();
	const router = useRouter();
	if (!authenticated) {
		router.push("/");
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>();
	const onSubmit: SubmitHandler<User> = async (data) => {
		try {
			const { error } = await supabase
				.from("users")
				.update({
					name: data.givenName,
					family_name: data.familyName,
					village_neighborhood: data.villageNeighborhood,
					phone_number: data.phoneNumber,
				})
				.eq("id", user?.id);
			router.push(`/proposals/`);
			if (error) {
				throw error;
			}
		} catch (error) {
			console.log(error);
		}
	};
	const inputClasses = "w-full border border-slate-300 rounded h-10 pl-2 mb-6";
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h3 className="font-bold mb-6">Complete Your Profile</h3>
			<input
				className={inputClasses}
				placeholder="Given Name"
				{...register("givenName")}
			/>
			<input
				className={inputClasses}
				placeholder="Family Name"
				{...register("familyName")}
			/>
			<input
				className={inputClasses}
				placeholder="Village / Neighborhood"
				{...register("villageNeighborhood")}
			/>
			<input
				className={inputClasses}
				placeholder="Phone Number"
				{...register("phoneNumber")}
			/>

			<p className="text-center text-xs italic mb-6">
				Your information will not be shared with the public and will only be
				used for identification purposes and to contact you if necessary.
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
