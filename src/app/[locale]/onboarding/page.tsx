"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "../../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type User = {
  id: string;
  givenName: string;
  familyName: string;
  villageNeighborhood: string;
};

export default function Onboarding() {
  const { user, ready, authenticated } = usePrivy();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const t = useTranslations("Onboarding");
  if (!ready) return null;
  if (ready && !authenticated) {
    router.push("/");
  }
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: data.givenName,
          family_name: data.familyName,
          village_neighborhood: data.villageNeighborhood,
          phone_number: user?.phone?.number,
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
      <h3 className="font-bold mb-6">{t("heading")}</h3>
      <input
        className={inputClasses}
        placeholder={t("firstName")}
        {...register("givenName")}
      />
      <input
        className={inputClasses}
        placeholder={t("lastName")}
        {...register("familyName")}
      />
      <input
        className={inputClasses}
        placeholder={t("location")}
        {...register("villageNeighborhood")}
      />
      <p className="text-center text-xs italic mb-6">{t("disclaimer")}</p>
      <button
        className="w-full border border-slate-400 rounded leading-10 font-bold"
        type="submit"
      >
        {t("submitButton")}
      </button>
    </form>
  );
}
