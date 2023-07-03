export type Proposal = {
    id: string;
	//authorId: string;
	title: string|null;
    location: string|null;
	//collaboratorIds: string[];
	description: string|null;
	timeline: string|null;
	affected_locations: string|null;
	community_problem: string|null;
	proposed_solution: string|null;
	minimum_budget: number|null;
	key_players: string|null;
	//milestones: Milestone[];
};

type Milestone = {
	proposal: string;
	title: string;
	budget: number;
};