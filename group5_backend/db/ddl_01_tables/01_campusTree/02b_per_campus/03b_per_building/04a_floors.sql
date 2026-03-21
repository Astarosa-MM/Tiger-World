CREATE TABLE floor (
    building_ID   BIGINT UNSIGNED NOT NULL,
    floor_ID      BIGINT UNSIGNED AUTO_INCREMENT,
    floor_number  BIGINT UNSIGNED NOT NULL,
    name          VARCHAR(255) NOT NULL,
    floor_status  VARCHAR(11) NOT NULL,

    PRIMARY KEY (floor_ID),

    FOREIGN KEY (building_ID)
        REFERENCES building(building_ID)
        ON DELETE CASCADE,

    UNIQUE (building_ID, floor_number),

    CHECK (floor_status IN ('AVAILABLE', 'UNAVAILABLE'))
);