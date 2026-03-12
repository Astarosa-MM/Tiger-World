/* retrieves value stored in
 * 'status' column of various
 * infrastructure tables
 
 * use-case example:
 * filtering available rooms
 * on a given floor,
 * match building ID of current building
 * to 'building ID' in room,
 * impose where status = 'AVAILABLE' condition*/

(campus status)

(building status)

(floor status)

(zone status)

(room status)