import dotenv from "dotenv";
dotenv.config();

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid ingredients format" });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: `Make a recipe with: ${ingredients.join(", ")}`,
        parameters: {
          max_new_tokens: 1024,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        },
        timeout: 100000,
      }
    );
    console.log(response.data);

    const recipe = response.data[0]?.generated_text || "No recipe found";

    res.json({ recipe });
  } catch (error) {
    console.error("Error when searching for recipe:", error);
    res.status(500).json({ error: "Error when searching for recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
