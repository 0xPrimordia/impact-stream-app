create or replace function get_full_proposals_with_collaborators()
returns table (
  id uuid,
  title text,
  location text,
  summary text,
  collaborators json[]
)
 language plpgsql
as $$
begin
  return query
    execute '
      select p.id, p.title, p.location, p.summary, 
      case when count(pc.user_id) > 0 then array_agg(json_build_object(''name'', u.name, ''family_name'', u.family_name)) 
      else array[]::json[] end as collaborators
      from proposals p
      left join proposal_collaborators pc on p.id = pc.proposal_id
      left join users u on u.id = pc.user_id
      group by p.id, p.title, p.summary'
    ;
end;
$$;

