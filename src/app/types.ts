export type Proposal = {
    id: string;
	title: string|null;
    location: string|null;
	description: string|null;
	timeline: string|null;
	affected_locations: string|null;
	community_problem: string|null;
	proposed_solution: string|null;
	minimum_budget: number|null;
	key_players: string|null;
};

export type User = {
	id:string;
	name: string | null; 
	family_name: string | null;
	address: string|null;
	created_at: string|null;
	onboarded: boolean | null;
	phone_number: string | null;
	village_neighborhood: string | null;
}

export type PrivyUser = {
	
}