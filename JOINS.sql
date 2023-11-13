-- Equijoin:
-- Retrieve all tasks and their associated challenge names.

SELECT t.task_id, t.task_name, c.challenge_name
FROM Tasks t
INNER JOIN Challenges c ON t.challenge_id = c.challenge_id;



-- Non-Equijoin:
-- Retrieve users and their associated communities based on a non-matching condition.

SELECT u.user_id, u.first_name, u.last_name, c.community_name
FROM User u
LEFT JOIN CommunityUserMapping cu ON u.user_id = cu.user_id
LEFT JOIN Community c ON cu.community_id = c.community_id AND c.city != u.city;


-- Self-Join:
-- Find communities that share the same city.

SELECT c1.community_name AS community1, c2.community_name AS community2
FROM Community c1
JOIN Community c2 ON c1.city = c2.city AND c1.community_id != c2.community_id;


-- Natural Join:
-- Retrieve users and their associated communities using a natural join.
SELECT u.user_id, u.first_name, u.last_name, c.community_name
FROM User u
NATURAL JOIN CommunityUserMapping cu
NATURAL JOIN Community c;


-- Outer Join:
-- List users and their associated tasks, including users without tasks.
SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS full_name, t.task_name
FROM User u
LEFT JOIN ActivityStatus ast ON u.user_id = ast.user_id
LEFT JOIN Tasks t ON ast.activity_id = t.task_id;