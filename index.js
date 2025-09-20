import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

// load OpenAI with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// route for jokes
app.get("/joke", async (req, res) => {
  try {
    const topic = req.query.topic || "anything";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a witty comedian." },
        {
          role: "user",
          content: `Tell me a short, funny joke about ${topic}.`,
        },
      ],
    });

    const joke = completion.choices[0].message.content;
    res.send(joke);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating joke.");
  }
});

// home route (optional)
app.get("/", (req, res) => {
  res.send("Joke API is running! Use /joke?topic=bananas 🍌");
});

// start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
