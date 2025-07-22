import {OpenAI} from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const jsonResponse = (status, obj) => ({
  statusCode: status,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST"
  },
  body: JSON.stringify(obj),
});

export const handler = async(event) => {
  // CORS preflight
  if (event.httpmethod === "OPTIONS"){
    return jsonResponse(200, {})
  }

  try {
    const {language, library, query} = JSON.parse(event.body || "{}")

    if(!language || !library || !query){
      return jsonResponse(400, {error: "Missing language, library, or query."})
    }

    const response = await openai.responses.create({
      mode: "gpt-4.1",
      messages: [
        {role: "system", content: "You are a concise programming assistant."},
        {role: "user", content: `In ${language} using ${library}, answer: ${query}.
          Return: 
          - Relevant functions/classes/modules...
          - Short code example`
        }
      ],
      temperature: 0.2
    })

    const answer = response.choices[0].message.content;
    return jsonResponse(200, {
      answer,
      sources: []
    })
  } catch (err) {
    console.error(err)
    return jsonResponse(500, {error: "Server error"})
  }
}