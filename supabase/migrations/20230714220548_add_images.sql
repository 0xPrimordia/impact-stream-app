alter table users add column profile_image_url text;

create table gallery_images  (
	id uuid default uuid_generate_v4() primary key,
	image_url text not null,
  user_id text not null,
  constraint fkey_user_id foreign key(user_id) references users(id)
);
