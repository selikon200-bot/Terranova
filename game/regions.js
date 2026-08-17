(function(){'use strict';
// Region expansion has been disabled. All game areas are now available without capacity limits.
const defs=[
{id:'food',name:'🌾 منطقة الزراعة',desc:'المزارع وإنتاج الغذاء',action:'farm'},
{id:'habitat',name:'🏙️ منطقة السكان',desc:'المدن والسكان والخدمات',action:'city'},
{id:'health',name:'🏥 المنطقة الطبية',desc:'المراكز الطبية واللقاحات',action:'hospital'},
{id:'energy',name:'⚡ منطقة الطاقة',desc:'محطات الطاقة ومصادرها',action:'solar'},
{id:'research',name:'🔬 منطقة الأبحاث',desc:'المعامل والتكنولوجيا',action:'research'},
{id:'explore',name:'🧭 منطقة الاستكشاف',desc:'مراكز البعثات والموارد',action:'explore'}];
const state={};
function canBuild(){return true}
function render(){const p=document.getElementById('regions');if(!p)return;p.innerHTML=defs.map(d=>`<div class="region"><div><b>${d.name}</b><small>${d.desc}</small></div><span>متاحة بالكامل</span></div>`).join('')}
window.TerraNovaRegions={defs,state,render,canBuild};
window.addEventListener('load',render);
})();