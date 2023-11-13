CREATE DATABASE HealthierMe;

CREATE TABLE HealthierMe.User (
    user_id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    -- address VARCHAR(500),
    locality VARCHAR(255) NOT NULL,
    pincode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_active_datetime DATETIME ,
    height FLOAT,
    weight FLOAT,
    profile_picture VARCHAR(255),
    notification_settings TEXT,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE HealthierMe.Community (
    community_id VARCHAR(255) PRIMARY KEY,
    community_join_code VARCHAR(6) NOT NULL,
    community_name VARCHAR(255) NOT NULL,
    locality VARCHAR(255) NOT NULL,
    pincode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    created_by_user_id VARCHAR(255) NOT NULL,
    members_count INT DEFAULT 1,                    -- has to be updated
    description TEXT, 
    access ENUM('Open', 'Admin_control', 'Predefined'), -- avoided for now
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (created_by_user_id) REFERENCES User(user_id)

);

CREATE TABLE HealthierMe.CommunityUserMapping (
    community_user_mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    community_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    role ENUM('Member', 'Admin', 'Creator') NOT NULL,
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- last_active_datetime DATETIME,          not needed
    deleted BOOLEAN DEFAULT false,
    UNIQUE KEY unique_community_user (community_id, user_id), -- Ensures each user can have only one role per community
    FOREIGN KEY (community_id) REFERENCES Community(community_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE HealthierMe.Seasons (
    season_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    num_challenges INT,             -- has to be updated with every challenge
    active BOOLEAN DEFAULT false,
    created_by_user_id VARCHAR(255), -- Optional, if applicable
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false
    -- min_to_comply INT /* less than num_challenges */ not applicable
);

CREATE TABLE HealthierMe.CommunitySeasonMapping (
    community_season_mapping_id INT PRIMARY KEY AUTO_INCREMENT,
    community_id VARCHAR(255) NOT NULL,
    season_id VARCHAR(255) NOT NULL,
    join_date DATETIME NOT NULL,
    deleted BOOLEAN DEFAULT false,
    UNIQUE KEY unique_community_season (community_id, season_id), -- Ensures each community can have only one entry per season
    FOREIGN KEY (community_id) REFERENCES Community(community_id), -- Assuming you have a "Community" table
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id) /* -- Assuming you have a "Seasons" table */
);

CREATE TABLE HealthierMe.Challenges (
    challenge_id VARCHAR(255) PRIMARY KEY,
    created_by VARCHAR(255) NOT NULL,   -- created by - check if he's admin/creator
    challenge_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    season_id VARCHAR(255), 
    active BOOLEAN DEFAULT false, 
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (created_by) REFERENCES User(user_id),
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id)
);

CREATE TABLE HealthierMe.Groups (
    g_id VARCHAR(255) PRIMARY KEY,
    g_name VARCHAR(255),
    challenge_id VARCHAR(255) NOT NULL,
    num_opts INT,
    min_to_comp INT,
    -- activity JSON, -- Store as JSON or serialized data, depending on the database capabilities *not needed*
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id)
);

CREATE TABLE HealthierMe.Tasks (
    task_id VARCHAR(255) PRIMARY KEY,
    challenge_id VARCHAR(255) NOT NULL,
    g_id VARCHAR(255),
    task_name VARCHAR(255) NOT NULL,
    task_description TEXT,
    task_quantity INT,
    task_unit VARCHAR(50),
    -- task_period INT, --not needed
    task_period_unit ENUM('daily', 'monthly', 'yearly'),
    -- task_number INT, --not needed
    times_to_complete INT,
    start_date DATE,
    end_date DATE,
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (g_id) REFERENCES HealthierMe.Groups(g_id) -- check to not create problems in referencing blanks
);

CREATE TABLE HealthierMe.Events (
    event_id VARCHAR(255) PRIMARY KEY,
    challenge_id VARCHAR(255) NOT NULL,
    g_id VARCHAR(255),
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT,
    start_date DATE,
    end_date DATE,
    event_frequency INT,
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id),
    FOREIGN KEY (g_id) REFERENCES HealthierMe.Groups(g_id)
);

CREATE TABLE HealthierMe.ActivityStatus (
    user_id VARCHAR(255) NOT NULL,
    -- challenge_id VARCHAR(255) NOT NULL,
    activity_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    timestamp DATETIME NOT NULL,
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    quantity INT,
    deleted BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id, activity_id, timestamp), -- challenge id not needed, date replaced by timestamp
    FOREIGN KEY (user_id) REFERENCES User(user_id)
    -- FOREIGN KEY (challenge_id) REFERENCES Challenges(challenge_id)
);

CREATE TABLE HealthierMe.Test (
    test_id INT PRIMARY KEY AUTO_INCREMENT,
    test_name VARCHAR(255) NOT NULL,
    test_description TEXT,
    created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO HealthierMe.Test (test_name, test_description) VALUES ('Test1', 'Test1 description');