/* TerraNova Living Map — connects visual map to current game state */
(function(){
  'use strict';
  function start(){
    const planet=document.getElementById('planet');
    if(!planet)return;
    planet.classList.add('living-planet');
    let layer=planet.querySelector('.planet-layer');
    if(!layer){
      layer=document.createElement('div');layer.className='planet-layer';
      layer.innerHTML='<div class="map-ring"></div>';
      for(let i=0;i<14;i++){
        const p=document.createElement('i');p.className='map-particle';
        p.style.left=(12+Math.random()*76)+'%';p.style.top=(15+Math.random()*72)+'%';
        p.style.animationDelay=(-Math.random()*2.5)+'s';layer.appendChild(p);
      }
      planet.appendChild(layer);
    }
    function state(){try{return JSON.parse(localStorage.getItem('terranova08')||'{}')}catch(e){return {}}}
    function draw(){
      const g=state();
      layer.querySelectorAll('.map-building').forEach(x=>x.remove());
      const items=[];
      if(g.extractor>0)items.push(['💧',18,62,'مستخرج مياه']);
      if(g.solar>0)items.push(['☀️',73,30,'محطة شمسية']);
      if(g.greenhouse>0)items.push(['🌱',42,72,'بيت زراعي']);
      if(g.habitat>0)items.push(['🏠',62,55,'مستعمرة']);
      if((g.civil||1)>=3)items.push(['🏙️',55,38,'مدينة']);
      if((g.research||0)>=500)items.push(['🔬',30,38,'مختبر']);
      items.forEach((it,i)=>{
        const el=document.createElement('div');el.className='map-building';el.style.left=it[1]+'%';el.style.top=it[2]+'%';el.style.animationDelay=(i*.18)+'s';el.innerHTML=it[0]+'<span>'+it[3]+'</span>';layer.appendChild(el);
      });
      const health=Math.max(0,Math.min(100,g.eco||20));
      planet.style.filter='brightness('+(0.82+health/300)+') saturate('+(0.8+health/140)+')';
    }
    draw();setInterval(draw,1000);
    planet.addEventListener('click',function(){
      layer.querySelectorAll('.map-particle').forEach(p=>{p.style.animationDuration='.8s';setTimeout(()=>p.style.animationDuration='2.5s',800)});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
