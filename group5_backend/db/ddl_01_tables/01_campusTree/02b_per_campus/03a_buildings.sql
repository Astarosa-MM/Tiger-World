create table building (
campus_ID			bigint unsigned not null,
building_ID			bigint unsigned auto_increment,
building_name		varchar(255),
building_status		varchar(11) not null,

primary key (building_ID),
foreign key (campus_ID) references campus(campus_ID),
check (building_status in ('AVAILABLE', 'UNAVAILABLE'))
);