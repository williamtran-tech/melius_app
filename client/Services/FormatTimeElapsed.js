import moment from "moment";

// Function to calculate and format the time elapsed
export const formatTimeElapsed = (postCreatedAt) => {
  const now = moment();
  const createdAt = moment(postCreatedAt);
  const duration = moment.duration(now.diff(createdAt));

  if (duration.asMinutes() < 1) {
    return `${Math.floor(duration.asSeconds())}s`;
  } else if (duration.asHours() < 1) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())}h`;
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())}d`;
  } else {
    return `${Math.floor(duration.asWeeks())}w`;
  }
};
