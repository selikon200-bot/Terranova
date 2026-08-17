(function(){'use strict';
const KEY='terranova-save-v2';
const defaults={version:2,credits:1000,research:100,bio:50,water:8,energy:50,food:30,minerals:20,oxygen:5,population:10,health:70,disease:8,patients:1,temperature:-25,pressure:35,eco:20,climate:25,turn:1,cities:0,farms:0,hospitals:0,vaccines:0,medicalResearch:0,explored:1,tech:{},projects:{},log:[],lastSave:0};
const numeric=Object.keys(defaults).filter(k=>typeof defaults[k]==='number');
function load(){let s=null;try{s=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}if(!s){try{s=JSON.parse(localStorage.getItem('terranova-save-v1')||'null')}catch(e){}if(!s){try{s=JSON.parse(localStorage.getItem('terranova08')||'null')}catch(e){}}}s=Object.assign({},defaults,s||{});s.version=2;s.tech=Object.assign({},defaults.tech,s.tech||{});s.projects=Object.assign({},defaults.projects,s.projects||{});s.log=Array.isArray(s.log)?s.log:[];numeric.forEach(k=>{if(!Number.isFinite(Number(s[k])))s[k]=defaults[k];else s[k]=Number(s[k])});return s}
let g=load();const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function save(){g.lastSave=Date.now();localStorage.setItem(KEY,JSON.stringify(g));try{window.dispatchEvent(new CustomEvent('terranova:state'))}catch(e){}}
function note(t){g.log.unshift(t);g.log=g.log.slice(0,40);save()}
function spend(n){if(g.credits<n){note('❌ تحتاج '+n+' 💰');return false}g.credits-=n;return true}
function act(type){
 if(type==='heat'&&spend(120)){g.temperature=clamp(g.temperature+2,-40,35);g.climate=clamp(g.climate+2,0,100);note('🔥 الحرارة +2°C')}
 else if(type==='pressure'&&spend(180)){g.pressure=clamp(g.pressure+5,10,120);note('💨 الضغط +5 kPa')}
 else if(type==='water'&&spend(200)){g.water=clamp(g.water+3,0,100);note('💧 المياه +3')}
 else if(type==='oxygen'&&spend(220)){g.oxygen=clamp(g.oxygen+1,0,30);note('🫁 الأكسجين +1%')}
 else if(type==='city'&&spend(700)){g.cities++;g.population+=12;g.food=Math.max(0,g.food-5);g.energy=Math.max(0,g.energy-10);note('🏙️ تأسست مدينة')}
 else if(type==='farm'&&spend(450)){g.farms++;g.food+=15;g.oxygen=clamp(g.oxygen+2,0,30);g.eco=clamp(g.eco+5,0,100);note('🌱 بنيت مزرعة')}
 else if(type==='hospital'&&spend(500)){g.hospitals++;g.health=clamp(g.health+8,0,100);g.disease=clamp(g.disease-4,0,100);g.patients=Math.round(g.population*g.disease/100);note('🏥 بني مركز طبي')}
 else if(type==='vaccine'&&g.research>=200){g.research-=200;g.vaccines++;g.disease=clamp(g.disease-8,0,100);g.health=clamp(g.health+5,0,100);g.tech.vaccine=true;note('💉 طُوّر لقاح')}
 else if(type==='research'&&g.research>=150){g.research-=150;g.medicalResearch+=150;g.tech.medical=true;g.health=clamp(g.health+5,0,100);note('🔬 طورت تقنية طبية')}
 else if(type==='life'&&g.research>=300&&g.bio>=50){g.research-=300;g.bio-=50;g.projects.life=true;g.eco=clamp(g.eco+10,0,100);note('🧬 اكتشفت حياة جديدة')}
 else if(type==='solar'&&spend(250)){g.energy+=20;g.climate=clamp(g.climate+2,0,100);g.tech.solar=true;note('☀️ بنيت محطة شمسية')}
 else if(type==='explore'&&spend(250)){g.explored++;g.minerals+=12;g.research+=20;note('🧭 اكتشفت منطقة جديدة')}
 else if(type)note('❌ لا يمكن تنفيذ العملية الآن');
 render()
}
function cycle(){g.turn++;g.water=clamp(g.water+g.farms*.4-g.cities*.2,0,100);g.energy=Math.max(0,g.energy-g.population*.03);g.food=Math.max(0,g.food+g.farms*1.5-g.population*.02);g.research+=5+g.explored*.5;g.credits+=25+g.population*.4;const env=(g.water>20?1.2:-1)+(g.food>20?.8:-1)+(g.eco>40?1.2:-.8)+g.hospitals*.5+g.vaccines*.4;g.health=clamp(g.health+env*.15-g.disease*.015,0,100);const spread=(g.water<15?1.8:0)+(g.food<15?1:0)+(g.eco<25?1:0)-g.hospitals*1.3-g.vaccines*.9;g.disease=clamp(g.disease+spread*.12,0,100);g.patients=Math.max(0,Math.round(g.population*g.disease/100));if(g.health<40)g.log.unshift('⚠️ صحة السكان منخفضة');if(Math.random()<.12){g.minerals+=8;g.log.unshift('⛏️ اكتشاف معادن')}save();render()}
function render(){const q=id=>document.getElementById(id);const vals={credits:Math.floor(g.credits),research:Math.floor(g.research),bio:Math.floor(g.bio),water:Math.floor(g.water),energy:Math.floor(g.energy),food:Math.floor(g.food),oxygen:Math.floor(g.oxygen)+'%',population:Math.floor(g.population),health:Math.floor(g.health)+'%',temperature:Math.round(g.temperature)+'°C',pressure:Math.round(g.pressure)+' kPa',climate:Math.floor(g.climate)+'%',cities:g.cities,farms:g.farms,hospitals:g.hospitals,explored:g.explored,turn:g.turn,minerals:g.minerals};Object.entries(vals).forEach(([id,v])=>{if(q(id))q(id).textContent=v});if(q('health2'))q('health2').textContent=Math.floor(g.health)+'%';if(q('disease'))q('disease').textContent=Math.floor(g.disease)+'%';if(q('patients'))q('patients').textContent=Math.floor(g.patients);if(q('research2'))q('research2').textContent=Math.floor(g.research);if(q('bio2'))q('bio2').textContent=Math.floor(g.bio);if(q('explored2'))q('explored2').textContent=g.explored;if(q('credits2'))q('credits2').textContent=Math.floor(g.credits);if(q('minerals2'))q('minerals2').textContent=Math.floor(g.minerals);if(q('income'))q('income').textContent=Math.floor(25+g.population*.4);if(q('log'))q('log').innerHTML=g.log.map(x=>'<div>• '+String(x).replace(/</g,'&lt;')+'</div>').join('');save()}
window.TerraNova={get state(){return g},act,save,render,cycle};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();setInterval(cycle,10000);
})();