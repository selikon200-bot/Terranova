(function(){'use strict';
const EVENTS=[
 {name:'🌪️ عاصفة غبار',weight:20,apply:s=>{s.energy=Math.max(0,s.energy-8);s.water=Math.max(0,s.water-2);s.climate=Math.max(0,s.climate-1);return 'انخفضت الطاقة والمياه بسبب العاصفة.'}},
 {name:'🌧️ أمطار موسمية',weight:18,apply:s=>{s.water=Math.min(100,s.water+5);s.eco=Math.min(100,s.eco+2);return 'تحسنت المياه والبيئة.'}},
 {name:'☀️ توهج شمسي',weight:10,apply:s=>{s.energy+=10;s.climate=Math.max(0,s.climate-2);return 'زاد إنتاج الطاقة لكن المناخ تضرر قليلًا.'}},
 {name:'🧬 ازدهار حيوي',weight:8,apply:s=>{s.eco=Math.min(100,s.eco+5);s.bio+=12;s.research+=8;return 'اكتشاف حيوي منح موارد علمية إضافية.'}},
 {name:'🌌 دورة هادئة',weight:44,apply:s=>{s.climate=Math.min(100,s.climate+1);s.research+=4;return 'دورة هادئة ساعدت البحث العلمي.'}}
];
function pick(){const total=EVENTS.reduce((a,e)=>a+e.weight,0);let r=Math.random()*total;for(const e of EVENTS){r-=e.weight;if(r<0)return e}return EVENTS[EVENTS.length-1]}
function trigger(){if(!window.TerraNova)return;const s=window.TerraNova.state;const e=pick();const detail=e.apply(s);if(Array.isArray(s.log)){s.log.unshift('🎲 حدث عشوائي: '+e.name+' — '+detail);s.log=s.log.slice(0,50)}window.TerraNova.save();window.TerraNova.render()}
window.TerraNovaEvents={trigger,pick};
setTimeout(()=>setInterval(trigger,15000),7000);
})();