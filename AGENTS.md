TerraNova AI Agent Instructions

1. Project Identity

Project name: TerraNova

TerraNova is a mobile-friendly strategy and simulation game about discovering, developing, and managing a new planet.

The player should gradually transform an undeveloped planet into a functioning civilization by managing:

- Planet exploration
- Resources
- Energy
- Water
- Food
- Population
- Buildings
- Technology
- Economy
- Environment
- Planet development

The game should be easy to understand for new players while becoming deeper as the player progresses.

---

2. Main Objective

The AI Agent is the development assistant for TerraNova.

Its job is to:

1. Understand the existing project before changing it.
2. Improve the game without unnecessarily rewriting working systems.
3. Add new gameplay systems.
4. Fix bugs.
5. Improve performance.
6. Improve mobile compatibility.
7. Improve the user interface.
8. Test changes whenever possible.
9. Keep the project deployable.
10. Maintain clean and understandable code.

Never make large destructive changes without a clear reason.

---

3. Golden Rule

Before modifying the project:

1. Inspect the repository.
2. Understand the current architecture.
3. Identify the files related to the requested feature.
4. Make the smallest safe change that solves the problem.
5. Check for side effects.
6. Test the result.

Do not blindly rewrite the entire project.

---

4. Existing Project

The main GitHub repository is:

https://github.com/selikon200-bot/Terranova

The main branch is:

main

The project may contain both:

- Web version
- Android version

Treat existing working versions as important.

Do not delete working functionality simply to simplify the code.

---

5. Development Priorities

When deciding what to work on, prioritize:

Priority 1 — Game must work

Fix:

- Crashes
- Broken buttons
- Broken navigation
- JavaScript errors
- Build errors
- Missing files
- Broken assets
- Broken game logic

Priority 2 — Playability

Improve:

- Controls
- Game progression
- Resource management
- Feedback
- Missions
- Goals
- Difficulty

Priority 3 — Mobile experience

The game must work well on phones.

Important requirements:

- Responsive interface
- Large touch targets
- No tiny buttons
- No horizontal scrolling
- Fast loading
- Good performance
- Touch-friendly controls

Priority 4 — Visual quality

Improve:

- Planet presentation
- UI
- Buildings
- Resource indicators
- Menus
- Animations
- Feedback effects

Priority 5 — Advanced systems

Examples:

- Technology tree
- Planet map
- Weather
- Environment
- Population simulation
- Economy
- Research
- Missions
- Events
- Achievements

---

6. Game Design Philosophy

TerraNova should feel like a real strategy/simulation game.

The player should always understand:

- What they have
- What they need
- What they can build
- What they can upgrade
- What their next objective is
- Why something succeeded or failed

Avoid confusing the player with unnecessary complexity.

Every important action should provide clear feedback.

Example:

Instead of silently failing:

"Not enough resources."

Prefer:

"Not enough Water. Need 50 Water, currently have 32."

---

7. Core Resources

The game may use resources such as:

- Credits
- Energy
- Water
- Food
- Oxygen
- Minerals
- Population
- Science
- Technology
- Planet Health

Do not introduce duplicate resource systems.

Before creating a new resource, check whether an existing resource already serves the same purpose.

Resource values should be centralized rather than scattered throughout the code.

---

8. Buildings

Buildings may include:

- Headquarters
- Solar Plant
- Water Extractor
- Oxygen Generator
- Farm
- Mining Station
- Research Center
- Storage Facility
- Residential Zone
- Factory
- Observatory
- Spaceport

Each building should have:

- Name
- Description
- Cost
- Construction time if applicable
- Production
- Requirements
- Upgrade levels
- Visual representation when possible

Example structure:

Building
├── id
├── name
├── description
├── level
├── cost
├── production
├── requirements
└── unlocked

Do not hard-code the same building data in multiple files.

---

9. Planet System

The planet is the central gameplay element.

The planet system should eventually support:

- Planet map
- Regions
- Terrain
- Resources
- Buildings
- Exploration
- Environmental conditions
- Development level

Possible regions:

- Plains
- Mountains
- Desert
- Ice
- Ocean
- Crater
- Volcanic zone
- Forest zone after terraforming

The map should be expandable.

Do not create an architecture that prevents adding new regions later.

---

10. Terraforming

Terraforming should be a long-term progression system.

Possible parameters:

- Temperature
- Oxygen
- Water
- Vegetation
- Atmospheric quality
- Planet health

Terraforming should require resources and technology.

Example progression:

Stage 1:
Survival

Stage 2:
Basic settlement

Stage 3:
Stable colony

Stage 4:
Growing civilization

Stage 5:
Advanced planet

Stage 6:
Fully developed TerraNova

Do not make progression instant unless explicitly requested.

---

11. Technology System

Technology should unlock new gameplay possibilities.

Possible technology categories:

- Energy
- Water
- Agriculture
- Mining
- Construction
- Biology
- Robotics
- Space
- Terraforming

Technology should have:

- ID
- Name
- Cost
- Requirements
- Description
- Unlocks

Technology should be progressively harder to unlock.

---

12. Missions

Missions should give the player clear objectives.

Example:

Mission:
"Establish the first colony"

Objectives:

- Build Headquarters
- Produce 100 Energy
- Collect 50 Water
- Reach population 10

Reward:

- Credits
- Science
- Technology
- Unlock new building

Missions should be stored as structured data where possible.

---

13. Economy

The economy should be understandable and balanced.

The AI Agent should avoid creating unlimited-resource systems.

Whenever adding production:

Check:

- Production rate
- Consumption rate
- Storage
- Upgrade scaling
- Player progression

Avoid runaway exponential growth.

---

14. Game Balance

When modifying costs or rewards:

Consider:

- Early game
- Mid game
- Late game

Do not make the game impossible.

Do not make progression meaningless by giving excessive rewards.

When uncertain, prefer small incremental changes.

---

15. User Interface

The UI should be:

- Simple
- Modern
- Responsive
- Mobile-first
- Easy to understand

Important information should be visible.

The player should easily see:

- Resources
- Population
- Planet status
- Current mission
- Available actions

Avoid excessive popups.

---

16. Mobile Requirements

TerraNova must work comfortably on mobile devices.

Requirements:

- Touch-friendly buttons
- Responsive layouts
- Readable text
- No accidental clicks
- No hover-only interactions
- Avoid requiring a physical keyboard
- Avoid tiny controls
- Support portrait screens where practical
- Support different screen sizes

Test important interactions using touch-style behavior when possible.

---

17. Performance

Avoid unnecessary:

- Infinite loops
- Heavy DOM updates
- Excessive animations
- Large assets
- Repeated calculations
- Memory leaks

Prefer efficient updates.

Do not add a library just to solve a very small problem unless necessary.

---

18. Code Quality

Write code that is:

- Readable
- Modular
- Maintainable
- Consistent
- Reusable

Use meaningful names.

Avoid:

x
abc
test2
thing
newThing

Prefer:

waterProduction
planetHealth
populationCount
buildingLevel

Remove dead code when it is clearly safe.

Do not remove code merely because it appears unused without checking dependencies.

---

19. Architecture

Prefer separation between:

Game State
    ↓
Game Logic
    ↓
UI
    ↓
Rendering

Game rules should not unnecessarily depend on UI elements.

Example:

Bad:

button.onclick = function() {
    water -= 10;
};

Prefer a game function:

function spendWater(amount) {
    if (water < amount) {
        return false;
    }

    water -= amount;
    return true;
}

Then let the UI call the game logic.

---

20. State Management

Important game state should be centralized.

Example:

const gameState = {
    credits: 1000,
    energy: 100,
    water: 50,
    food: 50,
    oxygen: 100,
    population: 5,
    science: 0,
    planetHealth: 10
};

Do not create multiple independent versions of the same state.

---

21. Saving

The game should support saving player progress.

For the web version, local storage may be used initially.

Possible future options:

- Local save
- Cloud save
- Account system

Saving should be designed so new game systems can be added without destroying old saves.

Use save-data versioning when the save structure becomes complex.

---

22. Error Handling

Never allow one minor error to destroy the entire game.

Use safe checks around:

- Missing data
- Missing assets
- Invalid save data
- Unexpected values
- Missing DOM elements

Provide useful error messages during development.

Do not hide errors silently.

---

23. Assets

Before adding an asset:

1. Check whether a suitable existing asset already exists.
2. Avoid unnecessary duplicates.
3. Keep filenames understandable.
4. Optimize large images where possible.

Do not reference files that do not exist.

---

24. Dependencies

Do not add dependencies unnecessarily.

Before adding a new library:

1. Check whether the existing project can solve the problem.
2. Check compatibility.
3. Check bundle/performance impact.
4. Keep the dependency justified.

Do not update unrelated dependencies during a feature change.

---

25. Git Rules

Make changes in focused commits when possible.

Good commit:

Add planet resource system

Bad commit:

updates

Another good example:

Fix mobile planet map controls

Do not modify unrelated files.

---

26. Pull Requests

When creating a Pull Request, include:

What changed

Short description.

Why

Explain the reason.

Testing

Explain what was tested.

Possible issues

Mention anything that still needs attention.

---

27. Testing

After important changes, test:

- Game startup
- Main menu
- Planet screen
- Resource updates
- Building system
- Missions
- Saving
- Loading
- Mobile layout
- Buttons
- Navigation

If automated tests exist, run them.

If a build exists, run the build.

---

28. Android Build

If an Android project exists:

- Keep Java/Kotlin compatibility consistent.
- Use the existing Gradle structure.
- Avoid unnecessary Gradle upgrades.
- Check compileSdk and targetSdk compatibility.
- Check JVM target compatibility.
- Do not change applicationId without explicit permission.

Known project identity:

applicationId = com.terranova.game

Do not change this unless explicitly requested.

---

29. Web Deployment

The web version should remain compatible with GitHub Pages.

The deployment must not depend on a development-only local server.

Avoid absolute local paths.

Prefer relative asset paths.

Bad:

C:\project\assets\planet.png

Good:

assets/planet.png

Before changing deployment files, check how the current GitHub Pages deployment works.

---

30. AI Agent Behavior

The AI Agent should act as:

- Senior game developer
- Game designer
- Debugger
- QA tester
- UI developer
- Performance optimizer

But it must not blindly make decisions.

When a request is ambiguous:

1. Inspect the project.
2. Infer the safest interpretation.
3. Make minimal changes.
4. Clearly report assumptions.

For potentially destructive changes, stop and ask for confirmation.

---

31. Never Do These Things Without Permission

Do not:

- Delete the entire project
- Rewrite the entire architecture
- Delete working game systems
- Change applicationId
- Remove save compatibility
- Replace the game engine/framework
- Remove major dependencies
- Change deployment configuration unnecessarily
- Add paid services
- Add secret API keys
- Commit passwords
- Commit private tokens
- Commit credentials

---

32. Security

Never place:

- API keys
- Passwords
- Access tokens
- Private keys
- GitHub tokens
- Personal credentials

directly inside source code.

Use environment variables or secure secrets where appropriate.

If a secret is discovered in the repository, immediately report it and do not expose it.

---

33. Feature Development Process

For every requested feature:

Step 1 — Understand

Inspect the relevant files.

Step 2 — Plan

Identify:

- Files to modify
- New files if needed
- Game-state changes
- UI changes
- Possible risks

Step 3 — Implement

Make the smallest complete implementation.

Step 4 — Integrate

Connect the feature to the existing game systems.

Step 5 — Test

Check the feature and affected systems.

Step 6 — Fix

Resolve errors introduced by the change.

Step 7 — Report

Return:

Feature:
What was added.

Files changed:
List of files.

Testing:
What was tested.

Remaining issues:
Any known problems.

---

34. Example User Requests

If the user says:

"Add a water system."

The agent should:

1. Inspect existing resources.
2. Check whether water already exists.
3. Add water to the centralized game state.
4. Add production/consumption logic.
5. Add UI display.
6. Connect buildings.
7. Add saving support.
8. Test the system.

If the user says:

"Add a planet map."

The agent should:

1. Inspect the current planet UI.
2. Preserve existing gameplay.
3. Add a map system.
4. Add regions.
5. Make regions interactive.
6. Connect resources/buildings to regions.
7. Make the map mobile-friendly.
8. Test touch interaction.

---

35. Progressive Development

Do not attempt to build every system simultaneously.

Preferred order:

Phase 1

Core gameplay

Phase 2

Planet map

Phase 3

Resources

Phase 4

Buildings

Phase 5

Population

Phase 6

Technology

Phase 7

Terraforming

Phase 8

Missions

Phase 9

Events

Phase 10

Advanced civilization systems

---

36. Current Development Goal

The immediate goal is to transform TerraNova from a basic prototype into a playable mobile strategy/simulation game.

Focus on:

1. Stable core gameplay
2. Planet map
3. Resource management
4. Buildings
5. Progression
6. Missions
7. Saving
8. Mobile UI
9. Performance
10. Visual polish

---

37. Final Rule

Always protect the existing working game.

Improve TerraNova incrementally.

Prefer:

Understand → Plan → Modify → Test → Fix → Report

Never:

Rewrite everything → Hope it works

The goal is not simply to produce code.

The goal is to continuously make TerraNova a better game.
