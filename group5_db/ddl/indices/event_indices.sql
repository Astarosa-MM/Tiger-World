-- user looking at room schedule on a given day
-- display requirements: event name, start and end time
-- date verification requirements: date
infra type, infra id, event name, start time, end time, date

infra type, infra id, date

-- user looking at their scheule on a given day
-- display requirements: location, event name, start and end time
-- date verification requirements: date
event id, infra type, infra id, event name, start time, end time, date

event id, date

____________________________________________________________
-- user_ID in many-to-many table (users and events)
create index idx_ue_user on user_events(user_ID);

-- event_ID in many-to-many table (users and events)
create index idx_ue_event on user_events(event_ID);
