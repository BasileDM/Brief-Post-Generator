export default function createPrompt(inputValues: Record<string, string | number>): string {
  let prompt: string =
    'I am a community manager at a marketing agency, posting automotive images on social media to promote client companies. The goal is to convert the user into a customer. ';

  Object.entries(inputValues).forEach(([key, value]) => {
    switch (key) {
      case 'Quantity':
        prompt += `Write ${value} examples of titles and slogans for the launch of the latest car model.\n`;
        break;
      case 'Occasion':
        prompt += `**Occasion: On the occasion of the ${value}.** \n`;
        break;
      case 'Tone':
        prompt += `**Tone :  With a ${value} tone.** \n`;
        break;
      default:
        break;
    }
  });

  prompt +=
    "Each title should be short, catchy, and positively reflect the occasion. The slogan should be an appealing message that highlights the car's features while using the specified tone. ";

  prompt +=
    'Return the response in JSON without Markdown formatting, with the attributes Slogan and Title for each of the requested examples. ';

  prompt += 'JSON format: \n {\n  "examples": [\n    {\n      "Title": "",\n      "Slogan": ""\n    }\n  ]\n}';

  return prompt;
}
