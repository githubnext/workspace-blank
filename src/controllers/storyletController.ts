import { Request, Response } from 'express';
import Storylet from '../models/storylet';
import NPC from '../models/npc';

export const fetchStorylets = async (req: Request, res: Response) => {
  try {
    const { playerId, npcId } = req.body;

    // Fetch NPC data
    const npc = await NPC.findByPk(npcId);
    if (!npc) {
      return res.status(404).json({ error: 'NPC not found' });
    }

    // Fetch storylets based on NPC states and player actions
    const storylets = await Storylet.findAll({
      where: {
        conditions: {
          // Add logic to filter storylets based on NPC states and player actions
        },
      },
      order: [['priority', 'DESC']],
    });

    res.json(storylets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch storylets' });
  }
};

export const updateNPCStates = async (req: Request, res: Response) => {
  try {
    const { npcId, outcomes } = req.body;

    // Fetch NPC data
    const npc = await NPC.findByPk(npcId);
    if (!npc) {
      return res.status(404).json({ error: 'NPC not found' });
    }

    // Update NPC states based on storylet outcomes
    const updatedTraits = { ...npc.traits, ...outcomes.trait_modifiers };
    const updatedMemory = [...npc.memory, outcomes.memory_event];
    const updatedDirectives = [...npc.directives, ...outcomes.directives];

    await npc.update({
      traits: updatedTraits,
      memory: updatedMemory,
      directives: updatedDirectives,
    });

    res.json(npc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update NPC states' });
  }
};
