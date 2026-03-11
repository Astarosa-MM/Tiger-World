create table user_info (
user_ID			bigint unsigned auto_increment,
email				varchar(255) unique,
password_salt		varchar(16),
password_hash		char(64),

primary key (user_ID),
check (email like '%.edu')
);

create table user_settings (
user_ID				bigint unsigned,
default_campus			bigint unsigned,

mode				varchar(5),
time_zone			char(3),
push_notifs			varchar(3),

primary key (user_ID),
foreign key (user_ID) references user_info(user_ID),
foreign key (default_campus) references campus(campus_ID),

check(mode in (
‘LIGHT’, ‘DARK’)),
check(time_zone in (
‘EST’, ‘CST’, ‘MST’, ‘PST’, ‘AKST’, ‘HST’)),
check(push_notifs in (
‘ON’, ‘OFF’))
);

(user_bookmarks)
