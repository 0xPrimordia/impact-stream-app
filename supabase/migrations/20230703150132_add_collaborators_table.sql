create table proposal_collaborators (
 id uuid primary key default uuid_generate_v4(),
	proposal_id uuid references proposals(id),
	collaborator_id text references users(id)
);
