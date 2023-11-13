
-- User 1
INSERT INTO `User` 
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`) 
VALUES 
('6Z9Jp5dgq9YkzhkPOhGCf63yjQx2', 'Mayur', 'Agarwal', 'Manoj', 'mayur.agarwal22@vit.edu', '9921318237', '2004-07-05', 'Male', '3, Pancharatna, Burhani Colony', 'Market Yard', '411037', 'Pune', 'Maharashtra','2023-08-18 05:22:26.000000', NULL, NULL, NULL, NULL, NULL);

-- User 2
INSERT INTO `User` 
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`) 
VALUES 
('defxyz','Nujaim', 'Maindargi', 'Qadeer', 'nujaim.maindargi22@vit.edu', '7249529493', '2005-03-31', 'Male', '3, bibwewadi, sate bank nagar Colony', 'Indira Nagar', '411037', 'Pune', 'Maharashtra','2023-08-18 05:23:26.000000', NULL, NULL, NULL, NULL, NULL);

-- User 3
INSERT INTO `User` 
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`) 
VALUES 
('ghixyz', 'manesh', 'mahale', 'dilip', 'manesh.mahale22@vit.edu', '8767619678', '2003-05-10', 'Male', '5, bibwewadi, sate bank nagar Colony', 'Indira Nagar', '411037', 'Pune', 'Maharashtra','2023-08-18 05:24:26.000000', NULL, NULL, NULL, NULL, NULL);

-- User 4
INSERT INTO `User`
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`)
VALUES
('pqr123', 'Anita', 'Mishra', 'N/A', 'anita.mishra@example.com', '7654321098', '1988-12-03', 'Female', '8, Rose Garden', 'Aundh', '411007', 'Pune', 'Maharashtra', '2023-08-23 13:45:00.000000', NULL, NULL, NULL, NULL, NULL);

-- User 5
INSERT INTO `User`
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`)
VALUES
('def123', 'Sneha', 'Sharma', 'N/A', 'sneha.sharma@example.com', '9876543210', '1990-03-15', 'Female', '45, Sunshine Avenue', 'Koregaon Park', '411001', 'Pune', 'Maharashtra', '2023-08-19 09:45:00.000000', NULL, NULL, NULL, NULL, NULL);

-- User 6
INSERT INTO `User`
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`)
VALUES
('ghi789', 'Rahul', 'Verma', 'Kumar', 'rahul.verma@example.com', '8765432109', '1985-11-25', 'Male', '12, Green Gardens', 'Baner', '411045', 'Pune', 'Maharashtra', '2023-08-20 14:20:00.000000', NULL, NULL, NULL, NULL, NULL);

-- User 7
INSERT INTO `User`
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`)
VALUES
('jkl456', 'Neha', 'Patil', 'Rajesh', 'neha.patil@example.com', '7890123456', '2000-09-10', 'Female', '7, Lakeview Apartments', 'Wakad', '411057', 'Pune', 'Maharashtra', '2023-08-21 17:10:00.000000', NULL, NULL, NULL, NULL, NULL);

-- User 8
INSERT INTO `User`
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`)
VALUES
('mno789', 'Amit', 'Gupta', 'Kumar', 'amit.gupta@example.com', '8761234567', '1997-04-30', 'Male', '29, Silver Towers', 'Kothrud', '411038', 'Pune', 'Maharashtra', '2023-08-22 10:55:00.000000', NULL, NULL, NULL, NULL, NULL);



-- Community 1
INSERT INTO `Community` 
(`community_id`, `community_join_code`, `community_name`, `locality`, `pincode`, `city`, `state`,`created_datetime`, `members_count`, `description`, `access`, `last_updated`) 
VALUES 
('o1234567890', 'abcdef', 'Rotary Club', 'Lokmanyanagar', '411045', 'Pune', 'Maharashtra','2023-08-18 06:01:29.000000', '1', 'Community of Rotary Club Pune Lokmanyanagar', 'Open', NULL);

-- Community 2
INSERT INTO `Community` 
(`community_id`, `community_join_code`, `community_name`, `locality`, `pincode`, `city`, `state`,`created_datetime`, `members_count`, `description`, `access`, `last_updated`) 
VALUES 
('o356445656454', 'cfjdfj', 'VIT Club', 'Bibewadi', '411037', 'Pune', 'Maharashtra','2023-08-24 04:45:23.000000', '1', 'Community of VIT for Health', 'Open', NULL);


INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`) VALUES (NULL, 'o1234567890', '6Z9Jp5dgq9YkzhkPOhGCf63yjQx2', 'Creator', '2023-08-18 07:59:41.000000');
INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`) VALUES (NULL, 'o1234567890', 'defxyz', 'Member', '2023-08-18 08:00:17.000000');
INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`) VALUES (NULL, 'o1234567890', 'ghixyz', 'Member', '2023-08-18 08:00:47.000000');

INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`) VALUES (NULL, 'o1234567890', 'mno789', 'Creator', '2023-08-18 07:59:41.000000');
INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`) VALUES (NULL, 'o1234567890', 'jkl456', 'Member', '2023-08-18 08:00:17.000000');
INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`) VALUES (NULL, 'o1234567890', 'ghi789', 'Member', '2023-08-18 08:00:47.000000');


INSERT INTO `Seasons` 
(`season_id`, `name`, `start_date`, `end_date`, `num_challenges`, `active`, `created_by_user_id`, `created_datetime`, `last_updated`, `description`) 
VALUES 
('s123456789034', 'Season 1', '2023-07-05', '2023-11-16', NULL, '0', '["6Z9Jp5dgq9YkzhkPOhGCf63yjQx2"]', '2023-08-18 06:10:30.000000', NULL, 'This is the 1st season');

INSERT INTO `Seasons` 
(`season_id`, `name`, `start_date`, `end_date`, `num_challenges`, `active`, `created_by_user_id`, `created_datetime`, `last_updated`, `description`) 
VALUES 
('s4897478934789', 'VIT Season 1', '2023-07-08', '2024-11-16', NULL, '0', '["mno789"]', '2023-08-18 06:10:30.000000', NULL, 'This is VIT club 1st season');



INSERT INTO `CommunitySeasonMapping` 
(`community_season_mapping_id`, `community_id`, `season_id`, `join_date`) 
VALUES 
(NULL, 'o1234567890', 's123456789034', '2023-08-18 06:23:31.000000');

INSERT INTO `CommunitySeasonMapping` 
(`community_season_mapping_id`, `community_id`, `season_id`, `join_date`) 
VALUES 
(NULL, 'o1234567890', 's4897478934789', '2023-08-18 06:23:31.000000');



INSERT INTO `Challenges` 
(`challenge_id`, `created_by`, `challenge_name`, `description`, `start_date`, `end_date`, `created_datetime`, `season_id`, `active`, `last_updated`)
VALUES 
('c24859790233903', '6Z9Jp5dgq9YkzhkPOhGCf63yjQx2', '30-Day Fitness Challenge', 'Join us for a month of fitness activities!', '2023-10-01', '2023-10-31', '2023-09-20 14:30:00', 's123456789034', true, '2023-09-20 14:30:00');

INSERT INTO `Challenges` 
(`challenge_id`, `created_by`, `challenge_name`, `description`, `start_date`, `end_date`, `created_datetime`, `season_id`, `active`, `last_updated`)
VALUES 
('c8968798656900', 'mno789', '30-Day Being Fit Challenge', 'Join us for a month of fitness activities!', '2023-10-01', '2023-10-31', '2023-09-20 14:30:00', 's4897478934789', true, '2023-09-20 14:30:00');




-- Task 1: Daily Exercise
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t9870968970', 'c24859790233903', 'Daily Exercise', 'Engage in 30 minutes of physical activity each day.', 1, 'minutes', 'daily', 30, '2023-10-01', '2023-10-30');

-- Task 2: Healthy Eating
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t45806789080', 'c24859790233903', 'Healthy Eating', 'Consume at least five servings of fruits and vegetables daily.', 5, 'servings', 'daily', 30, '2023-10-01', '2023-10-30');

-- Task 3: Hydration
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t67578903894', 'c24859790233903', 'Hydration', 'Drink 8 glasses of water daily.', 8, 'glasses', 'daily', 30, '2023-10-01', '2023-10-30');

-- Task 4: Sleep
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t98453907865', 'c24859790233903', 'Adequate Sleep', 'Aim for 7-8 hours of quality sleep each night.', 7, 'hours', 'daily', 30, '2023-10-01', '2023-10-30');

-- Task 5: Daily Yoga
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t8760984797', 'c8968798656900', 'Daily Yoga', 'Practice yoga for 30 minutes every day.', 1, 'minutes', 'daily', 30, '2023-11-01', '2023-11-30');

-- Task 6: Mindful Eating
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t3457898945', 'c8968798656900', 'Mindful Eating', 'Eat mindfully and savor each meal for 30 days.', 1, 'meal', 'daily', 30, '2023-11-01', '2023-11-30');

-- Task 7: Daily Meditation
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t89859648899', 'c8968798656900', 'Daily Meditation', 'Practice meditation for 15 minutes every day.', 1, 'minutes', 'daily', 30, '2023-11-01', '2023-11-30');

-- Task 8: Stay Hydrated
INSERT INTO `HealthierMe`.`Tasks` (`task_id`, `challenge_id`, `task_name`, `task_description`, `task_quantity`, `task_unit`, `task_period_unit`, `times_to_complete`, `start_date`, `end_date`)
VALUES ('t457869083487', 'c8968798656900', 'Stay Hydrated', 'Consume at least 10 glasses of water daily.', 10, 'glasses', 'daily', 30, '2023-11-01', '2023-11-30');



-- Event 1 for Challenge ID 'c24859790233903'
INSERT INTO `HealthierMe`.`Events` (`event_id`, `challenge_id`, `event_name`, `event_description`, `start_date`, `end_date`, `event_frequency`)
VALUES ('e678978903400', 'c24859790233903', 'Fitness Workshop', 'Join us for a fitness workshop to kickstart the challenge!', '2023-10-05', '2023-10-05', 1);

-- Event 2 for Challenge ID 'c24859790233903'
INSERT INTO `HealthierMe`.`Events` (`event_id`, `challenge_id`, `event_name`, `event_description`, `start_date`, `end_date`, `event_frequency`)
VALUES ('e56777459098', 'c24859790233903', 'Group Workout Session', 'Lets exercise together as a group and stay motivated!', '2023-10-15', '2023-10-15', 1);

-- Event 3 for Challenge ID 'c8968798656900'
INSERT INTO `HealthierMe`.`Events` (`event_id`, `challenge_id`, `event_name`, `event_description`, `start_date`, `end_date`, `event_frequency`)
VALUES ('e47945679099', 'c8968798656900', 'Meditation Workshop', 'Join our meditation workshop and find inner peace.', '2023-11-10', '2023-11-10', 1);

-- Event 4 for Challenge ID 'c8968798656900'
INSERT INTO `HealthierMe`.`Events` (`event_id`, `challenge_id`, `event_name`, `event_description`, `start_date`, `end_date`, `event_frequency`)
VALUES ('e6579067489', 'c8968798656900', 'Healthy Cooking Class', 'Learn to cook delicious and healthy meals with us.', '2023-11-20', '2023-11-20', 1);