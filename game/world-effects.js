/* TerraNova Living World 1.1 — visual day/night, weather and moving vehicles */
(function(){'use strict';
function boot(){
 const planet=document.getElementById('planet'); if(!planet)return;
 planet.classList.add('world-live');
 let layer=planet.querySelector('.world-effects');
 if(!layer){layer=document.createElement('div');layer.className='world-effects';planet.appendChild(layer)}
 let sky=layer.querySelector('.world-sky'); if(!sky){sky=document.createElement('div');sky.className='world-sky';layer.appendChild(sky)}
 let weather=layer.querySelector('.world-weather'); if(!weather){weather=document.createElement('div');weather.className='world-weather';layer.appendChild(weather)}
 let vehicles=layer.querySelector('.world-vehicles'); if(!vehicles){vehicles=document.createElement('div');vehicles.className='world-vehicles';vehicles.innerHTML='<span>🚀</span><span>🛰️</span>';layer.appendChild(vehicles)}
 let t=0;
 function update(){
  t=(t+.004)%1;
  const sun=Math.sin(t*Math.PI*2-Math.PI/2);
  sky.style.setProperty('--night',String(Math.max(0,(-sun+0.15)/1.15)));
  const climate=document.getElementById('climate'); const c=climate?parseFloat(climate.textContent)||0:50;
  weather.dataset.type=c<25?'storm':c<45?'cloud':'clear';
  layer.style.setProperty('--orbit',String(t*360)+'deg');
 }
 setInterval(update,80);update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
