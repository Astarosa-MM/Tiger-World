/* when infrastructure owns an event, userID -> null */

create table events (
user_ID		bigint unsigned,
infrastructure_ID		bigint unsigned not null,
infrastructure_type		char(4) not null,

event_ID		bigint unsigned auto_increment,
event_name		varchar(255), 
start_time		time,
end_time		time,
event_date		date,

primary key (event_ID),
foreign key (user_ID) references user_info(user_ID),
check(infrastructure_type in ('CAMPUS', 'BUILDING', 'FLOOR', 'ZONE', 'ROOM'))
);
