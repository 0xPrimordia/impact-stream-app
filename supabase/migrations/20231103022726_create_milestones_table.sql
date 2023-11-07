create table proposal_milestones (
 id uuid primary key default uuid_generate_v4(),
	proposal_id uuid references proposals(id),
	title text,
    amount integer,
    milestone_status text
);

alter table "proposals" add column funded boolean;