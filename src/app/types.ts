export type Proposal = {
    id: string;
	authorId: string;
	title: string;
    location: string;
	collaboratorIds: string[];
	description: string;
	timeline: string;
	affected_locations: string;
	community_problem: string;
	proposed_solution: string;
	minimum_budget: number;
	key_players: string;
	milestones: Milestone[];
};

type Milestone = {
	proposal: string;
	title: string;
	budget: number;
};