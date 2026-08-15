// TerraNova 0.8 — Interactive world map data
export const MAP_REGIONS = Object.freeze([
  { id: 'green_plains', name: 'السهول الخضراء', biome: 'plains', unlock: { civilization: 1, eco: 0 } },
  { id: 'terra_sea', name: 'بحر Terra', biome: 'ocean', unlock: { civilization: 1, eco: 30 } },
  { id: 'north_forest', name: 'الغابات الشمالية', biome: 'forest', unlock: { civilization: 2, eco: 45 } },
  { id: 'high_mountains', name: 'الجبال العالية', biome: 'mountain', unlock: { civilization: 3, research: 260 } },
  { id: 'polar_zone', name: 'المنطقة القطبية', biome: 'ice', unlock: { civilization: 4, climate: 55 } },
  { id: 'volcanic_valley', name: 'الوادي البركاني', biome: 'volcanic', unlock: { civilization: 5, research: 700 } }
]);

export function canUnlock(region, state) {
  const req = region.unlock;
  return (!req.civilization || state.civil >= req.civilization) &&
    (!req.eco || state.eco >= req.eco) &&
    (!req.research || state.research >= req.research) &&
    (!req.climate || state.climate >= req.climate);
}
