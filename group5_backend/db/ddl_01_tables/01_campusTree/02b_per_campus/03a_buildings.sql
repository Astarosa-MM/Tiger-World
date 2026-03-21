CREATE TABLE building (
    campus_ID       BIGINT UNSIGNED NOT NULL,
    building_ID     BIGINT UNSIGNED AUTO_INCREMENT,
    building_name   VARCHAR(255),
    building_status VARCHAR(11) NOT NULL,

    PRIMARY KEY (building_ID),
    FOREIGN KEY (campus_ID)
        REFERENCES campus(campus_ID)
        ON DELETE CASCADE,

    CHECK (building_status IN ('AVAILABLE', 'UNAVAILABLE'))
);