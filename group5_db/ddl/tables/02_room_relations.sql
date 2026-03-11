create table room_adjacency (
room_A_ID			bigint unsigned,
room_B_ID			bigint unsigned,
connection_type		varchar(8),

primary key (room_A_ID, room_B_ID, connection_type),
foreign key (room_A_ID) references room(room_ID),
foreign key (room_B_ID) references room(room_ID),

check (connection_type in ('VERTICAL', 'LATERAL')),
check (room_A_ID <> room_B_ID)
);

create table room_to_zone (
room_ID		bigint unsigned,
zone_ID		bigint unsigned,

primary key (room_ID, zone_ID),
foreign key (room_ID) references room(room_ID),
foreign key (zone_ID) references zone(zone_ID)
);
