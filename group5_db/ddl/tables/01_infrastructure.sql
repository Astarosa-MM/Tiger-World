create table campus (
campus_ID			bigint unsigned auto_increment,
campus_name		varchar(255)
campus_status		varchar(11)

primary key (campus_ID),
check (campus_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

create table building (
campus_ID			bigint unsigned not null,
building_ID			bigint unsigned auto_increment,
building_name		varchar(255)
building_status		varchar(11)

primary key (building_ID),
foreign key (campus_ID) references campus(campus_ID),
check (campus_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

(floor)

(zone)

(room)
