create table campus (
campus_ID			bigint unsigned auto_increment,
campus_name         varchar(255),
campus_status		varchar(11) not null,

primary key (campus_ID),
check (campus_status in ('AVAILABLE', 'UNAVAILABLE'))
);