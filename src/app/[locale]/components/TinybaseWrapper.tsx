"use client";
import { createStore } from "tinybase";
import {
  Provider as TinyBaseProvider,
  useCreateStore,
} from "tinybase/cjs/ui-react";

export default function TinybaseWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useCreateStore(() =>
    createStore().setTablesSchema({
      proposals: {
        title: { type: "string" },
        author_id: { type: "string" },
        location: { type: "string" },
        summary: { type: "string" },
        affected_locations: { type: "string" },
        community_problem: { type: "string" },
        proposed_solution: { type: "string" },
        project_milestones: { type: "string" },
        key_players: { type: "string" },
        minimum_budget: { type: "string" },
        timeline: { type: "string" },
      },
      users: {
        name: { type: "string" },
        family_name: { type: "string" },
        address: { type: "string" },
        village_neighborhood: { type: "string" },
        created_at: { type: "string" },
        phone_number: { type: "string" },
        onboarded: { type: "boolean", default: false },
      },
      proposal_collaborators: {
        proposal_id: { type: "string" },
        user_id: { type: "string" },
      },
    })
  );

  return <TinyBaseProvider store={store}>{children}</TinyBaseProvider>;
}
