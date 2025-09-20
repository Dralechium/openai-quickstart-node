import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI();

// Default route (just to test server)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Joke endpoint
app.get("/joke", async (req, res) => {
  const topic = req.query.topic || "random";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a joke-telling assistant. Keep jokes short and funny." },
        { role: "user", content: `Tell me a joke about ${topic}.` }
      ],
      max_tokens: 50,
    });

    const joke = completion.choices?.[0]?.message?.content?.trim() || "Couldn't think of a joke 😅";
    res.send(joke);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching joke");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
