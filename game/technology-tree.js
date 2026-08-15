// TerraNova Technology Tree 0.8
export const technologies=[
{id:'water',name:'💧 هندسة المياه',cost:100,requires:[]},
{id:'solar',name:'☀️ الطاقة الشمسية',cost:150,requires:[]},
{id:'storage',name:'🔋 تخزين الطاقة',cost:250,requires:['solar']},
{id:'eco',name:'🌱 الهندسة البيئية',cost:300,requires:['water']},
{id:'bio',name:'🧬 علم الأحياء المتقدم',cost:500,requires:['eco']},
{id:'cities',name:'🏙️ تخطيط المدن',cost:450,requires:['storage','eco']},
{id:'planetary',name:'🛰️ الشبكة الكوكبية',cost:1000,requires:['cities','bio']}
];
export function canResearch(id,state){const t=technologies.find(x=>x.id===id);if(!t)return false;const done=state.technologies||{};return !done[id]&&(state.research||0)>=t.cost&&t.requires.every(r=>done[r]);}
