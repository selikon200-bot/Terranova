/* TerraNova Living Planet — visual layer only. Game state is owned by core.js. */
(function(){'use strict';
  function getState(){return window.TerraNova?window.TerraNova.state:{};}
  function start(){
    const planet=document.getElementById('planet');
    if(!planet||planet.dataset.livingReady==='1')return;
    planet.dataset.livingReady='1';
    planet.classList.add('living-planet');
    let layer=planet.querySelector('.planet-layer');
    if(!layer){
      layer=document.createElement('div');
      layer.className='planet-layer';
      planet.appendChild(layer);
    }
    function draw(){
      const g=getState();
      layer.innerHTML='';
      const ring=document.createElement('div');ring.className='map-ring';layer.appendChild(ring);
      const items=[];
      for(let i=0;i<Math.min(Number(g.cities)||0,6);i++)items.push(['🏙️',20+i*13,30+(i%2)*25]);
      if((g.hospitals||0)>0)items.push(['🏥',68,65]);
      if((g.energy||0)>=70)items.push(['☀️',72,28]);
      if((g.food||0)>=40)items.push(['🌱',34,70]);
      items.forEach((it,i)=>{const el=document.createElement('div');el.className='map-building';el.style.left=it[1]+'%';el.style.top=it[2]+'%';el.style.animationDelay=(i*.12)+'s';el.textContent=it[0];layer.appendChild(el)});
      const eco=Math.max(0,Math.min(100,Number(g.eco)||0));
      planet.style.filter='brightness('+(0.86+eco/350)+') saturate('+(0.9+eco/180)+')';
    }
    draw();
    window.addEventListener('terranova:state',draw);
    setInterval(draw,2000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();