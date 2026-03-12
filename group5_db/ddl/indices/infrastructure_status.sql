/* retrieves value stored in
 * 'status' column of various
 * infrastructure tables
 
 * use-case example: filtering for available rooms on a given floor
 * 1) filter rooms to those in the desired building by matching building_ID
 * 2) using index, impose where status = 'AVAILABLE' condition */

create index idx_campus_status on campus(campus_status);

(building status)

(floor status)

(zone status)

(room status)
