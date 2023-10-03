"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getSupabaseClient } from "../../../../../lib/supabase";
import { SummaryProposal } from "@/app/types";
import useCheckTokens from "../../hooks/useCheckTokens";
import { GrantItem } from "../../components/GrantItem";

const Donate = () => {
  // const [buttonText, setButtonText] = useState<string>("togo.impactstream.eth");
  const [grantsInCart, updateGrantsIncart] = useState<SummaryProposal[]>([]);
  const { isAccessTokenValid, isRefreshTokenValid } = useCheckTokens();
  const [grants, setGrants] = useState<SummaryProposal[]>([]);

  const t = useTranslations("Donate");

  useEffect(() => {
    if (isAccessTokenValid) getGrants();
  }, [isAccessTokenValid]);

  async function getGrants() {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.rpc(
      "get_proposals_with_collaborators"
    );
    if (data) setGrants(data);
    if (error) console.error(error);
  }

  // fixme: this is not working as expected @thelostone-mc
  const handleCartClick = (id: string) => {
    console.log("updating the cart");

    const grantToUpdate: SummaryProposal | undefined = grants.find(
      (grant) => grant.id === id
    );
    if (!grantToUpdate) return;

    // check the cart for the grant
    if (grantsInCart.includes(grantToUpdate)) {
      // remove from cart
      console.log("grant to remove", grantToUpdate);

      const updatedCart = grantsInCart.filter(
        (grant) => grant.id !== grantToUpdate.id
      );
      updateGrantsIncart(updatedCart);
    } else {
      console.log("grant to add", grantToUpdate);
      // add to cart
      updateGrantsIncart([...grantsInCart, grantToUpdate]);
    }

    // fixme: the setState (updateGrantsIncart) is lagging one click behind
    console.log("grants in cart", grantsInCart);
  };

  return (
    <div>
      <h3 className="font-bold mb-6 text-center">{t("heading")}</h3>
      {/* list out the approved/active grants */}
      {grants.map(
        (grant) =>
          grant.approved === true && (
            <GrantItem
              key={grant.id}
              grant={grant}
              showStatus={false}
              showAction={true}
              handleCartClick={handleCartClick}
            />
          )
      )}
    </div>
  );
};

export default Donate;
