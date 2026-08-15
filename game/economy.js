// TerraNova 0.8 — Economy engine prototype
export const ECONOMY = Object.freeze({
  startingCredits: 1000,
  incomePerCycle: 35,
  populationCostPerCycle: 0.5,
  resourcePrices: { water: 18, energy: 14, bio: 22, research: 30 },
  scarcityMultiplier: 1.25,
  abundanceMultiplier: 0.85
});

export function cycleIncome(state) {
  const population = Math.max(0, Number(state.pop) || 0);
  return ECONOMY.incomePerCycle + population * 0.5;
}

export function resourcePressure(state) {
  return {
    water: Math.max(0, (state.pop || 0) * 0.012 - (state.extractor || 0) * 1.1),
    power: Math.max(0, (state.pop || 0) * 0.1 - (state.solar || 0) * 2),
    ecology: Math.max(0, (state.pop || 0) * 0.008 - (state.greenhouse || 0) * 0.35)
  };
}
