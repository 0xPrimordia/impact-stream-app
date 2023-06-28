create policy "Only authenticated users can modify records that match their privy id" on public.users
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (id)::text);

alter table public.users enable row level security;

create policy "Only authenticated users can modify records that match their privy id" on public.proposals
using (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text)
with check (((current_setting('request.jwt.claims'::text, true))::json ->> 'sub'::text) = (user_id)::text);

alter table public.proposals enable row level security;
