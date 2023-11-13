Access the Chat GPT conversation here:
https://chat.openai.com/share/ff5c20f2-9b9d-412f-83d6-5228b7e7a156

many to many tables
community - users : clustered indexing
active season - users : 

index tables - clustered -- are column names redundant here?
seasons table : community ids 
challenge table : season ids
activity table : challenge ids



CREATE TABLE healthierme.User (
    user_id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    dob DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address VARCHAR(500),
    locality VARCHAR(255) NOT NULL,
    pincode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    community_ids JSON,
    community_heads_ids JSON,
    community_creator_ids JSON,
    active_season_ids JSON,
    join_date DATETIME NOT NULL,
    last_active_datetime DATETIME,
    height FLOAT,
    weight FLOAT,
    profile_picture VARCHAR(255),
    notification_settings TEXT
);

CREATE INDEX idx_phone ON User (phone);




CREATE TABLE Community (
    community_id VARCHAR(255) PRIMARY KEY,
    community_join_code VARCHAR(255) NOT NULL,
    community_name VARCHAR(255) NOT NULL,
    locality VARCHAR(255),
    pincode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    created_by_user_id VARCHAR(255) NOT NULL,
    community_heads_user_id JSON , -- table needed?
    created_datetime DATETIME NOT NULL, 
    members_count INT DEFAULT 1,
    description TEXT, 
    parent JSON,
    children JSON,
    access ENUM('Open', 'Admin_control', 'Predefined'),
    last_updated_datetime DATETIME 
);

CREATE UNIQUE INDEX idx_community_id ON Community (community_id);
CREATE INDEX idx_community_heads_user_id ON Community (community_heads_user_id);
CREATE INDEX idx_created_by_user_id ON Community (created_by_user_id);
CREATE INDEX idx_community_name ON Community (community_name);


CREATE TABLE CommunityUserMapping (
    community_user_mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    community_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    role ENUM('Member', 'Admin', 'Head') NOT NULL,
    join_date DATETIME NOT NULL,
    last_active_datetime DATETIME,
    UNIQUE KEY unique_community_user (community_id, user_id), -- Ensures each user can have only one role per community
    FOREIGN KEY (community_id) REFERENCES Community(community_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);


-- many to many change respectively
CREATE TABLE Seasons (
    season_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    num_challenges INT,
    active BOOLEAN DEFAULT false,
    community_id JSON, -- check for tables
    created_by_user_id VARCHAR(255), -- Optional, if applicable
    created_datetime DATETIME NOT NULL,
    last_updated_datetime DATETIME,
    description TEXT,
    min_to_comply INT, --less than num_challenges    
);

CREATE UNIQUE INDEX idx_season_id ON Seasons (season_id);
CREATE INDEX idx_start_date ON Seasons (start_date);
CREATE INDEX idx_end_date ON Seasons (end_date);


CREATE TABLE CommunitySeasonMapping (
    community_season_mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    community_id VARCHAR(255) NOT NULL,
    season_id VARCHAR(255) NOT NULL,
    join_date DATETIME NOT NULL,
    UNIQUE KEY unique_community_season (community_id, season_id), -- Ensures each community can have only one entry per season
    FOREIGN KEY (community_id) REFERENCES Community(community_id), -- Assuming you have a "Community" table
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id) -- Assuming you have a "Seasons" table
);


CREATE TABLE Challenges (
    challenge_id VARCHAR(255) PRIMARY KEY,
    community_head_user_id VARCHAR(255) NOT NULL,
    challenge_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_datetime DATETIME NOT NULL,
    season_id VARCHAR(255),
    active BOOLEAN DEFAULT false,
    last_updated_datetime DATETIME,
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id),
);

CREATE UNIQUE INDEX idx_challenge_id ON Challenge (challenge_id);
CREATE INDEX idx_start_date ON Challenge (start_date);
CREATE INDEX idx_end_date ON Challenge (end_date);
CREATE INDEX idx_active ON Challenge (active);




CREATE TABLE Activities (
    activity_id INT PRIMARY KEY,
    activity_name VARCHAR(255) NOT NULL,
    activity_type ENUM('Task', 'Event', 'Group') NOT NULL,
    num_options INT, -- Only when activity_type = 'Options'
    min_to_complete INT, -- Only when activity_type = 'Options'
    sub_activities JSON -- Store as JSON or serialized data, depending on the database capabilities
);
CREATE UNIQUE INDEX idx_activity_id ON Activities (activity_id);





CREATE TABLE Tasks (
    activity_id VARCHAR(255) PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    task_quantity INT,
    task_unit VARCHAR(50),
    task_period INT,
    task_period_unit ENUM('day', 'month'),
    task_number INT,
    times_to_complete INT,
    start_date DATE,
    end_date DATE
    challenge_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
);
CREATE INDEX idx_task_activity_id ON Task (activity_id);
CREATE INDEX idx_task_start_date ON Task (start_date);
CREATE INDEX idx_task_end_date ON Task (end_date);


CREATE TABLE Events (
    activity_id VARCHAR(255) PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    start_date DATE,
    end_date DATE,
    event_frequency INT
    challenge_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
);
CREATE INDEX idx_event_activity_id ON Event (activity_id);
CREATE INDEX idx_event_start_date ON Event (start_date);
CREATE INDEX idx_event_end_date ON Event (end_date);

CREATE TABLE Group (
    group_id VARCHAR(255) PRIMARY KEY,
    num_opts INT,
    min_to_comp INT,
    activity JSON -- Store as JSON or serialized data, depending on the database capabilities
);
CREATE UNIQUE INDEX idx_group_id ON Group (group_id);




CREATE TABLE ActivityStatus (
    user_id INT NOT NULL,
    challenge_id INT NOT NULL,
    activity_id INT NOT NULL,
    date DATE NOT NULL,
    timestamp DATETIME NOT NULL,
    quantity INT,
    PRIMARY KEY (user_id, challenge_id, activity_id, date)
);
CREATE UNIQUE INDEX idx_activity_status_pk ON ActivityStatus (user_id, challenge_id, activity_id, date);
CREATE INDEX idx_activity_status_user_id ON ActivityStatus (user_id);
CREATE INDEX idx_activity_status_challenge_id ON ActivityStatus (challenge_id);
CREATE INDEX idx_activity_status_activity_id ON ActivityStatus (activity_id);
CREATE INDEX idx_activity_status_date ON ActivityStatus (date);
