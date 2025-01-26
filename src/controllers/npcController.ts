import { Request, Response } from 'express';
import NPC from '../models/npc';

export const fetchNPCData = async (req: Request, res: Response) => {
  try {
    const { npcId } = req.params;

    // Fetch NPC data
    const npc = await NPC.findByPk(npcId);
    if (!npc) {
      return res.status(404).json({ error: 'NPC not found' });
    }

    res.json(npc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NPC data' });
  }
};

export const updateNPC = async (req: Request, res: Response) => {
  try {
    const { npcId } = req.params;
    const { traits, memory, directives, location } = req.body;

    // Fetch NPC data
    const npc = await NPC.findByPk(npcId);
    if (!npc) {
      return res.status(404).json({ error: 'NPC not found' });
    }

    // Update NPC traits, memory, directives, and location
    await npc.update({
      traits: traits || npc.traits,
      memory: memory || npc.memory,
      directives: directives || npc.directives,
      location: location || npc.location,
    });

    res.json(npc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update NPC' });
  }
};
