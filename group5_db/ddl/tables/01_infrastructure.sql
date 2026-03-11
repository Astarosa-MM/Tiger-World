create table campus (
campus_ID			bigint unsigned auto_increment,
campus_name		varchar(255),
campus_status		varchar(11) not null,

primary key (campus_ID),
check (campus_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

create table building (
campus_ID			bigint unsigned not null,
building_ID			bigint unsigned auto_increment,
building_name		varchar(255),
building_status		varchar(11) not null,

primary key (building_ID),
foreign key (campus_ID) references campus(campus_ID),
check (building_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

create table floor (
building_ID			bigint unsigned not null,
floor_ID			bigint unsigned auto_increment,
floor_number			bigint unsigned unique,
floor_status			 varchar(11) not null,

primary key (floor_ID),
foreign key (building_ID) references building(building_ID),
check (floor_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

create table zone (
floor_ID			bigint unsigned not null,
zone_ID			bigint unsigned auto_increment,
zone_number		bigint unsigned unique,
zone_status			varchar(11) not null,

primary key (zone_ID),
foreign key (floor_ID) references floor(floor_ID),
check (zone_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);

create table room (
floor_ID			bigint unsigned not null,
room_ID			bigint unsigned auto_increment,
room_number			bigint unsigned unique,
room_classification		varchar(9),
room_status			varchar(11) not null,

primary key (room_ID),
foreign key (floor_ID) references floor(floor_ID),
check (room_classification in (‘CLASSROOM’, ’FOOD’, ‘RESTROOM’, ‘ELEVATOR’, ‘STAIRS’, ‘LAB’)),
check (room_status in (‘AVAILABLE’, ’UNAVAILABLE’))
);
