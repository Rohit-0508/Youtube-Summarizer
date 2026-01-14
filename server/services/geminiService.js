const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.summarizeVideo = async (videoUrl, title, description) => {
  try {
    const prompt = `
You are an expert content analyst.

Your task is to summarize the YouTube video titled:
"${title}"

Use ONLY the information provided below.
Do NOT assume or invent details that are not present.

Video description:
${description}

Video URL:
${videoUrl}

Instructions:
- Produce a concise but detailed summary
- Use clear, well-structured bullet points
- Focus on the core ideas, explanations, and takeaways
- Remove filler, repetition, and promotional content
- Do NOT add opinions or extra commentary

Output format:
- 5 to 10 bullet points
- Each bullet should be 1–2 lines max
- Plain text only (no markdown, no headings)

Output ONLY the summary bullets.
`;


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini error:", err);
    throw new Error("Failed to generate summary using Gemini.");
  }
};
