alter table proposals alter column approved drop default, alter column approved set default null;

update proposals set approved = null;
