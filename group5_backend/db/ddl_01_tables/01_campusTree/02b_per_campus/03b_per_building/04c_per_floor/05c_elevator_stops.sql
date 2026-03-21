CREATE TABLE transport_stop (
    stop_id   BIGINT UNSIGNED AUTO_INCREMENT,
    shaft_id  BIGINT UNSIGNED NOT NULL,
    floor_id  BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (stop_id),

    UNIQUE (shaft_id, floor_id),

    FOREIGN KEY (shaft_id) REFERENCES transport_shaft(shaft_id),
    FOREIGN KEY (floor_id) REFERENCES floor(floor_id)
);