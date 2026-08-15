// TerraNova Market UI module 0.8
export function renderMarket(root,state,onBuy,onSell){
  const prices={water:12,energy:10,food:8,minerals:20};
  const names={water:'💧 ماء',energy:'⚡ طاقة',food:'🌾 غذاء',minerals:'⛏️ معادن'};
  root.innerHTML='<h3>🏪 سوق TerraNova</h3>'+Object.keys(prices).map(k=>`<div class="mission"><b>${names[k]}</b><br><span class="small">السعر: ${prices[k]} 💰 — المخزون: ${Math.floor(state.resources?.[k]||0)}</span><br><button data-buy="${k}">شراء 5</button> <button data-sell="${k}">بيع 5</button></div>`).join('');
  root.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>onBuy(b.dataset.buy,5));
  root.querySelectorAll('[data-sell]').forEach(b=>b.onclick=()=>onSell(b.dataset.sell,5));
}
