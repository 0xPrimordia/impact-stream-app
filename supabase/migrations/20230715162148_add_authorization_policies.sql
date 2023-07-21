-- Drop all previous policies

do $$declare
  policy_name text;
begin
  for policy_name in (select policyname from pg_policies where tablename = 'users') loop
    execute format('drop policy %I on users;', policy_name);
  end loop;
end$$;

do $$declare
  policy_name text;
begin
  for policy_name in (select policyname from pg_policies where tablename = 'proposals') loop
    execute format('drop policy %I on proposals;', policy_name);
  end loop;
end$$;

do $$declare
  policy_name text;
begin
  for policy_name in (select policyname from pg_policies where tablename = 'proposal_collaborators') loop
    execute format('drop policy %i on proposal_collaborators;', policy_name);
  end loop;
end$$;

do $$declare
  policy_name text;
begin
  for policy_name in (select policyname from pg_policies where tablename = 'gallery_images') loop
    execute format('drop policy %i on gallery_images;', policy_name);
  end loop;
end$$;

-- Create and enable new user policies
create policy user_authentication_policy_select on public.users
for select
to public
using (true);

create policy user_authorization_policy_insert on public.users
for insert
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (id)::text);

create policy user_authorization_policy_update on public.users
for update
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (id)::text);

create policy user_authorization_policy_delete on public.users
for delete
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (id)::text);

alter table public.users enable row level security;

-- Create and enable new proposal policies
create policy proposal_authentication_policy_select on proposals
for select
to public
using (true);

create policy proposal_authentication_policy_insert on proposals
for insert 
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

create policy proposal_authentication_policy_update on proposals
for update 
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

create policy proposal_authentication_policy_delete on proposals
for delete
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (author_id)::text);

alter table proposals enable row level security;

-- Create and enable new collaborator policies
create policy collaborator_authentication_policy_select on proposal_collaborators

for select
to public
using (true);

create policy collaborator_authentication_policy_insert on proposal_collaborators
for insert 
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

create policy collaborator_authentication_policy_update on proposal_collaborators
for update 
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

create policy collaborator_authentication_policy_delete on proposal_collaborators
for delete 
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

alter table proposal_collaborators enable row level security;

-- Create and enable new gallery policies
create policy gallery_authentication_policy_select on gallery_images
for select
to public
using (true);

create policy gallery_authentication_policy_insert on gallery_images
for insert 
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

create policy gallery_authentication_policy_update on gallery_images
for update 
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

create policy gallery_authentication_policy_delete on gallery_images
for delete
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

alter table gallery_images enable row level security;
