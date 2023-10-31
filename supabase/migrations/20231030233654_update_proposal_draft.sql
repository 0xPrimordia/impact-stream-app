
drop function if exists get_proposal_draft_with_collaborators(uuid);

create or replace function get_proposal_draft_with_collaborators(proposal_draft_id uuid)
 returns table (
  title text,
  author json,
  location text,
  summary text,
  affected_locations text,
  community_problem text,
  proposed_solution text,
  minimum_budget integer,
  key_players text,
  timeline text,
		project_milestones jsonb,
  collaborators json[],
  form_step integer
)
 language plpgsql
as $$
begin
  return query
  select 
	 pd.title, 
   json_build_object('id', a.id, 'name', a.name, 'family_name', a.family_name) as author, 
	 pd.location,
   pd.summary, 
   pd.affected_locations, 
   pd.community_problem, 
   pd.proposed_solution, 
   pd.minimum_budget, 
   pd.key_players, 
   pd.timeline,
   pd.project_milestones,
   case 
		when count(pdc.user_id) > 0 then array_agg(json_build_object('name', u.name, 'family_name', u.family_name)) 
		else array[]::json[] 
	 end as collaborators,
   pd.form_step
  from 
	 proposal_drafts pd
   left join proposal_draft_collaborators pdc on pd.id = pdc.proposal_draft_id
   left join users u on u.id = pdc.user_id
   inner join users a on pd.author_id = a.id
  where pd.id = $1
  group by 
	 pd.title,
	 a.id,
   a.name, 
   a.family_name, 
   pd.location, 
   pd.summary, 
   pd.affected_locations, 
   pd.community_problem, 
   pd.proposed_solution, 
   pd.minimum_budget, 
   pd.key_players, 
   pd.timeline,
	 pd.project_milestones,
	 pd.form_step;
end;
$$;
