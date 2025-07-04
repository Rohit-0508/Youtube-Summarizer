const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.summarizeVideo = async (videoUrl, title, description) => {
  try {
     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Summarize the YouTube video titled "${title}" in detailed bullet points.

Video description: 
${description}
Video URL: ${videoUrl}

Be specific and relevant. Avoid fluff or hallucination and just give the summary dont write anything extra 
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (err) {
    console.error('Gemini error:', err.message);
    throw new Error('Failed to generate summary using Gemini.');
  }
};
