import { AbstractLlmProvider } from './AbstractLlmProvider';

export class OpenAiProvider extends AbstractLlmProvider {
  private baseUrl: string;
  private apiKey: string;

  constructor({
    temperature = 0.6,
    max_tokens = 2000,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0,
    apiKey = import.meta.env.VITE_OPENAI_API_KEY,
    baseUrl = 'https://api.openai.com/v1/',
  }) {
    super(Number(temperature), max_tokens, top_p, frequency_penalty, presence_penalty);
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string, role = 'You are a helpful assistant'): Promise<string> {
    const response = await fetch(`${this.baseUrl}chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: role },
          { role: 'user', content: prompt },
        ],
        temperature: this.temperature,
        max_tokens: this.max_tokens,
        top_p: this.top_p,
        frequency_penalty: this.frequency_penalty,
        presence_penalty: this.presence_penalty,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }
}
