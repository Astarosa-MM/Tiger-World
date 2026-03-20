create table transport_shaft (
    shaft_ID        bigint unsigned auto_increment,
    building_ID     bigint unsigned not null,
    transport_type  varchar(8) not null,

    primary key (shaft_ID),
    foreign key (building_ID) references building(building_ID),

    check (transport_type in ('ELEVATOR', 'STAIR'))
);