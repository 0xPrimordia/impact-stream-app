CREATE OR REPLACE FUNCTION get_proposals_with_collaborators(proposal_id uuid)
RETURNS TABLE (
  title text,
  author_name text,
  author_family_name text,
  location text,
  summary text,
  affected_locations text,
  community_problem text,
  proposed_solution text,
  minimum_budget integer,
  key_players text,
  timeline text,
  collaborator_name text,
  collaborator_family_name text
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
    EXECUTE '
      SELECT p.title, a.name AS author_name, a.family_name AS author_family_name, p.location, p.summary, p.affected_locations, p.community_problem, p.proposed_solution, p.minimum_budget, p.key_players, p.timeline, u.name AS collaborator_name, u.family_name AS collaborator_family_name
      FROM proposals p
      INNER JOIN proposal_collaborators pc ON p.id = pc.proposal_id
      INNER JOIN users u ON u.id = pc.user_id
      INNER JOIN users a ON p.author_id = a.id
      WHERE p.id = $1'
    USING proposal_id;
END;
$$;
