/* TerraNova Terraforming System — mobile-friendly planet transformation controls */
(function(){'use strict';
  const KEY='terranova08';
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function state(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
  function save(g){localStorage.setItem(KEY,JSON.stringify(g))}
  function log(g,text){const el=document.getElementById('log');if(el)el.innerHTML='• '+text+'<br>'+el.innerHTML}
  function ensure(g){
    g.terraforming=g.terraforming||{};
    const t=g.terraforming;
    if(typeof t.temperature!=='number')t.temperature=-25;
    if(typeof t.pressure!=='number')t.pressure=35;
    if(typeof t.oxygen!=='number')t.oxygen=Number(g.oxy)||5;
    if(typeof t.water!=='number')t.water=Number(g.water)||8;
    return t;
  }
  const actions={
    heat:{label:'🔥 رفع الحرارة',cost:120,apply(t,g){t.temperature=clamp(t.temperature+2,-40,35);g.climate=clamp((g.climate||25)+2,0,100);g.eco=clamp((g.eco||20)-1,0,100);}},
    pressure:{label:'💨 زيادة الضغط الجوي',cost:180,apply(t,g){t.pressure=clamp(t.pressure+5,10,120);g.climate=clamp((g.climate||25)+1,0,100);}},
    oxygen:{label:'🫁 زيادة الأكسجين',cost:220,apply(t,g){t.oxygen=clamp(t.oxygen+1,0,30);g.oxy=clamp(t.oxygen,0,100);g.eco=clamp((g.eco||20)+2,0,100);}},
    water:{label:'💧 إضافة المياه',cost:200,apply(t,g){t.water=clamp(t.water+3,0,100);g.water=clamp(t.water,0,100);g.eco=clamp((g.eco||20)+2,0,100);}}
  };
  function climateScore(t){
    const temp=Math.max(0,100-Math.abs(t.temperature-14)*3.2);
    const pressure=Math.max(0,100-Math.abs(t.pressure-70)*1.35);
    const oxygen=Math.max(0,100-Math.abs(t.oxygen-18)*6);
    const water=Math.max(0,100-Math.abs(t.water-55)*1.8);
    return Math.round((temp+pressure+oxygen+water)/4);
  }
  function render(){
    const g=state(),t=ensure(g);save(g);
    let box=document.getElementById('terraformingPanel');
    if(!box){
      box=document.createElement('section');box.id='terraformingPanel';box.className='panel terra-panel';
      const planet=document.getElementById('planet');
      if(planet&&planet.parentNode)planet.parentNode.insertBefore(box,planet.nextSibling);
    }
    const score=climateScore(t);
    box.innerHTML='<h3>🌍 Terraforming — تشكيل الكوكب</h3>'+
      '<p class="small">حوّل TerraNova تدريجيًا إلى عالم صالح للحياة. كل قرار يغيّر حالة الكوكب.</p>'+
      '<div class="terra-grid">'+
      metric('🌡️ الحرارة',t.temperature.toFixed(0)+'°C','الهدف 14°C')+
      metric('💨 الضغط',t.pressure.toFixed(0)+' kPa','الهدف 70 kPa')+
      metric('🫁 الأكسجين',t.oxygen.toFixed(0)+'%','الهدف 18%')+
      metric('💧 المياه',t.water.toFixed(0)+'%','الهدف 55%')+'</div>'+
      '<div class="terra-score"><b>🌱 ملاءمة الكوكب: '+score+'%</b><div class="terra-bar"><i style="width:'+score+'%"></i></div></div>'+
      '<div class="terra-actions">'+Object.keys(actions).map(k=>'<button data-terra="'+k+'">'+actions[k].label+'<small>'+actions[k].cost+' 💰</small></button>').join('')+'</div>'+
      '<button class="terra-stabilize" data-terra-stabilize="1">⚖️ تثبيت المناخ — 350 💰</button>';
    box.querySelectorAll('[data-terra]').forEach(btn=>btn.addEventListener('click',()=>act(btn.dataset.terra)));
    const stable=box.querySelector('[data-terra-stabilize]');if(stable)stable.addEventListener('click',stabilize);
  }
  function metric(title,value,target){return '<div class="terra-metric"><b>'+title+'</b><strong>'+value+'</strong><span>'+target+'</span></div>'}
  function act(kind){
    const g=state(),t=ensure(g),a=actions[kind];if(!a)return;
    if((g.credits||0)<a.cost){log(g,'❌ تحتاج '+a.cost+' 💰 لتنفيذ العملية');render();return}
    g.credits-=a.cost;a.apply(t,g);g.terraforming=t;log(g,'🌍 '+a.label+' — تم تطبيق التغيير على الكوكب');save(g);render();
    if(typeof window.render==='function')window.render();
  }
  function stabilize(){
    const g=state(),t=ensure(g),score=climateScore(t);
    if((g.credits||0)<350){log(g,'❌ تحتاج 350 💰 لتثبيت المناخ');render();return}
    if(score<45){log(g,'🔒 ملاءمة الكوكب تحتاج إلى 45% على الأقل قبل تثبيت المناخ');render();return}
    g.credits-=350;g.climate=clamp((g.climate||25)+6,0,100);g.eco=clamp((g.eco||20)+4,0,100);g.terraforming=t;save(g);log(g,'⚖️ استقر المناخ وتحسنت صحة الكوكب');render();if(typeof window.render==='function')window.render();
  }
  function start(){
    const css=document.createElement('style');css.textContent='.terra-panel{margin-top:10px;text-align:right}.terra-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}.terra-metric{background:#0a1928;border:1px solid #24445a;border-radius:10px;padding:8px;text-align:center}.terra-metric b,.terra-metric strong,.terra-metric span{display:block}.terra-metric strong{font-size:16px;margin:3px 0}.terra-metric span{font-size:9px;color:#91abc0}.terra-score{margin:9px 0}.terra-bar{height:8px;background:#08131f;border-radius:8px;overflow:hidden;margin-top:5px}.terra-bar i{display:block;height:100%;background:#39c98b}.terra-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}.terra-actions button,.terra-stabilize{border:0;border-radius:11px;padding:10px 6px;background:#2879a8;color:#fff;font-weight:bold;cursor:pointer}.terra-actions small{display:block;margin-top:3px;color:#d6e7f0}.terra-stabilize{width:100%;margin-top:7px;background:#1d8f72}@media(max-width:430px){.terra-grid{grid-template-columns:1fr 1fr}.terra-actions{grid-template-columns:1fr 1fr}}';document.head.appendChild(css);render();setInterval(render,3000)
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();