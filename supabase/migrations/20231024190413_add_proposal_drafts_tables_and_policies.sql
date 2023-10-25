-- Create Tables
create table
  proposal_drafts (
    id uuid not null default uuid_generate_v4 (),
    author_id text null,
    affected_locations text null,
    community_problem text null,
    proposed_solution text null,
    minimum_budget integer null,
    key_players text null,
    created_at timestamp with time zone null default now(),
    project_milestones jsonb null,
    summary text null,
    timeline text null,
    title text null,
    location text null,
    sustainability text null,
    form_step integer default 1 not null,
    constraint proposal_drafts_pkey primary key (id),
    constraint proposal_drafts_user_id_fkey foreign key (author_id) references users (id)
  );

create table
  proposal_draft_collaborators (
    proposal_draft_id uuid null,
    user_id text null,
    id public.combined_id not null,
    constraint proposal_draft_collaborators_pkey primary key (id),
    constraint proposal_draft_collaborators_collaborator_id_fkey foreign key (user_id) references users (id),
    constraint proposal_draft_collaborators_proposal_draft_id_fkey foreign key (proposal_draft_id) references proposal_drafts (id) on delete cascade
   );

-- Add Security Policies
create policy proposal_draft_authentication_policy_select on proposal_drafts
for select
to public
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

create policy proposal_draft_authentication_policy_insert on proposal_drafts
for insert 
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

create policy proposal_draft_authentication_policy_update on proposal_drafts
for update 
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

create policy proposal_draft_authentication_policy_delete on proposal_drafts
for delete
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

alter table proposal_drafts enable row level security;


create policy collaborator_draft_authentication_policy_select on proposal_draft_collaborators

for select
to public
using (exists (
				select 1
				from proposal_drafts
				where proposal_drafts.id = proposal_draft_id
				and proposal_drafts.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

create policy collaborator_draft_authentication_policy_insert on proposal_draft_collaborators
for insert 
with check (exists (
    select 1
    from proposal_drafts
    where proposal_drafts.id = proposal_draft_id 
    and proposal_drafts.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

create policy collaborator_authentication_policy_update on proposal_draft_collaborators
for update 
using (exists (
    select 1
    from proposal_drafts
    where proposal_drafts.id = proposal_draft_id
    and proposal_drafts.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)))
with check (exists (
    select 1
    from proposal_drafts
    where proposal_drafts.id = proposal_draft_id
    and proposal_drafts.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

create policy collaborator_authentication_policy_delete on proposal_draft_collaborators
for delete
using (exists (
				select 1
				from proposal_drafts
				where proposal_drafts.id = proposal_draft_id
				and proposal_drafts.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

alter table proposal_draft_collaborators enable row level security;
