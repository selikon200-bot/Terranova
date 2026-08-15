// TerraNova Planet Events 0.7
const events = [
  { id: 'solar-storm', title: '☀️ توهج شمسي', chance: .08, effect: s => ({ ...s, resources: { ...s.resources, energy: Math.max(0,(s.resources?.energy||0)-12) } }) },
  { id: 'rainfall', title: '🌧️ أمطار موسمية', chance: .10, effect: s => ({ ...s, resources: { ...s.resources, water: (s.resources?.water||0)+10 }, planetHealth: Math.min(100,(s.planetHealth||0)+1) }) },
  { id: 'bio-boom', title: '🌿 ازدهار حيوي', chance: .07, effect: s => ({ ...s, resources: { ...s.resources, food: (s.resources?.food||0)+8, science: (s.resources?.science||0)+5 }, planetHealth: Math.min(100,(s.planetHealth||0)+2) }) }
];
export function rollPlanetEvent(state, random=Math.random) {
  const event = events.find(e => random() < e.chance);
  return event ? { state: event.effect(state), event: event.title } : { state, event: null };
}
export { events };
