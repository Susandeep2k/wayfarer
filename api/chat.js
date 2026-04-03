export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const SYSTEM = `You are Wayfarer, a Denmark road trip assistant. Help users plan budget road trips from Copenhagen.

KEY RULES:
- Always respond in JSON format ONLY
- Return 3 destination suggestions
- Include: name, distance, budget (DKK), highlights, food, accommodation
- Budget format: "X.XXX DKK (≈ €YYY)"
- Use 1 EUR ≈ 7.46 DKK

DENMARK REGIONS (from JSON data):
- Zealand (zealand.json): Copenhagen, Roskilde, Kronborg, beaches, castles
- Funen (funen.json): Odense, Svendborg, islands, art, food
- Jutland (jutland.json): Aarhus, Aalborg, West coast beaches, dunes
- Bornholm (bornholm.json): Island, ferry required, cliffs, unique culture

IMPORTANT: 
- User can select ANY of these 4 regions
- Only suggest destinations from the SELECTED region
- If user selected Zealand: ONLY use zealand.json data
- If user selected Funen: ONLY use funen.json data
- If user selected Jutland: ONLY use jutland.json data
- If user selected Bornholm: ONLY use bornholm.json data

JSON FORMAT:
{
  "reply": "Brief greeting/acknowledgment",
  "destinations": [
    {
      "name": "Place name",
      "distance": "X km / Yh Zmin",
      "budget": "X.XXX DKK (≈ €YYY)",
      "highlights": ["attraction 1", "attraction 2"],
      "food": "Food recommendations with price range",
      "accommodation": "Lodging options with price",
      "tips": ["tip 1", "tip 2"]
    }
  ],
  "chips": ["suggestion 1", "suggestion 2"]
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 3000,
        system: SYSTEM,
        messages: messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: { message: 'API error: ' + errText } });
    }

    const data = await response.json();
    const textContent = data.content && data.content[0] && data.content[0].text ? data.content[0].text : '';

    return res.status(200).json({ content: [{ text: textContent }] });

  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
