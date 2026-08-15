/* TerraNova Living Planet UI 1.0 */
(function(){'use strict';
function boot(){
  document.body.classList.add('living-ui');
  var planet=document.getElementById('planet'); if(!planet) return;
  planet.classList.add('living');
  var head=document.querySelector('.header');
  if(head&&!head.querySelector('.living-badge')){var badge=document.createElement('div');badge.className='living-badge';badge.textContent='🌐 كوكب حي • اضغط على أي منشأة';head.appendChild(badge)}
  planet.querySelectorAll('.planet-node,.planet-particle,.planet-action').forEach(function(n){n.remove()});
  var nodes=[['🏠',30,58,'habitat','المستعمرات','habitatBtn'],['☀️',67,30,'solar','الطاقة الشمسية','solarBtn'],['🌱',44,72,'green','الزراعة','greenBtn'],['💧',70,67,'water','المياه','waterBtn'],['🏙️',54,46,'city','المدينة','habitatBtn']];
  var panel=document.createElement('div');panel.className='planet-action';panel.innerHTML='<b id="planetActionTitle">🌍 اختر منطقة</b><span id="planetActionText">اضغط على منشأة لمشاهدة خياراتها</span><button id="planetActionButton" type="button">اختيار</button>';planet.appendChild(panel);
  var actionTitle=panel.querySelector('#planetActionTitle'),actionText=panel.querySelector('#planetActionText'),actionButton=panel.querySelector('#planetActionButton'),selected=null;
  nodes.forEach(function(n){
    var el=document.createElement('button');el.type='button';el.className='planet-node';el.textContent=n[0];el.style.left=n[1]+'%';el.style.top=n[2]+'%';el.dataset.kind=n[3];el.dataset.label=n[4];el.dataset.action=n[5];
    el.addEventListener('click',function(e){e.stopPropagation();selected=el;actionTitle.textContent=n[0]+' '+n[4];actionText.textContent='يمكنك تطوير هذه المنطقة من أزرار البناء.';actionButton.textContent='فتح البناء';panel.classList.add('show');planet.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:450});particleBurst()});
    planet.appendChild(el);
  });
  actionButton.addEventListener('click',function(e){e.stopPropagation();if(selected){var target=document.getElementById(selected.dataset.action);if(target){target.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(function(){target.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:500})},250)}}});
  function sync(){
    var pop=document.getElementById('pop'),climate=document.getElementById('climate');
    var city=planet.querySelector('[data-kind="city"]');if(city)city.style.display=(pop&&Number(pop.textContent)>=25)?'block':'none';
    var green=planet.querySelector('[data-kind="green"]');if(green)green.style.display=(climate&&Number(climate.textContent.replace('%',''))>=30)?'block':'none';
    var house=planet.querySelector('[data-kind="habitat"]');if(house)house.style.display=(pop&&Number(pop.textContent)>=15)?'block':'none';
  }
  function particleBurst(){for(var i=0;i<5;i++){var p=document.createElement('span');p.className='planet-particle';p.style.left=(35+Math.random()*30)+'%';p.style.top=(35+Math.random()*30)+'%';p.style.setProperty('--dx',((Math.random()-.5)*110)+'px');p.style.setProperty('--dy',((Math.random()-.5)*110)+'px');planet.appendChild(p);setTimeout(function(){p.remove()},3000)}}
  planet.addEventListener('click',function(){panel.classList.remove('show');planet.animate([{transform:'scale(1)'},{transform:'scale(1.03)'},{transform:'scale(1)'}],{duration:400});particleBurst()});
  setInterval(function(){particleBurst();sync()},4200);sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
