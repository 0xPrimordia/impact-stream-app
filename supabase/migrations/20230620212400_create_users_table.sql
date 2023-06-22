create table
users (
address text primary key,
id uuid default uuid_generate_v4(),
name text,
created_at timestamptz default now()
);
