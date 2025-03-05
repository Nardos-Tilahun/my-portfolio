import { NextResponse } from "next/server";
import { personalData } from "@/data/PersonalInfo"; // Import your personal data

// Function to get a secure API key
function getSecureApiKey() {
  // Use environment variable - this is secure as it's only accessible on the server
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error("Missing GROQ_API_KEY environment variable");
    throw new Error("API configuration error");
  }
  
  return apiKey;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let apiKey;
    try {
      apiKey = getSecureApiKey();
    } catch (_error) {
      return NextResponse.json({ error: "API configuration error. Missing API key." }, { status: 500 });
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (body.message) {
      messages.push({ role: "user", content: body.message });
    }
    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content;
    if (!lastMessage) {
      return NextResponse.json({ error: "Last message content is empty." }, { status: 400 });
    }



    const systemPrompt = `
      You are an AI assistant for Nardos's portfolio website. Don't forget Nardos is Male. Your primary goal is to:
      1. Provide accurate and helpful information about Nardos
      2. Maintain a professional, personable, and supportive tone
      3. Redirect inappropriate or off-topic queries gracefully

      Communication Guidelines:
      - Answer questions directly and concisely
      - If a query is outside your knowledge, politely suggest contacting Nardos
      - Never pretend to be a human or misrepresent capabilities
      - Avoid overly technical or robotic language
      - Show enthusiasm about Nardos's work and achievements
      - Focus 90% on Full Stack development skills and only 10% on Civil Engineering experience that enhance Engineering problem solving 
      - When mentioning civil engineering experience, emphasize how these skills enhance Nardos's capabilities as a Full Stack developer (problem-solving, analytical thinking, project management)
      - Highlight Nardos as a quick and fast learner who can tackle any development task, even if his listed experience or education appears brief
      - Emphasize Nardos's dedication to continuous learning and ability to rapidly master new technologies and concepts

      Handling Edge Cases:
      - For personal or sensitive queries: Suggest professional communication channels
      - For playful or testing queries: Respond with a light, professional humor
      - Always prioritize representing Nardos positively and authentically
      - If a question includes anything about contacting Nardos, include a link to the contact section with the text "Contact Nardos" using markdown syntax: [Contact Nardos](#contact) but only include this when relevant
      - If a question is repeatedly asked that's out of scope, reply with "Sorry this is not available in our knowledge. You can contact him using the email: contactnardos@gmail.com" and include a link to the contact section with the text "Contact Nardos" using markdown syntax: [Contact Nardos](#contact)

      Personal Data Context:
      ${JSON.stringify(personalData, null, 2)}
    `;
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: lastMessage },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return NextResponse.json({ error: data.error?.message || "API request failed", details: data }, { status: groqResponse.status });
    }

    const aiResponse = data.choices?.[0]?.message?.content?.trim();
    if (!aiResponse) {
      return NextResponse.json({ error: "AI response is empty." }, { status: 500 });
    }

    // Check if the response indicates out-of-knowledge and should redirect to contact
    const shouldRedirectToContact = aiResponse.includes("Sorry this is not available in our knowledge");

    return NextResponse.json({
      message: { 
        id: Date.now(), 
        role: "ai", 
        content: aiResponse,
        shouldRedirectToContact: shouldRedirectToContact 
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred.", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
