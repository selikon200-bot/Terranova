(function(){'use strict';
// Region expansion system is permanently disabled.
// Compatibility layer: prevents old/cached region code from blocking gameplay.
try{window.alert=function(){};}catch(e){}
function removeRegionUi(){
  document.querySelectorAll('.regions,.region-map,.zone').forEach(function(el){el.remove();});
  document.querySelectorAll('.region').forEach(function(el){el.remove();});
  document.querySelectorAll('button').forEach(function(btn){
    const t=(btn.textContent||'').trim();
    if(/توسيع|منطقة ممتلئة|توسعة المنطقة|توسيع المنطقة/.test(t)) btn.remove();
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',removeRegionUi,{once:true});else removeRegionUi();
window.TerraNovaRegions={disabled:true,canBuild:function(){return true},render:function(){}};
})();