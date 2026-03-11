create table user_info (

user_ID			bigint unsigned auto_increment,
email				varchar(255) unique,
password_salt		varchar(16),
password_hash		char(64),

primary key (user_ID),
check (email like '%.edu')
);

(user_settings)

(user_bookmarks)
