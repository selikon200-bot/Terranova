// TerraNova Planet Map 0.7
export const regions = [
  { id:'plains', name:'🌱 السهول', requirement:{planetHealth:0}, resource:'food' },
  { id:'ocean', name:'🌊 المحيط', requirement:{water:25}, resource:'water' },
  { id:'forest', name:'🌲 الغابة', requirement:{planetHealth:40}, resource:'food' },
  { id:'mountains', name:'🏔️ الجبال', requirement:{science:120}, resource:'minerals' },
  { id:'ice', name:'🧊 القطب', requirement:{science:250}, resource:'water' },
  { id:'volcanic', name:'🌋 البركان', requirement:{science:450}, resource:'minerals' }
];
export function isRegionUnlocked(region,state){
  return Object.entries(region.requirement).every(([key,value]) => (state[key] ?? state.resources?.[key] ?? 0) >= value);
}
