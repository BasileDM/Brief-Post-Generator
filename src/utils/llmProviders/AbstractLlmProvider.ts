export abstract class AbstractLlmProvider {
  protected temperature: number;
  protected max_tokens: number;
  protected top_p: number;
  protected frequency_penalty: number;
  protected presence_penalty: number;

  constructor(
    temperature = 0.6,
    max_tokens = 2000,
    top_p = 1,
    frequency_penalty = 0,
    presence_penalty = 0
  ) {
    this.temperature = temperature;
    this.max_tokens = max_tokens;
    this.top_p = top_p;
    this.frequency_penalty = frequency_penalty;
    this.presence_penalty = presence_penalty;
  }

  abstract generateResponse(prompt: string): Promise<string>;
}