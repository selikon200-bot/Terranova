// TerraNova Game Event Coordinator 0.8
export function applyMilestones(state){
  const next=structuredClone(state);next.flags=next.flags||{};
  const milestones=[
    ['first-city',next.population>=50,'🏙️ أول مدينة'],
    ['stable-world',next.planetHealth>=60,'🌍 كوكب مستقر'],
    ['advanced-life',!!next.technologies?.bio,'🧬 علم أحياء متقدم'],
    ['planetary-grid',!!next.technologies?.planetary,'🛰️ الشبكة الكوكبية']
  ];
  const messages=[];
  for(const [id,ok,title] of milestones){if(ok&&!next.flags[id]){next.flags[id]=true;next.credits=(next.credits||0)+250;messages.push(title+' — مكافأة 250 💰');}}
  return {state:next,messages};
}
