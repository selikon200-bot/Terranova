// TerraNova Civilization Engine 0.8
export const civilizationStages=[
{id:'colony',name:'🌱 مستعمرة',requirements:{population:10,planetHealth:15,science:0}},
{id:'settlement',name:'🏘️ مستوطنة',requirements:{population:25,planetHealth:30,science:100}},
{id:'city',name:'🏙️ مدينة',requirements:{population:50,planetHealth:45,science:250}},
{id:'advanced',name:'🛰️ حضارة متقدمة',requirements:{population:100,planetHealth:60,science:600}},
{id:'planetary',name:'🌌 حضارة كوكبية',requirements:{population:250,planetHealth:75,science:1500}}
];
export function getCivilizationStage(state){let current=civilizationStages[0];for(const stage of civilizationStages){const ok=Object.entries(stage.requirements).every(([k,v])=>(state[k]??0)>=v);if(ok)current=stage;else break;}return current;}
