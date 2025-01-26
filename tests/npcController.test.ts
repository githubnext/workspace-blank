import request from 'supertest';
import app from '../src/index';
import NPC from '../src/models/npc';

describe('NPC Controller', () => {
  beforeAll(async () => {
    // Set up test data
    await NPC.create({
      id: 'npc_1',
      name: 'Dr. Marlow',
      traits: JSON.stringify({ loyalty: 4, curiosity: 7, aggression: 2 }),
      memory: JSON.stringify({ recentEvents: [] }),
      directives: JSON.stringify({ active: [] }),
      location: 'lab',
    });
  });

  afterAll(async () => {
    // Clean up test data
    await NPC.destroy({ where: {} });
  });

  describe('fetchNPCData', () => {
    it('should fetch NPC data', async () => {
      const response = await request(app).get('/npc/npc_1');

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Dr. Marlow');
      expect(response.body.traits.loyalty).toBe(4);
      expect(response.body.traits.curiosity).toBe(7);
      expect(response.body.traits.aggression).toBe(2);
    });
  });

  describe('updateNPC', () => {
    it('should update NPC traits, memory, and directives', async () => {
      const response = await request(app)
        .put('/npc/npc_1')
        .send({
          traits: { loyalty: 6, curiosity: 8, aggression: 3 },
          memory: { recentEvents: [{ id: 'artifact_discussion', description: 'Player showed interest in artifact' }] },
          directives: { active: [{ type: 'investigate', description: 'Check out the hidden lab' }] },
          location: 'hidden_lab',
        });

      expect(response.status).toBe(200);
      expect(response.body.traits.loyalty).toBe(6);
      expect(response.body.traits.curiosity).toBe(8);
      expect(response.body.traits.aggression).toBe(3);
      expect(response.body.memory.recentEvents).toHaveLength(1);
      expect(response.body.memory.recentEvents[0].id).toBe('artifact_discussion');
      expect(response.body.directives.active).toHaveLength(1);
      expect(response.body.directives.active[0].type).toBe('investigate');
      expect(response.body.location).toBe('hidden_lab');
    });
  });
});
