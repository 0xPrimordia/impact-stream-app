
alter table proposals drop column permissions;
alter table proposals rename column monetary_minimum to minimum_budget;
alter table proposals drop column project_milestones;
alter table proposals add column project_milestones jsonb;
