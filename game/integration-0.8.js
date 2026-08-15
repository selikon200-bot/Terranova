// TerraNova 0.8 Integration Coordinator
// This module is intentionally standalone until the stable UI is switched to it.
import { EconomyEngine } from './economy-engine.js';
import { rollPlanetEvent } from './planet-events.js';
import { regions } from './planet-map.js';
import { achievements, checkAchievements } from './achievements.js';
import { civilizationStages, getCivilizationStage } from './civilization.js';
import { technologies, canResearch } from './technology-tree.js';
import { buy, trade, market } from './trade-system.js';
import { applyMilestones } from './game-events.js';

export function advanceTerraNova(state, random=Math.random){
  let next=EconomyEngine.tick(state);
  const event=rollPlanetEvent(next,random);
  next=event.state;
  const milestone=applyMilestones(next);
  next=milestone.state;
  const achievement=checkAchievements(next);
  next.achievements=achievement.achievements;
  return {
    state:next,
    event:event.event,
    messages:[...(milestone.messages||[]),...(achievement.rewards||[]).map(x=>x.title)]
  };
}

export const TerraNovaSystems={regions,civilizationStages,technologies,achievements,market,buy,trade,getCivilizationStage,canResearch,advanceTerraNova};
