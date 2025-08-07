"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function translateText(text, language) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a helpful assistant that translates text to ${language}. Only respond with the translation, no explanations.`,
      },
      {
        role: "user",
        content: `Translate the following text to ${language}: "${text}"`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1.1,
      max_tokens: 100,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
