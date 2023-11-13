-- Create a view to display basic user information:
CREATE VIEW UserBasicInfo AS
SELECT user_id, first_name, last_name, email, phone
FROM HealthierMe.User;

-- Create a view to list active challenges in a season:
CREATE VIEW ActiveSeasonChallenges AS
SELECT s.season_id, s.name, ch.challenge_name, ch.start_date, ch.end_date
FROM HealthierMe.Seasons s
JOIN HealthierMe.Challenges ch ON s.season_id = ch.season_id
WHERE ch.active = true;

-- Create a view to show community members and their roles:
CREATE VIEW CommunityMembers AS
SELECT cm.community_id, u.first_name, u.last_name, cm.role
FROM HealthierMe.CommunityUserMapping cm
JOIN HealthierMe.User u ON cm.user_id = u.user_id;

-- Create a view to display upcoming events for a challenge:
CREATE VIEW UpcomingChallengeEvents AS
SELECT ch.challenge_id, e.event_name, e.start_date, e.end_date
FROM HealthierMe.Challenges ch
JOIN HealthierMe.Events e ON ch.challenge_id = e.challenge_id
WHERE e.start_date >= CURDATE();

-- Create a view to list users with their total completed tasks in a challenge:
CREATE VIEW UserCompletedTasks AS
SELECT u.user_id, u.first_name, u.last_name, ch.challenge_name, COUNT(*) AS completed_tasks
FROM HealthierMe.User u
JOIN HealthierMe.ActivityStatus a ON u.user_id = a.user_id
JOIN HealthierMe.Challenges ch ON a.challenge_id = ch.challenge_id
WHERE a.quantity >= (
    SELECT MIN(t.task_quantity)
    FROM HealthierMe.Tasks t
    WHERE t.challenge_id = ch.challenge_id
)
GROUP BY u.user_id, ch.challenge_name;

-- Create a view to display the list of communities created by each user:
CREATE VIEW UserCreatedCommunities AS
SELECT u.user_id, u.first_name, u.last_name, c.community_name
FROM HealthierMe.User u
JOIN HealthierMe.Community c ON u.user_id = c.created_by_user_id;

-- Create a view to show the average completion rate for tasks in each challenge:
CREATE VIEW ChallengeAvgCompletion AS
SELECT ch.challenge_id, ch.challenge_name, AVG(a.quantity) AS avg_completion_rate
FROM HealthierMe.Challenges ch
LEFT JOIN HealthierMe.ActivityStatus a ON ch.challenge_id = a.challenge_id
GROUP BY ch.challenge_id, ch.challenge_name;

-- Create a view to display users' activity history in a specific challenge:
CREATE VIEW UserChallengeActivity AS
SELECT u.user_id, u.first_name, u.last_name, ch.challenge_name, a.date, a.quantity
FROM HealthierMe.User u
JOIN HealthierMe.ActivityStatus a ON u.user_id = a.user_id
JOIN HealthierMe.Challenges ch ON a.challenge_id = ch.challenge_id
WHERE ch.challenge_id = 'your_challenge_id_here';

-- Create a view to show the most active communities based on the number of members:
CREATE VIEW MostActiveCommunities AS
SELECT c.community_id, c.community_name, COUNT(cm.user_id) AS member_count
FROM HealthierMe.Community c
LEFT JOIN HealthierMe.CommunityUserMapping cm ON c.community_id = cm.community_id
GROUP BY c.community_id, c.community_name
ORDER BY member_count DESC;

-- Create a view to display the upcoming seasons and associated challenges:
CREATE VIEW UpcomingSeasonChallenges AS
SELECT s.season_id, s.name AS season_name, s.start_date AS season_start_date,
       ch.challenge_id, ch.challenge_name, ch.start_date AS challenge_start_date, ch.end_date AS challenge_end_date
FROM HealthierMe.Seasons s
JOIN HealthierMe.CommunitySeasonMapping csm ON s.season_id = csm.season_id
JOIN HealthierMe.Challenges ch ON csm.community_id = ch.community_id;















CREATE VIEW ActiveChallengesView AS
SELECT
    c.challenge_id,
    c.challenge_name,
    c.start_date,
    c.end_date
FROM Challenges c
WHERE c.active = true;


CREATE VIEW ChallengeStatsView AS
SELECT
    c.challenge_id,
    c.challenge_name,
    COUNT(DISTINCT cu.user_id) AS total_participants,
    SUM(ast.quantity) AS total_completed,
    COUNT(ast.user_id) AS participants_with_activity
FROM Challenges c
LEFT JOIN CommunityUserMapping cu ON c.challenge_id = cu.community_id
LEFT JOIN ActivityStatus ast ON c.challenge_id = ast.challenge_id
GROUP BY c.challenge_id, c.challenge_name;


CREATE VIEW UserActivitiesView AS
SELECT
    a.user_id,
    u.name,
    a.challenge_id,
    c.challenge_name,
    a.activity_id,
    a.activity_type,
    a.date,
    a.timestamp,
    a.quantity
FROM
    ActivityStatus a
JOIN
    User u ON a.user_id = u.user_id
JOIN
    Challenge c ON a.challenge_id = c.challenge_id;