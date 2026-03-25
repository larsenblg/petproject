const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions';

export type ActionType = 'improve' | 'continue';

function buildPrompt(action: ActionType, text: string): string {
  if (action === 'improve') {
    return `Улучши следующий текст, сохрани смысл и язык, сделай его более ясным и аккуратным:\n\n${text}`;
  }

  return `Продолжи следующий текст в том же стиле и на том же языке. Верни только продолжение без повторения исходного текста:\n\n${text}`;
}

export async function requestDeepSeek(
  apiKey: string,
  action: ActionType,
  text: string
): Promise<string> {
  const response = await fetch(DEEPSEEK_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: buildPrompt(action, text)
        }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const details = await response.text();

    if (response.status === 402) {
      throw new Error('Недостаточно средств на балансе DeepSeek. Пополните баланс и повторите запрос.');
    }

    throw new Error(`API error: ${response.status} ${details}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('Пустой ответ от API.');
  }

  return content;
}
