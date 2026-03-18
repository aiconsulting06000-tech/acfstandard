export async function callClaude(userMessage: string, locale: string = "en"): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY environment variable.");

  const systemPrompt = `You are ACF Agent, the official AI assistant of the Agentic Commerce Framework® (ACF®). You are an expert on:

- ACF® methodology: 4 founding principles, 4 operational layers, 4 maturity levels, 8 implementation modules
- ACF Score®: free online governance diagnostic scoring sovereignty across 6 axes
- ACF Control: decision governance operating system with Drift Engine™, Kill Switch, incident classification
- ACF Certification: 3 levels (ACF TRUST™, ACF CERTIFIED, ACF EXCELLENCE)
- The DDA role (Délégué à la Décision Agentique): legal guardian of autonomous agents
- EU AI Act, GDPR compliance for agentic systems
- The 4 founding principles: (1) Séparation Décision/Exécution, (2) Zones Non Délégables, (3) Traçabilité & Interruptibilité, (4) Gouvernance Vivante
- The 4 operational layers: Strategic, Tactical, Operational, Technical
- Created by Vincent DORANGE, published by AI CONSULTING (Nice, France), registered INPI February 2026

IMPORTANT RULES:
- Answer in ${locale === "fr" ? "French" : "English"}
- Be concise (2-4 sentences max unless asked for detail)
- Always relate answers back to ACF® methodology when relevant
- For questions outside ACF scope, politely redirect to governance topics
- Never invent facts about ACF - if unsure, suggest visiting the relevant page
- Be professional but approachable`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text ?? "I couldn't generate a response. Please try again.";
}
