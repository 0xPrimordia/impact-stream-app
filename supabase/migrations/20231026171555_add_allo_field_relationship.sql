alter table users add constraint unique_anchor_address unique (allo_anchor_address);
alter table proposals add constraint fk_anchor_address foreign key (allo_recipient_id) references users (allo_anchor_address);
