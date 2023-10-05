drop function if exists get_proposals_with_collaborators();
drop function if exists get_proposal_with_collaborators(uuid);

create or replace function get_proposals_with_collaborators()
returns table (
  id uuid,
  title text,
  author json,
  location text,
  summary text,
  collaborators json[],
  approved boolean,
  allo_recipient_id text,
  allo_anchor_address text
)
 language plpgsql
as $$
begin
  return query
  select
   p.id,
   p.title,
   json_build_object('id', a.id, 'name', a.name, 'family_name', a.family_name) as author,
   p.location, 
   p.summary, 
   case 
		when count(pc.user_id) > 0 then array_agg(json_build_object('name', u.name, 'family_name', u.family_name)) 
    else array[]::json[]
   end as collaborators,
   p.approved,
   p.allo_recipient_id,
   u.allo_anchor_address
  from 
   proposals p
   left join proposal_collaborators pc on p.id = pc.proposal_id
   left join users u on u.id = pc.user_id
  group by 
   p.id,
   p.title, 
   p.summary,
   p.allo_recipient_id,
   u.allo_anchor_address;
end;
$$;

create or replace function get_proposal_with_collaborators(proposal_id uuid)
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
  collaborators json[],
  approved boolean,
  allo_recipient_id text,
	allo_anchor_address text
)
 language plpgsql
as $$
begin
  return query
  select 
	 p.title, 
   json_build_object('id', a.id, 'name', a.name, 'family_name', a.family_name) as author, 
	 p.location,
   p.summary, 
   p.affected_locations, 
   p.community_problem, 
   p.proposed_solution, 
   p.minimum_budget, 
   p.key_players, 
   p.timeline,
   p.approved,
   case 
		when count(pc.user_id) > 0 then array_agg(json_build_object('name', u.name, 'family_name', u.family_name)) 
		else array[]::json[] 
	 end as collaborators,
	 p.allo_recipient_id,
   a.allo_anchor_address
  from 
	 proposals p
   left join proposal_collaborators pc on p.id = pc.proposal_id
   left join users u on u.id = pc.user_id
   inner join users a on p.author_id = a.id
  where p.id = $1
  group by 
	 p.title,
	 a.id,
   a.name, 
   a.family_name, 
   p.location, 
   p.summary, 
   p.affected_locations, 
   p.community_problem, 
   p.proposed_solution, 
   p.minimum_budget, 
   p.key_players, 
   p.timeline,
   p.approved,
   p.allo_recipient_id,
   a.allo_anchor_address;
end;
$$;
