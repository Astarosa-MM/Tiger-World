create table vertices (
vertex_owner_type			varchar(8),
vertex_owner_ID			bigint unsigned,

vertex_ID				bigint unsigned auto_increment,
vertex_type				varchar(9),
x_coordinate				numeric (6,4),
y_coordinate				numeric (7,4),

primary key (vertex_ID),
check (vertex_owner_type in (‘CAMPUS’, ‘BUILDING’, ‘FLOOR’, ‘ZONE’, ‘ROOM’)),
check (vertex_type in (‘PERIMETER’, ’CENTROID’))
);

(edges)
