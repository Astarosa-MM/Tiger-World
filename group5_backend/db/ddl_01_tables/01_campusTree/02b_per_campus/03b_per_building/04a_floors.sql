create table floor (
building_ID			bigint unsigned not null,
floor_ID			bigint unsigned auto_increment,
floor_number			bigint unsigned,
floor_status			 varchar(11) not null,

primary key (floor_ID),
foreign key (building_ID) references building(building_ID),
unique(building_ID, floor_number),
check (floor_status in ('AVAILABLE', 'UNAVAILABLE'))
);