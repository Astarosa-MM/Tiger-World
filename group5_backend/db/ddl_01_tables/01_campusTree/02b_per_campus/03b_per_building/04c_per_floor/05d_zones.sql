CREATE TABLE zone (
    floor_ID     BIGINT UNSIGNED NOT NULL,
    zone_ID      BIGINT UNSIGNED AUTO_INCREMENT,
    zone_number  BIGINT UNSIGNED NOT NULL,
    name         VARCHAR(255) NOT NULL,
    zone_status  VARCHAR(11) NOT NULL,

    PRIMARY KEY (zone_ID),

    FOREIGN KEY (floor_ID)
        REFERENCES floor(floor_ID)
        ON DELETE CASCADE,

    UNIQUE (floor_ID, zone_number),

    CHECK (zone_status IN ('AVAILABLE', 'UNAVAILABLE'))
);

CREATE TABLE zone_room (
    zone_ID BIGINT UNSIGNED NOT NULL,
    room_ID BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (zone_ID, room_ID),

    FOREIGN KEY (zone_ID)
        REFERENCES zone(zone_ID)
        ON DELETE CASCADE,

    FOREIGN KEY (room_ID)
        REFERENCES room(room_ID)
        ON DELETE CASCADE
);