(function(){'use strict';
const KEY='terranova-tech-tree-v1';
const NODES=[
{id:'solar',icon:'☀️',name:'الطاقة الشمسية',cost:250,req:[],desc:'يفتح محطة الطاقة الشمسية.'},
{id:'agri',icon:'🌱',name:'الزراعة المتقدمة',cost:180,req:['solar'],desc:'يحسن إنتاج المزارع.'},
{id:'medicine',icon:'🏥',name:'الطب المتقدم',cost:220,req:['agri'],desc:'يحسن الصحة ويخفض الأمراض.'},
{id:'explorer',icon:'🚀',name:'مركبات الاستكشاف',cost:260,req:['solar'],desc:'يجعل بعثات الاستكشاف أكثر كفاءة.'},
{id:'exo',icon:'🧬',name:'الأحياء خارج الكوكب',cost:350,req:['medicine','explorer'],desc:'يفتح مرحلة الحياة المتقدمة.'},
{id:'terraform',icon:'🌍',name:'Terraforming متقدم',cost:500,req:['exo'],desc:'يحسن البيئة والتحكم بالمناخ.'}
];
let owned={};try{owned=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){owned={}}
function save(){localStorage.setItem(KEY,JSON.stringify(owned))}
function can(n){return !owned[n.id]&&n.req.every(x=>owned[x])&&window.TerraNova&&window.TerraNova.state.research>=n.cost}
function buy(n){if(!can(n)){if(window.TerraNova&&window.TerraNova.state.research<n.cost)window.TerraNova.state.log.unshift('❌ تحتاج '+n.cost+' 🔬 لتطوير '+n.name);else window.TerraNova.state.log.unshift('🔒 يجب تطوير المتطلبات أولًا');window.TerraNova.render();return}window.TerraNova.state.research-=n.cost;owned[n.id]=true;const s=window.TerraNova.state;s.tech[n.id]=true;if(n.id==='agri')s.food+=10;if(n.id==='medicine')s.health=Math.min(100,s.health+8);if(n.id==='explorer')s.explored+=1;if(n.id==='exo'){s.bio+=20;s.eco=Math.min(100,s.eco+8);s.tech.exobiology=true}if(n.id==='terraform'){s.eco=Math.min(100,s.eco+15);s.climate=Math.min(100,s.climate+10);s.oxygen=Math.min(30,s.oxygen+2)}s.log.unshift('🔬 تم تطوير: '+n.icon+' '+n.name);save();window.TerraNova.save();window.TerraNova.render();render()}
function render(){let box=document.getElementById('techTree');if(!box)return;box.innerHTML='<h3>🌳 شجرة التكنولوجيا</h3><p class="hint">طوّر التقنيات بالتسلسل. 🔬 البحث هو مورد التطوير.</p><div class="tech-grid">'+NODES.map(n=>{const locked=n.req.some(x=>!owned[x]);const done=!!owned[n.id];return '<div class="tech-node '+(done?'done':'')+' '+(locked?'locked':'')+'"><div class="tech-title">'+n.icon+' '+n.name+'</div><div class="tech-desc">'+n.desc+'</div><small>'+(done?'✅ مطوّرة':locked?'🔒 المتطلبات: '+n.req.map(x=>NODES.find(y=>y.id===x)?.name||x).join(' + '):'🔬 '+n.cost)+'</small><button type="button" data-tech="'+n.id+'" '+(done||locked?'disabled':'')+'>'+(done?'تم التطوير':'تطوير')+'</button></div>'}).join('')+'</div>'}
function boot(){const tech=document.getElementById('tech');if(!tech)return;const box=document.createElement('div');box.id='techTree';box.className='tech-tree panel';tech.appendChild(box);document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-tech]');if(b)buy(NODES.find(n=>n.id===b.dataset.tech))});render()}
window.TerraNovaTech={nodes:NODES,owned,render,buy};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();