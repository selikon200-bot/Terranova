// TerraNova 0.8 — Achievement system prototype
export const ACHIEVEMENTS = Object.freeze([
  { id: 'water_pioneer', title: 'رائد المياه', metric: 'water', target: 25, reward: 100 },
  { id: 'green_world', title: 'عالم أخضر', metric: 'eco', target: 45, reward: 180 },
  { id: 'stable_climate', title: 'مناخ مستقر', metric: 'climate', target: 55, reward: 250 },
  { id: 'researcher', title: 'باحث', metric: 'research', target: 500, reward: 220 },
  { id: 'life_creator', title: 'صانع الحياة', metric: 'life', target: 1, reward: 300 },
  { id: 'city_builder', title: 'باني مدينة', metric: 'civil', target: 3, reward: 500 }
]);

export function checkAchievements(state, completed = {}) {
  const newlyCompleted = [];
  for (const achievement of ACHIEVEMENTS) {
    const value = achievement.metric === 'life' ? (state.done?.life ? 1 : 0) : Number(state[achievement.metric] || 0);
    if (value >= achievement.target && !completed[achievement.id]) {
      completed[achievement.id] = true;
      newlyCompleted.push(achievement);
    }
  }
  return newlyCompleted;
}
