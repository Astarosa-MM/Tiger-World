-- INFRA_EVENTS table

/* user looking at (infrastructure_type) schedule on a given day
 * display requirements: event name, start and end time
 * date verification requirements: date */
create index idx_infrID_details on infra_events(infra_type, infra_ID, event_name, start_time, end_time);
create index idx_infrID_date on infra_events(infra_type, infra_ID, event_date);


/* user looking at their scheule on a given day
 * display requirements: location, event name, start and end time
 * date verification requirements: date */
create index idx_eID_details on infra_events(event_ID, infra_type, infra_ID, event_name, start_time, end_time);
create index idx_eID_date on infra_events(event_ID, event_date);

-- USER_EVENTS table
-- user_ID in many-to-many table (users and events)
create index idx_ue_user on user_events(user_ID);

-- event_ID in many-to-many table (users and events)
create index idx_ue_event on user_events(event_ID);
