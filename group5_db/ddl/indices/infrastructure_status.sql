gives the database a target to jump to when (infrastructure entity type)_status is used in a query

create index idx_campus_status on campus(campus_status);

create index idx_building_status on building(building_status);

create index idx_floor_status on floor(floor_status);

create index idx_zone_status on zone(zone_status);

create index idx_room_status on room(room_status);
