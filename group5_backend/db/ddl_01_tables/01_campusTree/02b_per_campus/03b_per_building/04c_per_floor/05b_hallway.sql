CREATE TABLE hallway (
    floor_ID      BIGINT UNSIGNED NOT NULL,
    hallway_ID    BIGINT UNSIGNED AUTO_INCREMENT,
    hallway_name  VARCHAR(255),
    status        VARCHAR(11) NOT NULL,

    PRIMARY KEY (hallway_ID),

    FOREIGN KEY (floor_ID)
        REFERENCES floor(floor_ID)
        ON DELETE CASCADE,

    CHECK (status IN ('AVAILABLE', 'UNAVAILABLE'))
);