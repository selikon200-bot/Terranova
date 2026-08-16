/* TerraNova Region Events — region-specific encounters and rewards */
(function(){'use strict';
const KEY='terranova08';
const regions=[
 {id:'plains',name:'🌱 السهول الخضراء',x:20,y:62,need:1,desc:'أراضٍ مناسبة للزراعة والاستيطان.',events:[['حصاد وفير','🌾 الغذاء +10، 💰 الرصيد +40',g=>{g.food=(g.food||0)+10;g.credits=(g.credits||0)+40}]]},
 {id:'sea',name:'🌊 بحر Terra',x:72,y:35,need:2,desc:'مياه واسعة ومصادر حياة بحرية.',events:[['مدّ مائي','💧 الماء +12، 🧬 الحيوية +8',g=>{g.water=(g.water||0)+12;g.bio=(g.bio||0)+8}],['عاصفة بحرية','⚡ الطاقة -8، 💧 الماء +5',g=>{g.energy=Math.max(0,(g.energy||0)-8);g.water=(g.water||0)+5}]]},
 {id:'forest',name:'🌲 الغابات الشمالية',x:30,y:30,need:3,desc:'منطقة حيوية غنية بالنباتات والبحث.',events:[['اكتشاف نباتي','🔬 البحث +30، 🌱 البيئة +4',g=>{g.research=(g.research||0)+30;g.eco=(g.eco||0)+4}]]},
 {id:'mountain',name:'🏔️ الجبال',x:70,y:70,need:4,desc:'معادن نادرة ومواقع طاقة.',events:[['منجم نادر','⛏️ المعادن +12، 💰 الرصيد +90',g=>{g.minerals=(g.minerals||0)+12;g.credits=(g.credits||0)+90}],['انهيار صخري','⛏️ المعادن +4، 💰 الرصيد -25',g=>{g.minerals=(g.minerals||0)+4;g.credits=Math.max(0,(g.credits||0)-25)}]]},
 {id:'polar',name:'🧊 القطب',x:25,y:78,need:5,desc:'جليد ومياه مخزنة تحتاج إلى تقنية متقدمة.',events:[['ذوبان مضبوط','💧 الماء +18، 🌦️ المناخ +3',g=>{g.water=(g.water||0)+18;g.climate=(g.climate||0)+3}]]},
 {id:'volcano',name:'🌋 الوادي البركاني',x:78,y:72,need:6,desc:'طاقة حرارية ومعادن عالية القيمة.',events:[['نبضة حرارية','⚡ الطاقة +18، ⛏️ المعادن +8',g=>{g.energy=(g.energy||0)+18;g.minerals=(g.minerals||0)+8}],['رماد بركاني','🌱 البيئة -5، ⛏️ المعادن +15',g=>{g.eco=Math.max(0,(g.eco||0)-5);g.minerals=(g.minerals||0)+15}]]}
];
function state(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
function save(g){localStorage.setItem(KEY,JSON.stringify(g))}
function boot(){const planet=document.getElementById('planet');if(!planet)return;let layer=planet.querySelector('.region-events-layer');if(!layer){layer=document.createElement('div');layer.className='region-events-layer';planet.appendChild(layer)}let panel=document.getElementById('regionEventPanel');if(!panel){panel=document.createElement('div');panel.id='regionEventPanel';panel.className='region-event-panel';panel.innerHTML='<b>🧭 بعثة المنطقة</b><div id="regionEventInfo" class="small">اختر منطقة مفتوحة من الكوكب.</div><button id="regionEventBtn" class="action" style="display:none">🎯 تنفيذ البعثة</button>';const world=document.getElementById('world');if(world)world.appendChild(panel)}
 function openCount(g){return g.discovered||1}
 function draw(){const g=state();layer.innerHTML='';regions.forEach(r=>{const open=openCount(g)>=r.need;const b=document.createElement('button');b.className='region-marker '+(open?'open':'locked');b.style.left=r.x+'%';b.style.top=r.y+'%';b.textContent=open?'◉':'🔒';b.title=r.name;b.onclick=()=>select(r,open);layer.appendChild(b)})}
 function select(r,open){const info=document.getElementById('regionEventInfo'),btn=document.getElementById('regionEventBtn');if(!open){info.textContent='🔒 '+r.name+' مغلقة. طوّر الكوكب لفتحها.';btn.style.display='none';return}const ev=r.events[Math.floor(Math.random()*r.events.length)];info.textContent=r.name+' — '+r.desc+' | فرصة: '+ev[0]+' — '+ev[1];btn.style.display='block';btn.onclick=()=>{const g=state();ev[2](g);g.regionVisits=(g.regionVisits||0)+1;g.lastRegion=r.id;save(g);info.textContent='✅ تم تنفيذ البعثة: '+ev[0]+' — '+ev[1];btn.style.display='none';draw();}}
 draw();setInterval(draw,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
