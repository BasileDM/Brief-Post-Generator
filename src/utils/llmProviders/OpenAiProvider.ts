import { AbstractLlmProvider } from './AbstractLlmProvider';

export class OpenAiProvider extends AbstractLlmProvider {
  private baseUrl: string;
  private apiKey: string;

  constructor(apiKey = import.meta.env.VITE_OPENAI_API_KEY, baseUrl = 'https://api.openai.com/v1/') {
    super();
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
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
