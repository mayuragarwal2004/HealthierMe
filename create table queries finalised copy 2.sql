CREATE DATABASE HealthierMe;

CREATE TABLE HealthierMe.User (
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
    join_date DATETIME NOT NULL,
    last_active_datetime DATETIME,
    height FLOAT,
    weight FLOAT,
    profile_picture VARCHAR(255),
    notification_settings TEXT
);

CREATE TABLE HealthierMe.Community (
    community_id VARCHAR(255) PRIMARY KEY,
    community_join_code VARCHAR(6) NOT NULL,
    community_name VARCHAR(255) NOT NULL,
    locality VARCHAR(255),
    pincode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    created_by_user_id VARCHAR(255) NOT NULL,
    created_datetime DATETIME NOT NULL, 
    members_count INT DEFAULT 1,
    description TEXT, 
    access ENUM('Open', 'Admin_control', 'Predefined'),
    last_updated_datetime DATETIME
);

CREATE TABLE HealthierMe.CommunityUserMapping (
    community_user_mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    community_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    role ENUM('Member', 'Admin', 'Creator') NOT NULL,
    join_date DATETIME NOT NULL,
    last_active_datetime DATETIME,
    UNIQUE KEY unique_community_user (community_id, user_id), -- Ensures each user can have only one role per community
    FOREIGN KEY (community_id) REFERENCES Community(community_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE HealthierMe.Seasons (
    season_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    num_challenges INT,
    active BOOLEAN DEFAULT false,
    created_by_user_id VARCHAR(255), -- Optional, if applicable
    created_datetime DATETIME NOT NULL,
    last_updated_datetime DATETIME,
    description TEXT,
    min_to_comply INT /* less than num_challenges */
);

CREATE TABLE HealthierMe.CommunitySeasonMapping (
    community_season_mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    community_id VARCHAR(255) NOT NULL,
    season_id VARCHAR(255) NOT NULL,
    join_date DATETIME NOT NULL,
    UNIQUE KEY unique_community_season (community_id, season_id), -- Ensures each community can have only one entry per season
    FOREIGN KEY (community_id) REFERENCES Community(community_id), -- Assuming you have a "Community" table
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id) /* -- Assuming you have a "Seasons" table */
);

CREATE TABLE HealthierMe.Challenges (
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
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id)
);

CREATE TABLE HealthierMe.Activities (
    activity_id VARCHAR(255) PRIMARY KEY,
    activity_name VARCHAR(255) NOT NULL,
    challenge_id VARCHAR(255) NOT NULL,
    activity_type ENUM('Task', 'Event', 'Group') NOT NULL,
    num_options INT, -- Only when activity_type = 'Options'
    min_to_complete INT, -- Only when activity_type = 'Options'
    sub_activities JSON, -- Store as JSON or serialized data, depending on the database capabilities
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id)
);

CREATE TABLE HealthierMe.Tasks (
    task_id VARCHAR(255) PRIMARY KEY,
    activity_id VARCHAR(255) NOT NULL,
    challenge_id VARCHAR(255) NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    task_quantity INT,
    task_unit VARCHAR(50),
    task_period INT,
    task_period_unit ENUM('day', 'month'),
    task_number INT,
    times_to_complete INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id)
);

CREATE TABLE HealthierMe.Events (
    event_id VARCHAR(255) PRIMARY KEY,
    activity_id VARCHAR(255) NOT NULL,
    challenge_id VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    start_date DATE,
    end_date DATE,
    event_frequency INT,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id)
);

CREATE TABLE HealthierMe.Group (
    group_id VARCHAR(255) PRIMARY KEY,
    num_opts INT,
    min_to_comp INT,
    activity JSON -- Store as JSON or serialized data, depending on the database capabilities
);

CREATE TABLE HealthierMe.ActivityStatus (
    user_id VARCHAR(255) NOT NULL,
    challenge_id VARCHAR(255) NOT NULL,
    activity_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    timestamp DATETIME NOT NULL,
    quantity INT,
    PRIMARY KEY (user_id, challenge_id, activity_id, date),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (activity_id) REFERENCES Activities(activity_id)
);
