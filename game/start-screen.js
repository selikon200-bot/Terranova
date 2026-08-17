/* TerraNova start screen intentionally disabled.
   The browser game now boots directly into the playable world.
   This file remains as a compatibility shim because older index.html builds
   may still reference ./game/start-screen.js?v=20.
*/
(function(){'use strict';
  function cleanup(){
    var old=document.getElementById('tn-start');
    if(old) old.remove();
    if(document.body) document.body.classList.remove('tn-start-open');
    try { localStorage.removeItem('terranova-new-game'); } catch(e) {}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',cleanup,{once:true});
  else cleanup();
})();