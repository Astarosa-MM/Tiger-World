create index idx_event_date_user on events(user_ID, event_date);

create index idx_event_date_infra on events(infrastructure_type, infrastructure_ID, event_date);
