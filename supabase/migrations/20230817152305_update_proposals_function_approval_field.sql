
drop function if exists get_proposals_with_collaborators();

create or replace function get_proposals_with_collaborators()
returns table (
  id uuid,
  title text,
  author json,
  location text,
  summary text,
  collaborators json[]
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
   end as collaborators
  from 
   proposals p
   left join proposal_collaborators pc on p.id = pc.proposal_id
   left join users u on u.id = pc.user_id
   inner join users a on p.author_id = a.id
	where 
   p.approved = true
  group by 
   p.id,
   p.title,
   a.id,
   a.name, 
   a.family_name,
   p.summary;
end;
$$;
