/* TerraNova Living Planet UI 0.9 */
(function(){'use strict';
function boot(){
  document.body.classList.add('living-ui');
  var planet=document.getElementById('planet'); if(!planet) return;
  planet.classList.add('living');
  var badge=document.createElement('div'); badge.className='living-badge'; badge.textContent='🌐 كوكب حي • محاكاة مستمرة';
  var head=document.querySelector('.header'); if(head&&!head.querySelector('.living-badge')) head.appendChild(badge);
  var oldNodes=planet.querySelectorAll('.planet-node,.planet-particle'); oldNodes.forEach(function(n){n.remove()});
  var nodes=[
    ['🏠',30,58,'habitat'],['☀️',67,30,'solar'],['🌱',44,72,'green'],['💧',70,67,'water'],['🏙️',54,46,'city']
  ];
  nodes.forEach(function(n){var el=document.createElement('span');el.className='planet-node';el.textContent=n[0];el.style.left=n[1]+'%';el.style.top=n[2]+'%';el.dataset.kind=n[3];planet.appendChild(el)});
  function sync(){
    var ids=['habitat','solar','greenhouse','extractor'];
    var values=ids.map(function(id){var el=document.getElementById(id);return el?Number(el.textContent)||0:0});
    var pop=document.getElementById('pop'); var climate=document.getElementById('climate');
    var city=planet.querySelector('[data-kind="city"]');
    if(city) city.style.display=(pop&&Number(pop.textContent)>=25)?'block':'none';
    var solar=planet.querySelector('[data-kind="solar"]'); if(solar) solar.style.display='block';
    var green=planet.querySelector('[data-kind="green"]'); if(green) green.style.display=(climate&&Number(climate.textContent.replace('%',''))>=30)?'block':'none';
    var water=planet.querySelector('[data-kind="water"]'); if(water) water.style.display='block';
    var house=planet.querySelector('[data-kind="habitat"]'); if(house) house.style.display=(pop&&Number(pop.textContent)>=15)?'block':'none';
  }
  function particleBurst(){
    for(var i=0;i<4;i++){
      var p=document.createElement('span');p.className='planet-particle';
      p.style.left=(35+Math.random()*30)+'%';p.style.top=(35+Math.random()*30)+'%';
      p.style.setProperty('--dx',((Math.random()-.5)*110)+'px');p.style.setProperty('--dy',((Math.random()-.5)*110)+'px');
      planet.appendChild(p);setTimeout(function(){p.remove()},3000);
    }
  }
  planet.addEventListener('click',function(){planet.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:500});particleBurst()});
  setInterval(function(){particleBurst();sync()},4200);sync();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
