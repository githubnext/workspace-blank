import axios from 'axios';

const LLM_API_URL = 'https://api.example.com/llm';

export const constructLLMPrompt = (npcData, conversationContext) => {
  const { name, traits, memory, directive } = npcData;
  const { playerQuery } = conversationContext;

  const prompt = `
    You are ${name}, a character with the following traits: ${JSON.stringify(traits)}.
    Recent memories: ${memory.map(event => event.description).join(', ')}.
    Your current directive is: ${directive}.
    Respond to the player's question: "${playerQuery}" in a manner consistent with your traits and directive.
  `;

  return prompt;
};

export const getLLMResponse = async (prompt) => {
  try {
    const response = await axios.post(LLM_API_URL, { prompt });
    return response.data;
  } catch (error) {
    console.error('Failed to get LLM response:', error);
    throw new Error('LLM API call failed');
  }
};
