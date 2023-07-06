create type combined_id as (
proposal_id uuid,
user_id text
);

alter table proposal_collaborators add column new_id combined_id;

alter table proposal_collaborators drop constraint proposal_collaborators_pkey;

alter table proposal_collaborators add constraint proposal_collaborators_pkey primary key (new_id);

alter table proposal_collaborators drop column id;

alter table proposal_collaborators rename column new_id to id;

alter table proposal_collaborators rename column collaborator_id to user_id;
