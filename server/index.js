import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import axios from "axios"; // faz a chamada da API do Gemini

// --- CONFIGURAÇÃO CHAVE DE ACESSO (GEMINI) ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error(
    "ERRO: A variável de ambiente GEMINI_API_KEY não está definida no seu arquivo .env."
  );
  process.exit(1);
}

const MODEL_ID = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;

// Log de início para feedback
console.log(
  `✅ Token GEMINI carregando. Início: ${GEMINI_API_KEY.substring(0, 7)}...`
);
console.log(`✅ API de Geração configurada para o modelo Gemini.`);

// --- CONFIGURAÇÃO EXPRESS E CORS ---
const allowedOrigins = [
  "https://chef-claude-pi-nine.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Chef Claude API online 🍳");
});
=======
const PORT = process.env.PORT || 3001;
>>>>>>> feature/tailwindcss

const PORT = process.env.PORT || 3001;

// 1. Definição do Esquema JSON para Resposta Estruturada
const RECIPE_SCHEMA = {
  type: "OBJECT",
  properties: {
    name: { type: "STRING" },
    description: { type: "STRING" },
    ingredients: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          item: { type: "STRING" },
          quantity: { type: "STRING" },
          unit: { type: "STRING" },
        },
        propertyOrdering: ["item", "quantity", "unit"],
      },
    },
    instructions: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
  },
  propertyOrdering: ["name", "description", "ingredients", "instructions"],
};

// --- ROTA DE GERAÇÃO DE RECEITA COM JSON (USANDO GEMINI E AXIOS) ---
app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({
      error:
        "Invalid request: Please provide a non-empty array of ingredients.",
    });
  }

  console.log("🧾 Request received with ingredients:", ingredients);

  const ingredientList = ingredients.join(", ");

  // 2. Configuração do System Instruction e User Query
  const systemInstruction = `You are Chef Claude, a world-class chef who only speaks Portuguese. Generate one complete recipe in Portuguese using ONLY the provided ingredients. Your response MUST strictly adhere to the provided JSON schema. Do not include any introductory text, markdown formatting, or text outside the JSON object.`;
  const userQuery = `Generate a recipe using ONLY these ingredients: ${ingredientList}.`;

  // 3. Payload para a API do Gemini (JSON Estruturado)
  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RECIPE_SCHEMA,
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };

  try {
<<<<<<< HEAD
    // 4. Chamada à API do Gemini
    const geminiResponse = await axios.post(API_URL, payload, {
      timeout: 120000,
    });
=======
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3",
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
>>>>>>> feature/tailwindcss

    // Extração e Parse do JSON (Gemini retorna JSON como uma string no campo 'text')
    const candidate = geminiResponse.data.candidates?.[0];
    const jsonText = candidate?.content?.parts?.[0]?.text;

    if (!jsonText) {
      throw new Error(
        "Gemini API returned an empty or invalid candidate response."
      );
    }

    const recipeObject = JSON.parse(jsonText);

    // Resposta de Sucesso
    res.json({ recipe: recipeObject });
  } catch (error) {
<<<<<<< HEAD
    // Tratamento de Erro do Axios/Gemini
    const status = error.response?.status || error.status || 500;
    const errorDetails = error.response?.data?.error || {
      message: "Unknown error occurred.",
    };

    console.error("❌ Erro na API Gemini:", errorDetails.message);

    // Retorna a mensagem de erro para o cliente
    res.status(500).json({
      error: "Internal Server Error during recipe generation (Gemini API).",
      details: errorDetails,
      status_code: status,
    });
=======
    console.error(
      "Error when searching for recipe:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Error when searching for recipe" });
>>>>>>> feature/tailwindcss
  }
});

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log(`🚀 Chef Claude API online 🍳 (port ${PORT})`);
=======
  console.log(`Server runnig in: ${PORT}`);
>>>>>>> feature/tailwindcss
});
