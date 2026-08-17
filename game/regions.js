(function(){'use strict';
const REGIONS_KEY='terranova-regions-v1';
const defs=[
{id:'food',name:'🌾 منطقة الزراعة',color:'rgba(80,180,90,.34)',capacity:2,cost:450,desc:'المزارع وإنتاج الغذاء'},
{id:'habitat',name:'🏙️ منطقة السكان',color:'rgba(70,150,220,.34)',capacity:10,cost:700,desc:'المدن والسكان والخدمات'},
{id:'health',name:'🏥 المنطقة الطبية',color:'rgba(230,90,100,.34)',capacity:1,cost:500,desc:'المراكز الطبية واللقاحات'},
{id:'energy',name:'⚡ منطقة الطاقة',color:'rgba(240,190,50,.34)',capacity:1,cost:600,desc:'محطات الطاقة ومصادرها'},
{id:'research',name:'🔬 منطقة الأبحاث',color:'rgba(160,90,220,.34)',capacity:1,cost:800,desc:'المعامل والتكنولوجيا'},
{id:'explore',name:'🧭 منطقة الاستكشاف',color:'rgba(40,190,180,.34)',capacity:1,cost:650,desc:'مراكز البعثات والموارد'}];
function load(){try{return JSON.parse(localStorage.getItem(REGIONS_KEY))||Object.fromEntries(defs.map(x=>[x.id,{level:1,used:0}]))}catch(e){return Object.fromEntries(defs.map(x=>[x.id,{level:1,used:0}]))}}
const state=load();function save(){localStorage.setItem(REGIONS_KEY,JSON.stringify(state))}
function render(){const p=document.getElementById('regions');if(!p)return;p.innerHTML=defs.map(d=>{const s=state[d.id];const cap=s.level*d.capacity;return `<div class="region" style="border-color:${d.color}"><div><b>${d.name}</b><small>${d.desc}</small></div><span>المساحة ${s.used}/${cap}</span><button type="button" data-expand-region="${d.id}">توسيع +1<br><small>${d.cost} 💰</small></button></div>`}).join('')}
function expand(id){const d=defs.find(x=>x.id===id),s=state[id];if(!d||!s)return;const T=window.TerraNova,g=T&&T.state;if(!g||g.credits<d.cost){alert('لا توجد أموال كافية لتوسيع المنطقة');return}g.credits-=d.cost;s.level++;save();if(T&&T.render)T.render();render()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-expand-region]');if(b)expand(b.dataset.expandRegion)});window.addEventListener('load',render);window.TerraNovaRegions={defs,state,render,expand};
})();