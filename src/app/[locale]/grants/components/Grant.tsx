"use client";

import { SummaryProposal } from "@/app/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import useCheckTokens from "../../hooks/useCheckTokens";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "../../../../../lib/supabase";

// todo: list all grants for user to select from and add to cart

const Grant = () => {
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  useEffect(() => {
    if (isAccessTokenValid) getGrants();
  }, [isAccessTokenValid]);

  async function getGrants() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setGrants(data);
    if (error) console.log(error);
  }
  const t = useTranslations("My Grants");

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      <GrantList grants={grants} />
    </div>
  );
};

const GrantList = ({ grants }: { grants: SummaryProposal[] }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {grants.map((grant) => (
        <li
          key={grant.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <GrantItem grant={grant} />
        </li>
      ))}
    </ul>
  );
};

const GrantItem = ({ grant }: { grant: SummaryProposal }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6"
      onClick={() => router.push(`/proposals/${grant.id}`)}
    >
      <img
        src={grant.author?.profile_image_url ?? "https://i.pravatar.cc/300"}
        alt={grant.title ?? "title"}
        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
      />
      <div className="text-sm font-medium leading-6 text-gray-900">
        {grant.title}
      </div>
    </div>
  );
};

export default Grant;
