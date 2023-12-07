create table proposal_draft_milestones (
 id uuid primary key default uuid_generate_v4(),
	proposal_drafts_id uuid references proposals(id),
	title text,
    amount integer,
    milestone_status text
);