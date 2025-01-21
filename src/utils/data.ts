export async function getOpenAiResponse(prompt: string) {
  const API_URL = `https://api.openai.com/v1/chat/completions`;
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  if (!API_KEY) {
    throw new Error('OpenAI API key not found');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      "model": "gpt-4o",
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
