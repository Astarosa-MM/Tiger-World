/* retrieves value stored in
 * 'status' column of various
 * infrastructure tables
 
 * use-case example: filtering for available rooms on a given floor
 * 1) filter rooms to those in the desired building by matching building_ID
 * 2) using index, impose where status = 'AVAILABLE' condition */

create index idx_campus_status on campus(campus_status);

create index idx_building_status on building(building_status);

create index idx_floor_status on floor(floor_status);

create index idx_zone_status on zone(zone_status);

(room status)
