alter table proposal_collaborators disable row level security;
drop policy collaborator_authentication_policy_insert on proposal_collaborators;
drop policy collaborator_authentication_policy_update on proposal_collaborators;
drop policy collaborator_authentication_policy_delete on proposal_collaborators;


create policy collaborator_authentication_policy_insert on proposal_collaborators
for insert 
with check (exists (
    select 1
    from proposals
    where proposals.id = proposal_id 
    and proposals.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

create policy collaborator_authentication_policy_update on proposal_collaborators
for update 
using (exists (
    select 1
    from proposals
    where proposals.id = proposal_id
    and proposals.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)))
with check (exists (
    select 1
    from proposals
    where proposals.id = proposal_id
    and proposals.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

create policy collaborator_authentication_policy_delete on proposal_collaborators
for delete
using (exists (
				select 1
				from proposals
				where proposals.id = proposal_id
				and proposals.author_id = ((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text)));

alter table proposal_collaborators enable row level security;
