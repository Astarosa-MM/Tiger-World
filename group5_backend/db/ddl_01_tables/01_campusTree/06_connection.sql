-- CONNECTION TABLE (polymorphic)
CREATE TABLE connection (
    connection_ID    BIGINT UNSIGNED AUTO_INCREMENT,
    ownerA_type      VARCHAR(10) NOT NULL, -- 'ROOM', 'HALLWAY', 'ELEVATOR', 'STAIRS', 'BUILDING'
    ownerA_ID        BIGINT UNSIGNED NOT NULL,
    ownerB_type      VARCHAR(10) NOT NULL,
    ownerB_ID        BIGINT UNSIGNED NOT NULL,
    connection_type  VARCHAR(15) NOT NULL, -- 'HALLWAY', 'DOOR', 'ELEVATOR', 'STAIRS', 'AUTO_DOOR'
    status           VARCHAR(11) NOT NULL,
    PRIMARY KEY (connection_ID),
    CHECK (connection_type IN ('HALLWAY','DOOR','ELEVATOR','STAIRS','AUTO_DOOR')),
    CHECK (status IN ('AVAILABLE','UNAVAILABLE'))
    -- Application logic enforces:
    --   * vertical connections only between elevator stops
    --   * room -> accessible hallway adjacency
    --   * hallway -> hallway adjacency
);