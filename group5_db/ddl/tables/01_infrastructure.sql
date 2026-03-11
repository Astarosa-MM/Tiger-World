create table campus (
campus_ID			bigint unsigned auto_increment,
campus_name		varchar(255)
campus_status		varchar(11)

primary key (campus_ID),
check (campus_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

(building)

(floor)

(zone)

(room)
