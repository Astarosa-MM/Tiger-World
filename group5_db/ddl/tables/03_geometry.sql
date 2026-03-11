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

create table edges (
vertex_A_ID			bigint unsigned,
vertex_B_ID			bigint unsigned,
curvature_value		int,

primary key (vertex_A_ID, vertex_B_ID),
foreign key (vertex_A_ID) references vertices(vertex_ID),
foreign key (vertex_B_ID) references vertices(vertex_ID),
check (curvature_value >= 1 and curvature_value <= 5)
);
