create table
users (
id text primary key not null,
address text,
name text,
family_name text,
village_neighborhood text,
phone_number text,
created_at timestamptz default now()
);

create table proposals (
id uuid primary key default uuid_generate_v4(),
user_id text references users(id),
name text,
affected_locations text,
community_problem text,
proposed_solution text,
monetary_minimum text,
key_players text,
permissions text,
project_milestones text,
created_at timestamptz default now()
);
