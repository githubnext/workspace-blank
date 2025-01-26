# NPC Integration with Storylets

## Project Description

This project aims to implement a comprehensive design specification for integrating NPCs (non-player characters) with personality traits, rudimentary memory, and directives into a storylet-based narrative system. The goal is to create a modular, scalable, and immersive game world where NPCs exhibit personality-driven behavior, maintain limited memory of past interactions, and have directives that shape their behavior and storylet availability. The system also includes LLM-driven dialogue to generate contextual and personality-consistent responses during player interactions.

## High-Level System Architecture

```
┌─────────────────────────┐
│         Player          │
│  (Front-End + UI/UX)    │
└────────────┬────────────┘
             │
       1. Interacts
             │
┌────────────▼────────────┐   2. Updates + Fetches
│    Game Engine / API     │ <───────────────────── 
│ (Node/Express + TS)      │                       │
└────────────┬────────────┘                       │
             │ 3. Data + Behavior                 │
┌────────────▼────────────┐                       │
│   Storylet Library       │                       │
│   (SQLite or DB)         │ 4. Condition Checks   │
│ NPC Data (traits,memory) │    + State Updates    │
└────────────┬────────────┘                       │
             │
       5. LLM Integration
             │
┌────────────▼────────────┐
│    LLM (Dialogue)        │
│ (External API or local)  │
└─────────────────────────┘
```

1. **Player** interacts with the game UI, making choices and triggering events.
2. **Game Engine** (with the **storylet system**) updates or fetches relevant data from the **database**.
3. **NPC Data** (traits, memory, directives) and **storylets** (conditions, outcomes) are stored in a **SQLite** (or another DB). The engine checks conditions to see which events or storylets are valid.
4. The engine **updates NPC states** (e.g., trait adjustments, location changes) upon storylet outcomes or player actions.
5. For dialogue, the engine packages relevant **NPC data** and **context** into a prompt for an LLM.

## Setup and Running the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up the database:**
   ```sh
   npm run setup-db
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

5. **Open the frontend application:**
   Open `frontend/index.html` in your web browser to start configuring the game world and interacting with NPCs.
