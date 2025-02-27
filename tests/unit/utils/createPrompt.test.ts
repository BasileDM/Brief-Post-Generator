import { expect, test, describe } from 'vitest';
import createPrompt from './../../../src/utils/createPrompt';

describe('createPrompt', () => {
  test('createPrompt should be defined', () => {
    expect(createPrompt).toBeDefined();
  });

  test('createPrompt should return a string', () => {
    const inputValues = { Quantity: 2, Occasion: 'Wedding', Tone: 'Casual' };
    const prompt = createPrompt(inputValues);
    expect(typeof prompt).toBe('string');
  });

  test('createPrompt should return the correct prompt', () => {
    const tone = 'Casual';
    const occasion = 'Wedding';
    const inputValues = { Quantity: 2, Occasion: occasion, Tone: tone };
    const prompt = createPrompt(inputValues);
    expect(prompt).toContain('Write 2 examples of titles and slogans');
    expect(prompt).toContain('**Occasion: On the occasion of the Wedding.**');
    expect(prompt).toContain('**Tone :  With a Casual tone.**');
    expect(prompt).toContain('"Title": ""');
    expect(prompt).toContain('"Slogan": ""');
  });
});
