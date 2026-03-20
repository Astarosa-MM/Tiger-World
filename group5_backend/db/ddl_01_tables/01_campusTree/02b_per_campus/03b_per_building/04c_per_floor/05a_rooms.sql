create table room (
floor_ID			bigint unsigned not null,
room_ID			bigint unsigned auto_increment,
room_number			bigint unsigned,
room_classification		varchar(9),
room_status			varchar(11) not null,

primary key (room_ID),
foreign key (floor_ID) references floor(floor_ID),
unique(floor_ID, room_number),
check (room_classification in ('CLASSROOM', 'FOOD', 'RESTROOM', 'LAB')),
check (room_status in ('AVAILABLE', 'UNAVAILABLE'))
);