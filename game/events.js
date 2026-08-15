// TerraNova 0.8 — Planetary events prototype
export const EVENTS = Object.freeze([
  { id: 'dust_storm', name: 'عاصفة غبار', weight: 20, effects: { power: -8, water: -2, climate: -1 } },
  { id: 'rainfall', name: 'أمطار موسمية', weight: 18, effects: { water: 5, eco: 2 } },
  { id: 'solar_flare', name: 'توهج شمسي', weight: 10, effects: { power: 10, climate: -2 } },
  { id: 'bio_bloom', name: 'ازدهار حيوي', weight: 8, effects: { eco: 5, bio: 12, research: 8 } },
  { id: 'quiet_cycle', name: 'دورة هادئة', weight: 44, effects: { climate: 1, research: 4 } }
]);

export function pickEvent(random = Math.random) {
  const total = EVENTS.reduce((sum, event) => sum + event.weight, 0);
  let roll = random() * total;
  for (const event of EVENTS) {
    roll -= event.weight;
    if (roll < 0) return event;
  }
  return EVENTS[EVENTS.length - 1];
}

export function applyEvent(state, event) {
  for (const [key, value] of Object.entries(event.effects)) {
    state[key] = Number(state[key] || 0) + value;
  }
  return state;
}
