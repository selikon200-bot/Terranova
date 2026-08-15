// TerraNova Economy Engine 0.7
export const EconomyEngine = {
  tick(state) {
    const next = structuredClone(state);
    const production = {
      water: (state.buildings?.waterExtractor || 0) * 1.1,
      energy: (state.buildings?.solarPlant || 0) * 2,
      science: (state.buildings?.researchCenter || 0) * 1.5,
      food: (state.buildings?.farm || 0) * 1.2
    };
    const consumption = {
      water: state.population * 0.012,
      energy: state.population * 0.1,
      food: state.population * 0.015
    };
    next.resources = next.resources || {};
    for (const key of Object.keys(production)) next.resources[key] = Math.max(0, (next.resources[key] || 0) + production[key] - (consumption[key] || 0));
    next.credits = Math.max(0, (state.credits || 0) + 35 + state.population * 0.5);
    next.planetHealth = Math.max(0, Math.min(100, (state.planetHealth || 20) + (production.food > consumption.food ? 0.15 : -0.25)));
    return next;
  }
};
