/* when infrastructure owns an event, userID -> null */

/* Event assignment workflow:
 * - When a user adds an event to an infrastructure for the first time, the event is created for that infrastructure with user_ID = NULL.
 * - Other users can then add the same event to their schedule.
 *   This creates a duplicate row with the same infrastructure, date, and event details, but with user_ID set to the user who added it.
 * - This ensures infrastructure events remain unique per details while allowing multiple users to associate themselves with the same event.
 */

create table events (
user_ID		bigint unsigned,
infrastructure_ID		bigint unsigned not null,
infrastructure_type		char(4) not null,

event_ID		bigint unsigned auto_increment,
event_name		varchar(255), 
start_time		time,
end_time		time,
event_date		date,

primary key (event_ID),
foreign key (user_ID) references user_info(user_ID),
check(infrastructure_type in ('CAMPUS', 'BUILDING', 'FLOOR', 'ZONE', 'ROOM')),
unique(infrastructure_type, infrastructure_ID, event_date, start_time, end_time, event_name)
);
