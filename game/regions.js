(function(){'use strict';
const REGIONS_KEY='terranova-regions-v1';
const defs=[
{id:'food',name:'🌾 منطقة الزراعة',color:'rgba(80,180,90,.34)',capacity:2,cost:450,desc:'المزارع وإنتاج الغذاء',action:'farm'},
{id:'habitat',name:'🏙️ منطقة السكان',color:'rgba(70,150,220,.34)',capacity:10,cost:700,desc:'المدن والسكان والخدمات',action:'city'},
{id:'health',name:'🏥 المنطقة الطبية',color:'rgba(230,90,100,.34)',capacity:1,cost:500,desc:'المراكز الطبية واللقاحات',action:'hospital'},
{id:'energy',name:'⚡ منطقة الطاقة',color:'rgba(240,190,50,.34)',capacity:1,cost:600,desc:'محطات الطاقة ومصادرها',action:'solar'},
{id:'research',name:'🔬 منطقة الأبحاث',color:'rgba(160,90,220,.34)',capacity:2,cost:800,desc:'المعامل والتكنولوجيا',action:'research'},
{id:'explore',name:'🧭 منطقة الاستكشاف',color:'rgba(40,190,180,.34)',capacity:2,cost:650,desc:'مراكز البعثات والموارد',action:'explore'}];
function fresh(){return Object.fromEntries(defs.map(x=>[x.id,{level:1,used:0}]))}
function load(){try{return Object.assign(fresh(),JSON.parse(localStorage.getItem(REGIONS_KEY)||'{}'))}catch(e){return fresh()}}
const state=load();
function save(){try{localStorage.setItem(REGIONS_KEY,JSON.stringify(state))}catch(e){}}
function sync(){const g=window.TerraNova&&window.TerraNova.state;if(!g)return;state.food.used=g.farms||0;state.habitat.used=g.cities||0;state.health.used=g.hospitals||0;state.energy.used=g.tech&&g.tech.solar?1:0;state.research.used=(g.tech&&Object.keys(g.tech).length)||0;state.explore.used=Math.max(0,(g.explored||1)-1);save()}
function canBuild(action){sync();const d=defs.find(x=>x.action===action);if(!d)return true;const s=state[d.id],cap=s.level*d.capacity;return s.used<cap}
function render(){sync();const p=document.getElementById('regions');if(!p)return;p.innerHTML=defs.map(d=>{const s=state[d.id],cap=s.level*d.capacity,full=s.used>=cap;return `<div class="region" style="border-color:${d.color}"><div><b>${d.name}</b><small>${d.desc}</small></div><span>${full?'⚠️ ممتلئة':'المساحة'} ${s.used}/${cap}</span><button type="button" data-expand-region="${d.id}">توسيع +1<br><small>${d.cost} 💰</small></button></div>`}).join('');document.querySelectorAll('[data-action]').forEach(b=>{const a=b.dataset.action;if(['farm','city','hospital','solar','research','explore'].includes(a))b.disabled=!canBuild(a)})}
function expand(id){const d=defs.find(x=>x.id===id),s=state[id],T=window.TerraNova,g=T&&T.state;if(!d||!s||!g)return;if(g.credits<d.cost)return;g.credits-=d.cost;s.level++;save();if(T&&T.render)T.render();render()}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-expand-region]');if(b){e.preventDefault();expand(b.dataset.expandRegion)}});
window.addEventListener('load',()=>{render();setInterval(render,1000)});window.TerraNovaRegions={defs,state,render,expand,canBuild};
})();