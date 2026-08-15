# TerraNova 0.7 Integration

The current game already contains the civilization, technology, achievements, map, missions, and life-lab UI in `index.html`.

This document defines the next safe integration step for the standalone engines:

- `game/economy-engine.js` — resource production/consumption.
- `game/planet-events.js` — controlled planetary events.
- `game/planet-map.js` — region definitions and unlock requirements.

## Integration order

1. Keep the currently working UI unchanged.
2. Import each engine into the game logic.
3. Run one economy tick per game cycle.
4. Roll at most one planetary event per cycle.
5. Read region unlock state from the map module.
6. Preserve existing local-save data.
7. Verify mobile UI and game startup after integration.

## Balance rules

- No runaway exponential growth.
- Events are probabilistic and limited.
- Technology costs increase over time.
- Civilization levels require multiple systems to improve.
- Existing saves must remain loadable.

## QA checklist

- Start game.
- Build water extractor.
- Build solar plant.
- Build greenhouse.
- Advance several cycles.
- Confirm resources never become NaN/negative unexpectedly.
- Confirm achievements are awarded once.
- Confirm regions unlock gradually.
- Confirm save/load survives reload.
- Confirm mobile controls remain usable.
