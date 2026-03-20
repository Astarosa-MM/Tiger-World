-- HALLWAY TABLE
CREATE TABLE hallway (
    hallway_ID       BIGINT UNSIGNED AUTO_INCREMENT,
    hallway_name     VARCHAR(255),
    status           VARCHAR(11) NOT NULL,
    PRIMARY KEY (hallway_ID),
    CHECK (status IN ('AVAILABLE','UNAVAILABLE'))
);

-- WORKFLOW / NOTES:
-- 1. Each hallway is a single, straight path; no internal forks.
--    If a fork is needed, create a new hallway.
-- 2. Place hallways first on the map.
-- 3. Rooms will later connect to accessible hallways via the `connection` table.
-- 4. Hallways act as the “spine” for lateral adjacency in pathfinding.
-- 5. Only hallways marked as 'AVAILABLE' should be used for pathfinding.