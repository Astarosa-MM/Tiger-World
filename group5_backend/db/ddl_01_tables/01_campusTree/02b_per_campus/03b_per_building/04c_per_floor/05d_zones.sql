create table zone (
floor_ID			bigint unsigned not null,
zone_ID			bigint unsigned auto_increment,
zone_number		bigint unsigned,
zone_status			varchar(11) not null,

primary key (zone_ID),
foreign key (floor_ID) references floor(floor_ID),
unique(floor_ID, zone_number),
check (zone_status in ('AVAILABLE', 'UNAVAILABLE'))
);