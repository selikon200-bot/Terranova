// TerraNova Event UI module 0.8
export function eventBanner(root,event){
  if(!event)return;
  root.innerHTML=`<div class="mission"><b>🌍 حدث كوكبي</b><br>${event}</div>`;
}
