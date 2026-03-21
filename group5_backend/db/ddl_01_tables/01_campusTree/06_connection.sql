CREATE TABLE connection (
    connection_ID    BIGINT UNSIGNED AUTO_INCREMENT,

    ownerA_type      VARCHAR(10) NOT NULL, -- 'ROOM','HALLWAY','STOP'
    ownerA_ID        BIGINT UNSIGNED NOT NULL,

    ownerB_type      VARCHAR(10) NOT NULL,
    ownerB_ID        BIGINT UNSIGNED NOT NULL,

    connection_type  VARCHAR(15) NOT NULL, -- 'DOOR','AUTO_DOOR','HALLWAY','VERTICAL'
    status           VARCHAR(11) NOT NULL, -- 'AVAILABLE','UNAVAILABLE'

    PRIMARY KEY (connection_ID),

    UNIQUE (ownerA_type, ownerA_ID, ownerB_type, ownerB_ID, connection_type),

    CHECK (ownerA_type IN ('ROOM','HALLWAY','STOP')),
    CHECK (ownerB_type IN ('ROOM','HALLWAY','STOP')),

    CHECK (connection_type IN ('DOOR','AUTO_DOOR','HALLWAY','VERTICAL')),
    CHECK (status IN ('AVAILABLE','UNAVAILABLE')),

    -- enforce undirected canonical ordering
    /* This works because MySQL compares strings lexicographically.
     * Just be aware this makes type ordering matter alphabetically. That is fine as long as you never rename types. */
    CHECK (
        ownerA_type < ownerB_type OR
        (ownerA_type = ownerB_type AND ownerA_ID < ownerB_ID)
    )
);
