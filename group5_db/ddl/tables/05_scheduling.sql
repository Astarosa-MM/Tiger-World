create table events (
owner_ID		bigint unsigned,
owner_type		char(4),

event_ID		bigint unsigned auto_increment,
event_name		varchar(255), 
start_time		time,
end_time		time,
event_date		date,

primary key (event_ID),
check(owner_type in (‘USER’, ‘CAMPUS’, ‘BUILDING’, ‘FLOOR’, ‘ZONE’, ‘ROOM’))
);
