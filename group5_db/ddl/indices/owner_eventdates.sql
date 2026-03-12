/* indices support:
 * - user_ID -> quickly retrieve all events for a specific user
 * - infrastructure_type + infrastructure_ID -> quickly retrieve all events for a specific infrastructure entity

 * - event_date -> allows filtering over single days or date ranges (between) for both user and infrastructure queries */

create index idx_event_date_user on events(user_ID, event_date);

create index idx_event_date_infra on events(infrastructure_type, infrastructure_ID, event_date);
