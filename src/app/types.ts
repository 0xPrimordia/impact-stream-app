export type TProposal = {
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

export type TCreateProposal = {
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
  milestones: TMilestone[] | null;
};

export type TCreateDraft = {
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
  milestones: TMilestone[] | null;
  form_step: number | null;
};

export type TSummaryProposal = {
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
  collaborators: TCollaborator[] | null;
  allo_recipient_id: string | null;
  allo_anchor_address: string | null;
};

export type TFullProposal = TSummaryProposal & {
  timeline: string | null;
  affected_locations: string | null;
  community_problem: string | null;
  proposed_solution: string | null;
  sustainability: string | null;
  minimum_budget: number | null;
  key_players: string | null;
  project_milestones: TMilestone[] | null;
};

type TCollaborator = {
  name: string | null;
  family_name: string | null;
  profile_image_url: string | null;
};

export type TMilestone = {
  title: string;
  budget: number;
};

// todo => note: why are we using this User and not the Collaborator type?
export type TUser = {
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

export type TPrivyUser = {};

export interface IContractDetails {
  [key: number]: {
    proxy: `0x${string}`;
    implementation?: `0x${string}`;
    abi: any;
  };
}

export interface IStrategyDetails {
  [key: number]: {
    poolId: number;
    address: `0x${string}`;
    abi: any;
  };
}

export interface IProposalProps {
  showStatus?: boolean;
  showAction?: boolean;
  showAllocation?: boolean;
}

export interface IDraftListProps {
  drafts: TCreateDraft[];
}

export interface IProposalListProps {
  proposals: TSummaryProposal[];
  showStatus?: boolean;
  showAction?: boolean;
}

export interface IProposalCardProps {
  proposal: TSummaryProposal;
  showStatus: boolean;
  showAction?: boolean;
  showAllocation?: boolean;
}

export interface ICartItemProps {
  proposal: TSummaryProposal;
  amount: number;
}

export interface ICartContextProps {
  cartItems: string[];
  addItemToCart: (itemId: string) => void;
  deleteItemFromCart: (itemId: string) => void;
  isInCart: (itemId: string) => boolean;
  allocations: IAllocationParams;
  handleAllocationChange: (recipientId: string, value: number) => void;
}

export interface IChainIndex {
  [key: string]: any;
}

export type TDraftProposal = {
  id: string;
  author_id: string;
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
  form_step: number | null;
  collaborators: TCollaborator[] | null;
};

export interface IEditProposalProps {
  proposal: TFullProposal;
  proposalId: string;
  setIsEditing: Function;
  reloadData: Function;
}

export interface IMilestoneProps {
  milestones?: TMilestone[] | null;
}

export interface IRow {
  key: string;
  milestone?: TMilestone;
}

export interface INavbarLinkProps {
  children: React.ReactNode;
  path: string;
  setOverlay: Function;
}

export interface IAllocationParams {
  [key: string]: number;
}
