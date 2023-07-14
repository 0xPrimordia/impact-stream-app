import { Json } from "../../types/supabase";

export type Proposal = {
 id: string;
 title: string | null;
 location: string | null;
 summary: string | null;
 timeline: string | null;
 affected_locations: string | null;
 community_problem: string | null;
 proposed_solution: string | null;
 minimum_budget: number | null;
 key_players: string | null;
};

export type CreateProposal = {
 id: string;
 title: string | null;
 location: string | null;
 summary: string | null;
 timeline: string | null;
 affected_locations: string | null;
 community_problem: string | null;
 proposed_solution: string | null;
 sustainability: string | null;
 minimum_budget: number | null;
 key_players: string | null;
 milestones: Milestone[] | null;
};

export type SummaryProposal = {
 id: string;
 title: string | null;
 location: string | null;
 summary: string | null;
 collaborators: Json[] | null;
};

export type FullProposal = {
 title: string | null;
 author: {
  id: string;
  name: string | null;
  family_name: string | null;
 };
 location: string | null;
 summary: string | null;
 timeline: string | null;
 affected_locations: string | null;
 community_problem: string | null;
 proposed_solution: string | null;
 sustainability: string | null;
 minimum_budget: number | null;
 key_players: string | null;
 project_milestones: Milestone[] | null;
 collaborators: Collaborator[] | null;
};

type Collaborator = {
 name: string | null;
 family_name: string | null;
};

export type Milestone = {
 title: string;
 budget: number;
};

export type User = {
 id: string;
 name: string | null;
 family_name: string | null;
 address: string | null;
 created_at: string | null;
 onboarded: boolean | null;
 phone_number: string | null;
 village_neighborhood: string | null;
};

export type PrivyUser = {};
