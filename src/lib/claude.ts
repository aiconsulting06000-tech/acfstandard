export async function callClaude(prompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY environment variable.");

  const base = process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com/v1/complete";

  const res = await fetch(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-2.1",
      prompt,
      max_tokens: 300
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.completion?.text ?? data.completion ?? data.output?.[0]?.content ?? JSON.stringify(data);
}
