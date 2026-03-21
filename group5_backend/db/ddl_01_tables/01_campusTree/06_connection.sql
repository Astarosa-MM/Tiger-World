CREATE TABLE connection (
    ownerA_type ENUM('ROOM','HALLWAY','STOP','CAMPUS') NOT NULL,
    ownerA_id BIGINT UNSIGNED NOT NULL,
    ownerB_type ENUM('ROOM','HALLWAY','STOP','CAMPUS') NOT NULL,
    ownerB_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (ownerA_type, ownerA_id, ownerB_type, ownerB_id),

    -- enforce undirected canonical ordering
    /* This works because MySQL compares strings lexicographically.
     * Just be aware this makes type ordering matter alphabetically. That is fine as long as you never rename types. */
    CHECK (
        ownerA_type < ownerB_type OR
        (ownerA_type = ownerB_type AND ownerA_ID < ownerB_ID)
    )
);