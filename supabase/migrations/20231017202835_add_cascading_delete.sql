alter table proposal_collaborators drop constraint proposal_collaborators_proposal_id_fkey;

alter table proposal_collaborators add constraint proposal_collaborators_proposal_id_fkey foreign key (proposal_id) references proposals(id) on delete cascade;
