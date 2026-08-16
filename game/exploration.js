/* TerraNova Exploration 1.0 — interactive region exploration */
(function(){'use strict';
function boot(){
 const planet=document.getElementById('planet'); if(!planet)return;
 let panel=document.getElementById('explorePanel');
 if(!panel){panel=document.createElement('div');panel.id='explorePanel';panel.className='explore-panel';panel.innerHTML='<b>🧭 استكشاف الكوكب</b><div id="exploreInfo" class="small">اضغط على منطقة لاستكشافها.</div><div id="exploreActions"></div>';const world=document.getElementById('world');if(world)world.appendChild(panel)}
 const regions=[
  ['🌱 السهول الخضراء',20,62,1,'منطقة البداية: حياة ومياه سطحية.'],
  ['🌊 بحر Terra',72,35,2,'محيط غني بالمياه والطاقة الحيوية.'],
  ['🌲 الغابات الشمالية',30,30,2,'غابات كثيفة وفرص بحث حيوية.'],
  ['🏔️ الجبال',70,70,3,'معادن نادرة ومواقع لبناء منشآت متقدمة.'],
  ['🧊 القطب',25,78,4,'منطقة جليدية قاسية تحتاج مناخًا مستقرًا.'],
  ['🌋 الوادي البركاني',78,72,5,'مصادر طاقة ومعادن عالية الخطورة.']
 ];
 let layer=planet.querySelector('.explore-markers');if(!layer){layer=document.createElement('div');layer.className='explore-markers';planet.appendChild(layer)}
 function state(){try{return JSON.parse(localStorage.getItem('terranova08')||'{}')}catch(e){return {}}}
 function draw(){const g=state();layer.innerHTML='';regions.forEach((r,i)=>{const unlocked=(g.discovered||1)>=r[3]||i===0;const b=document.createElement('button');b.className='explore-marker '+(unlocked?'open':'locked');b.style.left=r[1]+'%';b.style.top=r[2]+'%';b.textContent=unlocked?'◉':'🔒';b.title=r[0];b.onclick=()=>select(r,unlocked);layer.appendChild(b)})}
 function select(r,unlocked){$('exploreInfo').textContent=unlocked?r[0]+' — '+r[4]:'هذه المنطقة مغلقة. طوّر الكوكب أولًا.';const a=$('exploreActions');a.innerHTML=unlocked?'<button class="action" id="scanRegion">🔎 مسح المنطقة</button>':'';if(unlocked)document.getElementById('scanRegion').onclick=()=>scan(r)}
 function scan(r){const g=state();let reward='';const roll=Math.random();if(r[0].includes('بحر')){g.water=(g.water||0)+4;g.bio=(g.bio||0)+8;reward='💧 +4 ماء، 🧬 +8 مواد حيوية'}else if(r[0].includes('غابات')){g.research=(g.research||0)+25;g.eco=(g.eco||0)+3;reward='🔬 +25 بحث، 🌱 +3 بيئة'}else if(r[0].includes('جبال')){g.minerals=(g.minerals||0)+8;g.credits=(g.credits||0)+80;reward='⛏️ +8 معادن، 💰 +80'}else if(r[0].includes('قطب')){g.water=(g.water||0)+6;g.climate=(g.climate||0)+2;reward='💧 +6 ماء، 🌦️ +2 مناخ'}else if(r[0].includes('بركاني')){g.energy=(g.energy||0)+12;g.minerals=(g.minerals||0)+10;reward='⚡ +12 طاقة، ⛏️ +10 معادن'}else{g.water=(g.water||0)+2;g.eco=(g.eco||0)+2;reward='💧 +2 ماء، 🌱 +2 بيئة'}
 if(roll>.85){g.research=(g.research||0)+15;reward+=' • 🔬 اكتشاف علمي +15'}
 localStorage.setItem('terranova08',JSON.stringify(g));$('exploreInfo').textContent='✅ '+r[0]+' — '+reward;draw();}
 draw();setInterval(draw,1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
