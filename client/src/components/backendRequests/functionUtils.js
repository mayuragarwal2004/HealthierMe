const mysqlTimestampToJSDate = (mysqlTimestamp) => {
  return new Date(mysqlTimestamp.replace("T", " ").replace(/-/g, "/"));
};

export const getCommunities = (uID) => {
  return fetch("/api/community/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log({ abc: data });
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

export const getCommunityData = (uID, communityId) => {
  return fetch("/api/community/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID, communityId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

export const getSeasons = (uID, communityId) => {
  return fetch("/api/season/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID, communityId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

export const getSeasonData = (uID, communityId) => {
  return fetch("/api/season/read", {
    method: "POST", // Change the method according to your backend API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID, communityId }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getTaskEventsGroups = (uID, communityId) => {
  return fetch("/api/season/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID, communityId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

export const updateCommunityIds = (data, communityIds) => {
  const updatedData = { ...data };

  // Extract community IDs from the communityIds array
  const updatedCommunityIds = communityIds.map((info) => info.community_id);

  // Remove communities that are no longer in the updatedCommunityIds array
  updatedData.community = updatedData.community.filter((community) =>
    updatedCommunityIds.includes(community.cId)
  );

  communityIds.forEach((communityInfo) => {
    const {
      community_id,
      community_name,
      description,
      role,
      last_updated,
      city,
      locality,
      pincode,
      state,
      access,
    } = communityInfo;

    // Convert MySQL timestamp to JavaScript Date
    const lastUpdatedDate = mysqlTimestampToJSDate(last_updated);

    const existingCommunity = updatedData.community.find(
      (community) => community.cId === community_id
    );

    if (!existingCommunity) {
      const newCommunity = {
        _id: "",
        cId: community_id,
        cName: community_name,
        cDesc: description,
        role: role,
        city: city,
        locality: locality,
        pincode: pincode,
        state: state,
        access: access,
        season: [],
        last_updated: lastUpdatedDate,
      };

      updatedData.community.push(newCommunity);
    } else {
      // If the community exists and last_updated has changed, update its attributes and last_updated
      if (
        existingCommunity.last_updated.getTime() !== lastUpdatedDate.getTime()
      ) {
        existingCommunity.cName = community_name;
        existingCommunity.last_updated = lastUpdatedDate;
      }
    }
  });

  return updatedData;
};

export const updateSeasonIds = (data, communityId, seasonData) => {
  const updatedData = { ...data };

  const community = updatedData.community.find(
    (community) => community.cId === communityId
  );

  if (community) {
    // Extract seasonIds from the seasonData array
    const seasonIds = seasonData.map((season) => season.season_id);

    // Remove seasons that are no longer in the seasonData array
    community.season = community.season.filter((season) =>
      seasonIds.includes(season.sId)
    );

    seasonData.forEach((seasonInfo) => {
      const {
        season_id,
        name,
        description,
        start_date,
        end_date,
        active,
        last_updated,
      } = seasonInfo;

      const existingSeason = community.season.find(
        (season) => season.sId === season_id
      );

      // Convert MySQL timestamps to JavaScript Date objects
      const startDate = mysqlTimestampToJSDate(start_date);
      const endDate = mysqlTimestampToJSDate(end_date);
      const lastUpdatedDate = mysqlTimestampToJSDate(last_updated);

      if (!existingSeason) {
        const newSeason = {
          _id: "",
          sId: season_id,
          sName: name,
          sDesc: description,
          sStart: startDate,
          sEnd: endDate,
          challengeNo: 0,
          challengeIds: [],
          challenge: [],
          last_updated: lastUpdatedDate,
        };

        community.season.push(newSeason);
      } else {
        // If the season exists and last_updated has changed, update its attributes and last_updated
        if (
          existingSeason.last_updated.getTime() !== lastUpdatedDate.getTime()
        ) {
          existingSeason.sName = name;
          existingSeason.sDesc = description;
          existingSeason.sStart = startDate;
          existingSeason.sEnd = endDate;
          existingSeason.last_updated = lastUpdatedDate;
        }
      }
    });
  }

  return updatedData;
};

export const getChallenges = (uID, communityId, seasonId) => {
  return fetch("/api/challenge/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID, communityId, seasonId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

export const updateChallengeIds = (
  data,
  communityId,
  seasonId,
  challengeData
) => {
  const updatedData = { ...data };

  const community = updatedData.community.find(
    (community) => community.cId === communityId
  );

  if (community) {
    const season = community.season.find((season) => season.sId === seasonId);

    if (season) {
      // Extract challengeIds from the challengeData array
      const challengeIds = challengeData.map(
        (challenge) => challenge.challenge_id
      );

      // Remove challenges that are no longer in the challengeData array
      season.challenge = season.challenge.filter((challenge) =>
        challengeIds.includes(challenge.cId)
      );

      challengeData.forEach((challengeInfo) => {
        const {
          challenge_id,
          challenge_name,
          description,
          start_date,
          end_date,
          active,
          last_updated,
        } = challengeInfo;

        const existingChallenge = season.challenge.find(
          (challenge) => challenge.cId === challenge_id
        );

        // Convert MySQL timestamps to JavaScript Date objects
        const startDate = mysqlTimestampToJSDate(start_date);
        const endDate = mysqlTimestampToJSDate(end_date);
        const lastUpdatedDate = mysqlTimestampToJSDate(last_updated);

        if (!existingChallenge) {
          const newChallenge = {
            _id: "",
            cId: challenge_id,
            cName: challenge_name,
            cDesc: description,
            cStart: startDate,
            cEnd: endDate,
            group: [],
            event: [],
            task: [],
            last_updated: lastUpdatedDate,
          };

          season.challenge.push(newChallenge);
        } else {
          // If the challenge exists and last_updated has changed, update its attributes and last_updated
          if (
            existingChallenge.last_updated.getTime() !==
            lastUpdatedDate.getTime()
          ) {
            existingChallenge.cName = challenge_name;
            existingChallenge.cDesc = description;
            existingChallenge.cStart = startDate;
            existingChallenge.cEnd = endDate;
            existingChallenge.last_updated = lastUpdatedDate;
          }
        }
      });
    }
  }

  return updatedData;
};

export const getTEG = (uID, communityId, seasonId, challengeId) => {
  return fetch("/api/challenge/listTEG", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uID, communityId, seasonId, challengeId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

// Function to update tasks within a challenge
export const updateTasks = (challenge, taskData) => {
  // Extract task IDs from the taskData array
  const taskIds = taskData.map((task) => task.task_id);

  // Remove tasks that are no longer in the taskData array
  challenge.task = challenge.task.filter((task) => taskIds.includes(task.tId));

  taskData.forEach((taskInfo) => {
    const {
      task_id,
      task_name,
      task_description,
      task_quantity,
      task_unit,
      task_period_unit,
      times_to_complete,
      start_date,
      end_date,
    } = taskInfo;

    const existingTask = challenge.task.find((task) => task.tId === task_id);

    // Convert MySQL timestamps to JavaScript Date objects
    const startDate = mysqlTimestampToJSDate(start_date);
    const endDate = mysqlTimestampToJSDate(end_date);

    if (!existingTask) {
      const newTask = {
        tId: task_id,
        tName: task_name,
        tDesc: task_description,
        tQuant: task_quantity,
        tUnit: task_unit,
        tPeriodUnit: task_period_unit,
        tTC: times_to_complete,
        tStart: startDate,
        tEnd: endDate,
        gId: "", // Add group ID when you have group data
      };

      challenge.task.push(newTask);
    }
  });
};

// Function to update events within a challenge
export const updateEvents = (challenge, eventData) => {
  // Extract event IDs from the eventData array
  const eventIds = eventData.map((event) => event.event_id);

  // Remove events that are no longer in the eventData array
  challenge.event = challenge.event.filter((event) =>
    eventIds.includes(event.eId)
  );

  eventData.forEach((eventInfo) => {
    const {
      event_id,
      event_name,
      event_description,
      start_date,
      end_date,
      event_frequency,
    } = eventInfo;

    const existingEvent = challenge.event.find(
      (event) => event.eId === event_id
    );

    // Convert MySQL timestamps to JavaScript Date objects
    const startDate = mysqlTimestampToJSDate(start_date);
    const endDate = mysqlTimestampToJSDate(end_date);

    if (!existingEvent) {
      const newEvent = {
        eId: event_id,
        eName: event_name,
        eDesc: event_description,
        eStart: startDate,
        eEnd: endDate,
        eFreq: event_frequency,
        gId: "", // Add group ID when you have group data
      };

      challenge.event.push(newEvent);
    }
  });
};

// Function to update groups within a challenge
const updateGroups = (challenge, groupData) => {
  // Extract group IDs from the groupData array
  const groupIds = groupData.map((group) => group.gId);

  // Remove groups that are no longer in the groupData array
  challenge.group = challenge.group.filter((group) =>
    groupIds.includes(group.gId)
  );

  groupData.forEach((groupInfo) => {
    const { gId, gName, numOpts, minToComp, taskIds, eventIds } = groupInfo;

    const existingGroup = challenge.group.find((group) => group.gId === gId);

    if (!existingGroup) {
      const newGroup = {
        gName: gName,
        gId: gId,
        numOpts: numOpts,
        minToComp: minToComp,
        taskIds: taskIds,
        eventIds: eventIds,
        _id: "", // Add _id when you have this information
      };

      challenge.group.push(newGroup);
    }
  });
};

// Function to coordinate updates for tasks, events, and groups
export const updateTEGList = (
  data,
  communityId,
  seasonId,
  challengeId,
  tegData
) => {
  const updatedData = { ...data };

  console.log({ tegData, challengeId, seasonId, communityId });

  const community = updatedData.community.find(
    (community) => community.cId === communityId
  );

  if (community) {
    const season = community.season.find((season) => season.sId === seasonId);

    if (season) {
      const challenge = season.challenge.find(
        (challenge) => challenge.cId === challengeId
      );

      if (challenge) {
        if (tegData.task) {
          updateTasks(challenge, tegData.task);
        }

        if (tegData.event) {
          updateEvents(challenge, tegData.event);
        }

        if (tegData.group) {
          updateGroups(challenge, tegData.group);
        }
      }
    }
  }

  return updatedData;
};

export const JoinCommunityServer = (joinCode, userId, role) => {
  return fetch("/api/community/joincommunity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ joinCode, userId, role }),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Rethrow the error so it can be caught by the caller
    });
};

export const UserSignUp = (data) => {
  return fetch("localhost:5000/api/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
