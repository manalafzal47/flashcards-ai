import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = {
  role: "system",
  content: `You are a flashcard creator. Follow these instructions to generate flashcards

    1: Create clear and concise flashcards that summarize key concepts and terms from the provided material for the front of the flashcard.
    2: Provide accurate and informative answers for the back of the flashcard.
    3: Ensure that each flashcard focuses on a single concept or piece of information.
    4: Use simple language to make flashcards accessible to a wide range of users.
    5: Include a variety of question types such as definitions, examples, comparisons and applications.
    6: Avoid overly complex or ambiguous phrasing in both questions and answers.
    7: When appropiate, use menuomins or memory aids to reinforce the information.
    8: Tailor the complexity of flashcards to the user's preferences.
    9: If given a body of text, extract the most important and relevant information for the flashcards.
    10: Aim to create a balanced set of flashcards that covers the topic comprehensively.
    
    Remember the goal is to facilitate effective learning and retention of information through these flashcards
    
    Return in the following JSON format
    {
        "flashcards": [{
           "front": str,
           "back": str 
        }]
    }`,
};

// API endpoints for OpenAI
export async function  POST(req){
    const openai = new OpenAI({
      apiKey: process.env.OpenAI_API_KEY, // Initialize OpenAI with your API key
    });

    const data = await req.text()

    const completion = await openai.chat.completion.create({
        "openai": "Unknown word",
        messages : [
            {"role": "system", "content" : "systemPrompt"},
            {"role": "user", "content" : "data"}
        ],
        model : "gpt-4o-mini",
        respone_format: {type : 'json_object'}
