CREATE TABLE room (
    floor_ID             BIGINT UNSIGNED NOT NULL,
    room_ID              BIGINT UNSIGNED AUTO_INCREMENT,
    room_number          BIGINT UNSIGNED,
    room_classification  VARCHAR(9),
    room_status          VARCHAR(11) NOT NULL,

    PRIMARY KEY (room_ID),

    FOREIGN KEY (floor_ID)
        REFERENCES floor(floor_ID)
        ON DELETE CASCADE,

    UNIQUE (floor_ID, room_number),

    CHECK (room_classification IN ('CLASSROOM', 'FOOD', 'RESTROOM', 'LAB')),
    CHECK (room_status IN ('AVAILABLE', 'UNAVAILABLE'))
);