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

export type DraftProposal = {
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
  form_step: number | null;
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

export type CreateDraft = {
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
  form_step: number | null;
};

export type SummaryProposal = {
  id: string;
  approved: boolean;
  title: string | null;
  author: {
    id: string;
    name: string | null;
    family_name: string | null;
    profile_image_url: string | null;
  };
  location: string | null;
  summary: string | null;
  collaborators: Collaborator[] | null;
};

export type FullProposal = {
  title: string | null;
  author: {
    id: string;
    name: string | null;
    family_name: string | null;
    profile_image_url: string | null;
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
  profile_image_url: string | null;
};

export type Milestone = {
  title: string;
  budget: number;
};

// todo => note: why are we using this User and not the Collaborator type?
export type User = {
  id: string;
  name: string | null;
  family_name: string | null;
  address: string | null;
  created_at: string | null;
  onboarded: boolean | null;
  phone_number: string | null;
  village_neighborhood: string | null;
  email: string | null;
};

export type PrivyUser = {};

export interface ContractDetails {
  [key: number]: {
    proxy: `0x${string}`;
    implementation?: `0x${string}`;
    abi: any;
  };
}

export interface StrategyDetails {
  [key: number]: {
    address: `0x${string}`;
    abi: any;
  };
}

export interface GrantListProps {
  grants: SummaryProposal[];
}

export interface GrantItemProps {
  grant: SummaryProposal;
  showStatus: boolean;
  showAction?: boolean;
}

export interface CartItemProps {
  grant: SummaryProposal;
  amount: number;
}
