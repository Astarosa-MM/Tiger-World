-- gives the database a target to jump to when (infrastructure_entity_type)_status is used in a query

create index idx_campus_status on campus(campus_ID, campus_status);

create index idx_building_status on building(building_ID, building_status);

create index idx_floor_status on floor(floor_ID, floor_status);

create index idx_zone_status on zone(zone_ID, zone_status);

create index idx_room_status on room(room_ID, room_status);
create index idx_room_number on room(room_ID, room_number);
create index idx_room_classification on room(room_ID, room_classification);
