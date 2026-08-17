/* TerraNova Mobile Navigation — non-destructive UI layer */
(function(){'use strict';
function start(){
 if(document.getElementById('tn-mobile-shell'))return;
 const root=document.body;
 const shell=document.createElement('div');shell.id='tn-mobile-shell';shell.innerHTML=`<div class="tn-mobile-viewport"><div class="tn-mobile-track">
 <section class="tn-screen" data-screen="0"><header>🌍 <b>الكوكب</b></header><div class="tn-slot" data-slot="planet"></div></section>
 <section class="tn-screen" data-screen="1"><header>🏙️ <b>الحضارة</b></header><div class="tn-slot" data-slot="civilization"></div></section>
 <section class="tn-screen" data-screen="2"><header>🏥 <b>الصحة والأمراض</b></header><div class="tn-slot" data-slot="health"></div></section>
 <section class="tn-screen" data-screen="3"><header>🔬 <b>التكنولوجيا</b></header><div class="tn-slot" data-slot="technology"></div></section>
 <section class="tn-screen" data-screen="4"><header>🧭 <b>الاستكشاف</b></header><div class="tn-slot" data-slot="exploration"></div></section>
 <section class="tn-screen" data-screen="5"><header>💰 <b>الاقتصاد</b></header><div class="tn-slot" data-slot="economy"></div></section>
 </div></div><nav class="tn-tabs"><button data-go="0">🌍<small>الكوكب</small></button><button data-go="1">🏙️<small>الحضارة</small></button><button data-go="2">🏥<small>الصحة</small></button><button data-go="3">🔬<small>التقنية</small></button><button data-go="4">🧭<small>الاستكشاف</small></button><button data-go="5">💰<small>الاقتصاد</small></button></nav>`;
 root.insertBefore(shell,root.firstChild);
 const track=shell.querySelector('.tn-mobile-track');let index=0,startX=0,startY=0;
 function go(n){index=Math.max(0,Math.min(5,n));track.style.transform='translateX('+(-index*100)+'%)';shell.querySelectorAll('.tn-tabs button').forEach((b,i)=>b.classList.toggle('active',i===index));}
 shell.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(Number(b.dataset.go)));
 track.addEventListener('touchstart',e=>{const t=e.changedTouches[0];startX=t.clientX;startY=t.clientY},{passive:true});
 track.addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-startX,dy=t.clientY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)){go(index+(dx<0?1:-1))}},{passive:true});
 function move(id,slot){const el=document.getElementById(id);const target=shell.querySelector('[data-slot="'+slot+'"]');if(el&&target&&!target.contains(el)){target.appendChild(el)}}
 // Move existing panels only; gameplay logic remains untouched.
 setTimeout(()=>{move('terraformingPanel','planet');move('healthSystem','health');},1200);
 // Create lightweight navigation cards for screens whose systems are not yet separated.
 function card(slot,title,text){const target=shell.querySelector('[data-slot="'+slot+'"]');if(!target||target.children.length)return;const d=document.createElement('div');d.className='tn-info-card';d.innerHTML='<h3>'+title+'</h3><p>'+text+'</p>';target.appendChild(d)}
 setTimeout(()=>{card('civilization','🏙️ الحضارة','السكان والمدن والمساكن والطاقة والإنتاج تظهر هنا.');card('technology','🔬 التكنولوجيا','الأبحاث والتقنيات وTerraforming تظهر هنا.');card('exploration','🧭 الاستكشاف','المناطق والموارد والبعثات والأحداث تظهر هنا.');card('economy','💰 الاقتصاد','الرصيد والإنتاج والمصروفات والتجارة تظهر هنا.');},1400);
 go(0);
}
const css=document.createElement('style');css.textContent=`#tn-mobile-shell{direction:rtl;position:relative;width:100%;font-family:inherit}.tn-mobile-viewport{width:100%;overflow:hidden;touch-action:pan-y}.tn-mobile-track{display:flex;direction:ltr;width:600%;transition:transform .28s ease}.tn-screen{direction:rtl;width:16.6666667%;min-height:70vh;box-sizing:border-box;padding:10px 10px 90px;overflow-y:auto}.tn-screen>header{position:sticky;top:0;z-index:4;background:rgba(5,15,25,.96);border:1px solid #24445a;border-radius:12px;padding:12px;margin-bottom:10px;text-align:center;font-size:18px}.tn-slot{min-height:55vh}.tn-info-card{background:#0a1928;border:1px solid #24445a;border-radius:14px;padding:16px;margin:8px 0;text-align:center}.tn-info-card h3{margin:5px 0 10px}.tn-info-card p{color:#aac0d0}.tn-tabs{position:sticky;bottom:0;z-index:20;display:grid;grid-template-columns:repeat(6,1fr);gap:3px;background:#06111c;border-top:1px solid #24445a;padding:5px;direction:rtl}.tn-tabs button{border:0;background:transparent;color:#9db3c3;border-radius:10px;padding:7px 2px;font-size:18px}.tn-tabs button.active{background:#1b6f9b;color:#fff}.tn-tabs small{display:block;font-size:9px;margin-top:2px}@media(min-width:700px){#tn-mobile-shell{max-width:720px;margin:auto}.tn-screen{min-height:65vh}}`;
 document.head.appendChild(css);start._css=css;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();