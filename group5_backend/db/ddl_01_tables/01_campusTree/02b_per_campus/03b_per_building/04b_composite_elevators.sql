CREATE TABLE transport_shaft (
    shaft_ID       BIGINT UNSIGNED AUTO_INCREMENT,
    building_ID    BIGINT UNSIGNED NOT NULL,
    transport_type VARCHAR(8) NOT NULL,
    name           VARCHAR(255) NOT NULL,

    PRIMARY KEY (shaft_ID),

    FOREIGN KEY (building_ID)
        REFERENCES building(building_ID)
        ON DELETE CASCADE,

    CHECK (transport_type IN ('ELEVATOR', 'STAIR'))
);