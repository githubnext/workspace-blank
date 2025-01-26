import express from 'express';
import { fetchNPCData, updateNPC } from './controllers/npcController';
import { fetchStorylets, updateNPCStates } from './controllers/storyletController';

const router = express.Router();

// Route to handle player interactions
router.post('/interact', fetchStorylets);

// Route to fetch NPC data
router.get('/npc/:id', fetchNPCData);

// Route to update NPC data
router.put('/npc/:id', updateNPC);

// Route to update NPC states based on storylet outcomes
router.post('/npc/:id/update-states', updateNPCStates);

export default router;
