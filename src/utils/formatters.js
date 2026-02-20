export const calculateLevel = (hoursPlayed) => Math.floor((hoursPlayed * 50) / 500) + 1;

export const calculateXp = (hoursPlayed) => hoursPlayed * 50;

export const levelProgressPercent = (hoursPlayed) => {
  const xp = calculateXp(hoursPlayed);
  const currentLevelBase = Math.floor(xp / 500) * 500;
  return ((xp - currentLevelBase) / 500) * 100;
};

export const formatDate = (timestamp) => new Date(timestamp).toLocaleString();
