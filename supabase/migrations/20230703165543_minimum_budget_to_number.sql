alter table proposals
add column minimum_budget_new integer;

update proposals
set minimum_budget_new = cast(minimum_budget as integer);

alter table proposals 
drop column minimum_budget;

alter table proposals
rename column minimum_budget_new to minimum_budget;


