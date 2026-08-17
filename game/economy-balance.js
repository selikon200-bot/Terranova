(function(){'use strict';
const T=window.TerraNova;if(!T)return;
const KEY='terranova-economy-v1';
function save(){try{localStorage.setItem(KEY,JSON.stringify({income:T.state?.income||0,last:Date.now()}))}catch(e){}}
function balance(){const g=T.state;if(!g)return;g.income=Math.max(5,25+g.cities*12+g.farms*5+g.hospitals*3+g.explored*2-Math.floor(g.disease/5));g.credits+=g.income;g.food=Math.max(0,g.food+g.farms*2-g.population*.25);g.energy=Math.max(0,g.energy+g.cities-g.population*.1);g.water=Math.max(0,g.water-g.population*.05);save()}
window.addEventListener('terranova:cycle',balance);
})();