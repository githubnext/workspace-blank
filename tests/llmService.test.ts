import { constructLLMPrompt, getLLMResponse } from '../src/services/llmService';

describe('LLM Service', () => {
  describe('constructLLMPrompt', () => {
    it('should construct a prompt based on NPC data and conversation context', () => {
      const npcData = {
        name: 'Dr. Marlow',
        traits: { curiosity: 7, aggression: 2, loyalty: 5 },
        memory: [
          { id: 'fix_engine', description: 'Player helped fix engine' },
          { id: 'blueprint', description: 'Player gave advanced blueprint' }
        ],
        directive: 'Investigate hidden lab'
      };
      const conversationContext = {
        playerQuery: 'Dr. Marlow, did you find anything in the lab?'
      };

      const prompt = constructLLMPrompt(npcData, conversationContext);

      expect(prompt).toContain('You are Dr. Marlow');
      expect(prompt).toContain('curiosity: 7');
      expect(prompt).toContain('Player helped fix engine');
      expect(prompt).toContain('Investigate hidden lab');
      expect(prompt).toContain('Did you find anything in the lab?');
    });
  });

  describe('getLLMResponse', () => {
    it('should return generated dialogue from the LLM API', async () => {
      const prompt = 'You are Dr. Marlow...';
      const mockResponse = { data: 'I found something interesting in the lab.' };

      jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

      const response = await getLLMResponse(prompt);

      expect(response).toBe('I found something interesting in the lab.');
    });

    it('should throw an error if the LLM API call fails', async () => {
      const prompt = 'You are Dr. Marlow...';

      jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('API call failed'));

      await expect(getLLMResponse(prompt)).rejects.toThrow('LLM API call failed');
    });
  });
});
