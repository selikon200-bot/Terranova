/* TerraNova Terraforming — authoritative persistent planet state */
(function(){'use strict';
  const GAME_KEY='terranova08';
  const PLANET_KEY='terranova_planet_v1';
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function game(){try{return JSON.parse(localStorage.getItem(GAME_KEY)||'{}')}catch(e){return {}}}
  function planet(){try{return JSON.parse(localStorage.getItem(PLANET_KEY)||'null')}catch(e){return null}}
  function savePlanet(p){localStorage.setItem(PLANET_KEY,JSON.stringify(p))}
  function log(text){const el=document.getElementById('log');if(el)el.innerHTML='• '+text+'<br>'+el.innerHTML}
  function getPlanet(){
    let p=planet(),g=game();
    if(!p){
      const old=g.terraforming||{};
      p={version:1,temperature:typeof old.temperature==='number'?old.temperature:-25,pressure:typeof old.pressure==='number'?old.pressure:35,oxygen:typeof old.oxygen==='number'?old.oxygen:Number(g.oxy)||5,water:typeof old.water==='number'?old.water:Number(g.water)||8};
      savePlanet(p);
    }
    return p;
  }
  function syncGame(p){
    const g=game();
    g.terraforming={version:1,temperature:p.temperature,pressure:p.pressure,oxygen:p.oxygen,water:p.water};
    g.oxy=p.oxygen;g.water=p.water;
    localStorage.setItem(GAME_KEY,JSON.stringify(g));
  }
  function score(p){
    const a=Math.max(0,100-Math.abs(p.temperature-14)*3.2);
    const b=Math.max(0,100-Math.abs(p.pressure-70)*1.35);
    const c=Math.max(0,100-Math.abs(p.oxygen-18)*6);
    const d=Math.max(0,100-Math.abs(p.water-55)*1.8);
    return Math.round((a+b+c+d)/4);
  }
  const actions={
    heat:['🔥 رفع الحرارة',120,p=>p.temperature=clamp(p.temperature+2,-40,35)],
    pressure:['💨 زيادة الضغط الجوي',180,p=>p.pressure=clamp(p.pressure+5,10,120)],
    oxygen:['🫁 زيادة الأكسجين',220,p=>p.oxygen=clamp(p.oxygen+1,0,30)],
    water:['💧 إضافة المياه',200,p=>p.water=clamp(p.water+3,0,100)]
  };
  function render(){
    const p=getPlanet();
    let box=document.getElementById('terraformingPanel');
    if(!box){box=document.createElement('section');box.id='terraformingPanel';box.className='panel terra-panel';const planetEl=document.getElementById('planet');if(planetEl&&planetEl.parentNode)planetEl.parentNode.insertBefore(box,planetEl.nextSibling);}
    const s=score(p);
    box.innerHTML='<h3>🌍 Terraforming — تشكيل الكوكب</h3><p class="small">الحالة محفوظة في ملف مستقل عن دورة الرسم الرئيسية.</p><div class="terra-grid">'+metric('🌡️ الحرارة',p.temperature.toFixed(0)+'°C','الهدف 14°C')+metric('💨 الضغط',p.pressure.toFixed(0)+' kPa','الهدف 70 kPa')+metric('🫁 الأكسجين',p.oxygen.toFixed(0)+'%','الهدف 18%')+metric('💧 المياه',p.water.toFixed(0)+'%','الهدف 55%')+'</div><div class="terra-score"><b>🌱 ملاءمة الكوكب: '+s+'%</b><div class="terra-bar"><i style="width:'+s+'%"></i></div></div><div class="terra-actions">'+Object.keys(actions).map(k=>'<button data-planet-action="'+k+'">'+actions[k][0]+'<small>'+actions[k][1]+' 💰</small></button>').join('')+'</div>';
    box.querySelectorAll('[data-planet-action]').forEach(b=>b.onclick=()=>act(b.dataset.planetAction));
  }
  function metric(a,b,c){return '<div class="terra-metric"><b>'+a+'</b><strong>'+b+'</strong><span>'+c+'</span></div>'}
  function act(kind){
    const a=actions[kind];if(!a)return;
    const g=game();if((g.credits||0)<a[1]){log('❌ الرصيد غير كافٍ');return;}
    const p=getPlanet();a[2](p);savePlanet(p);g.credits-=a[1];
    /* Keep the main save compatible, but the separate planet key is authoritative. */
    g.terraforming={version:1,temperature:p.temperature,pressure:p.pressure,oxygen:p.oxygen,water:p.water};g.oxy=p.oxygen;g.water=p.water;
    localStorage.setItem(GAME_KEY,JSON.stringify(g));
    log('🌍 تم تغيير '+a[0]+' وحفظه بشكل دائم');render();
  }
  function start(){
    if(document.getElementById('terranova-terraforming-style'))return;
    const css=document.createElement('style');css.id='terranova-terraforming-style';css.textContent='.terra-panel{margin-top:10px;text-align:right}.terra-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}.terra-metric{background:#0a1928;border:1px solid #24445a;border-radius:10px;padding:8px;text-align:center}.terra-metric b,.terra-metric strong,.terra-metric span{display:block}.terra-metric strong{font-size:16px;margin:3px 0}.terra-metric span{font-size:9px;color:#91abc0}.terra-score{margin:9px 0}.terra-bar{height:8px;background:#08131f;border-radius:8px;overflow:hidden;margin-top:5px}.terra-bar i{display:block;height:100%;background:#39c98b}.terra-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}.terra-actions button{border:0;border-radius:11px;padding:10px 6px;background:#2879a8;color:#fff;font-weight:bold;cursor:pointer}.terra-actions small{display:block;margin-top:3px;color:#d6e7f0}@media(max-width:430px){.terra-grid,.terra-actions{grid-template-columns:1fr 1fr}}';document.head.appendChild(css);render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();