-- gives the database a target to jump to when infra_type, infra_ID, or event_date are used in a query
create index idx_event_date_infra on infra_events(infra_type, infra_ID, event_date);

-- gives the database a target to jump to when user_ID is used in a query
create index idx_ue_user on user_events(user_ID);

-- gives the database a target to jump to when event_ID is used in a query
create index idx_ue_event on user_events(event_ID);
