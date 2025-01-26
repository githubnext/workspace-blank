import request from 'supertest';
import app from '../src/index';
import Storylet from '../src/models/storylet';
import NPC from '../src/models/npc';

describe('Storylet Controller', () => {
  beforeAll(async () => {
    // Set up test data
    await Storylet.create({
      id: 1,
      conditions: JSON.stringify({ npcId: 'npc_1', loyalty: { $gt: 3 } }),
      priority: 1,
      content: JSON.stringify({
        text: 'Dr. Marlow calls you over to discuss a strange artifact.',
        choices: [
          { text: 'Listen attentively', outcome: 'gainTrust' },
          { text: 'Dismiss him', outcome: 'loseTrust' },
        ],
      }),
      outcomes: JSON.stringify({
        gainTrust: {
          npcId: 'npc_1',
          trait_modifiers: [{ trait: 'loyalty', change: '+2' }],
          memory_event: {
            id: 'artifact_discussion',
            description: 'Player showed interest in artifact',
          },
        },
        loseTrust: {
          npcId: 'npc_1',
          trait_modifiers: [{ trait: 'loyalty', change: '-3' }],
        },
      }),
    });

    await NPC.create({
      id: 'npc_1',
      name: 'Dr. Marlow',
      traits: JSON.stringify({ loyalty: 4 }),
      memory: JSON.stringify({ recentEvents: [] }),
      directives: JSON.stringify({ active: [] }),
      location: 'lab',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await Storylet.destroy({ where: {} });
    await NPC.destroy({ where: {} });
  });

  describe('fetchStorylets', () => {
    it('should fetch storylets based on player actions and NPC states', async () => {
      const response = await request(app)
        .post('/interact')
        .send({ playerId: 'player_1', npcId: 'npc_1' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].content.text).toBe(
        'Dr. Marlow calls you over to discuss a strange artifact.'
      );
    });
  });

  describe('updateNPCStates', () => {
    it('should update NPC states based on storylet outcomes', async () => {
      const response = await request(app)
        .post('/npc/npc_1/update-states')
        .send({
          npcId: 'npc_1',
          outcomes: {
            trait_modifiers: [{ trait: 'loyalty', change: '+2' }],
            memory_event: {
              id: 'artifact_discussion',
              description: 'Player showed interest in artifact',
            },
            directives: [],
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.traits.loyalty).toBe(6);
      expect(response.body.memory.recentEvents).toHaveLength(1);
      expect(response.body.memory.recentEvents[0].id).toBe('artifact_discussion');
    });
  });
});
